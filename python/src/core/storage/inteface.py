from abc import ABC, abstractmethod
from typing import BinaryIO, Optional


class StorageInterface(ABC):
    """Abstract interface for file storage operations."""
    
    @abstractmethod
    async def upload_file(self, file_data: BinaryIO, file_path: str, 
                         content_type: Optional[str] = None) -> str:
        """Upload a file to storage and return its path/identifier."""
        pass
    
    @abstractmethod
    async def download_file(self, file_path: str) -> bytes:
        """Download a file from storage."""
        pass
    
    @abstractmethod
    async def delete_file(self, file_path: str) -> bool:
        """Delete a file from storage."""
        pass
    
    @abstractmethod
    async def get_file_url(self, file_path: str, expiry_seconds: int = 3600) -> str:
        """Get a pre-signed URL for accessing the file."""
        pass
    
    @abstractmethod
    async def check_file_exists(self, file_path: str) -> bool:
        """Check if a file exists in storage."""
        pass