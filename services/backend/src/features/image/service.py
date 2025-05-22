from src.features.image.repository import ImageRepository
from src.features.image.schemas import ImageUpdate, SearchImage
from src.features.image.model import Image
from src.core.service import BaseSoftDeleteService
from fastapi import Depends
from typing import Annotated, override
from src.core.dependencies import get_file_service
from src.service.file import FileService
from io import BytesIO
from fastapi import UploadFile
from uuid import UUID

class ImageService(BaseSoftDeleteService[Image, ImageUpdate, SearchImage]):
    def __init__(
        self, 
        repository: Annotated[ImageRepository, Depends()],
        file_service: Annotated[FileService, Depends(get_file_service)]
    ):
        super().__init__(repository)
        self.file_service = file_service
        
    @override
    async def create(self, image: Image, image_data: UploadFile) -> Image:
        image_file = BytesIO(await image_data.read())
        image_path = await self.file_service.upload_inbox_image(user_id=image.user_id, image_data=image_file, filename=image_data.filename)
        image.image_path = image_path
        return await super().create(image)

    @override
    async def delete(self, image_id: UUID, user_id: UUID) -> None:
        image = await super().get_by_id(image_id, user_id)
        if image.image_path:
            await self.file_service.delete_file(image.image_path)
        return await super().delete(image_id, user_id)
