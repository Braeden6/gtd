import aioboto3  # type: ignore
from typing import Any, BinaryIO, Optional
from botocore.exceptions import ClientError  # type: ignore
from gtd_shared.core.storage.inteface import StorageInterface
from gtd_shared.core.settings import settings
from gtd_shared.core.logging import get_logger

logger = get_logger()

class MinioStorage(StorageInterface):
    """MinIO implementation of the StorageInterface using aioboto3."""

    def __init__(self, endpoint_url: Optional[str] = None, access_key: Optional[str] = None, secret_key: Optional[str] = None, region: Optional[str] = None, bucket_name: Optional[str] = None):
        """Initialize MinIO storage client.

        If parameters are not provided, they'll be loaded from settings.
        """
        self.endpoint_url = endpoint_url or settings.MINIO_ENDPOINT_URL
        self.access_key = access_key or settings.MINIO_ACCESS_KEY
        self.secret_key = secret_key or settings.MINIO_SECRET_KEY
        self.region = region or settings.MINIO_REGION
        self.bucket_name = bucket_name or settings.MINIO_BUCKET_NAME
        self.session = aioboto3.Session()

    async def check_connection(self) -> bool:
        """Check if the storage is connected."""
        try:
            async with await self._get_client() as client:
                await client.head_bucket(Bucket=self.bucket_name)
                return True
        except Exception as e:
            logger.error(f"Failed to check connection: {str(e)}")
            raise e
            
    async def _get_client(self) -> Any:
        """Get an S3 client configured for MinIO."""
        return self.session.client(service_name="s3", endpoint_url=self.endpoint_url, aws_access_key_id=self.access_key, aws_secret_access_key=self.secret_key, region_name=self.region)

    async def upload_file(self, file_data: BinaryIO, file_path: str, content_type: Optional[str] = None) -> str:
        """Upload a file to MinIO storage."""
        try:
            extra_args = {}
            if content_type:
                extra_args["ContentType"] = content_type

            async with await self._get_client() as client:
                await client.upload_fileobj(file_data, self.bucket_name, file_path, ExtraArgs=extra_args)
            return file_path
        except Exception as e:
            logger.error(f"Failed to upload file to {file_path}: {str(e)}")
            raise

    async def download_file(self, file_path: str) -> bytes:
        """Download a file from MinIO storage."""
        try:
            async with await self._get_client() as client:
                response = await client.get_object(Bucket=self.bucket_name, Key=file_path)
                async with response["Body"] as stream:
                    return_bytes: bytes = await stream.read()
                    return return_bytes
        except Exception as e:
            logger.error(f"Failed to download file from {file_path}: {str(e)}")
            raise

    async def delete_file(self, file_path: str) -> bool:
        """Delete a file from MinIO storage."""
        try:
            async with await self._get_client() as client:
                await client.delete_object(Bucket=self.bucket_name, Key=file_path)
            return True
        except Exception as e:
            logger.error(f"Failed to delete file at {file_path}: {str(e)}")
            return False

    async def get_file_url(self, file_path: str, expiry_seconds: int = 3600) -> str:
        """Generate a pre-signed URL for temporary access to a file."""
        try:
            async with await self._get_client() as client:
                url = await client.generate_presigned_url("get_object", Params={"Bucket": self.bucket_name, "Key": file_path}, ExpiresIn=expiry_seconds)
                return url
        except Exception as e:
            logger.error(f"Failed to generate URL for {file_path}: {str(e)}")
            raise

    async def check_file_exists(self, file_path: str) -> bool:
        """Check if a file exists in MinIO storage."""
        try:
            async with await self._get_client() as client:
                await client.head_object(Bucket=self.bucket_name, Key=file_path)
                return True
        except ClientError as e:
            if e.response["Error"]["Code"] == "404":
                return False
            logger.error(f"Error checking if file exists at {file_path}: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Error checking if file exists at {file_path}: {str(e)}")
            raise
