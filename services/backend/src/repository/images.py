from sqlalchemy.ext.asyncio import AsyncSession
from src.repository.base import BaseSoftDeleteRepository
from src.models.image import Image, ImageUpdate, SearchImage

class ImageRepository(BaseSoftDeleteRepository[Image, ImageUpdate, SearchImage]):
    def __init__(self, db_session: AsyncSession):
        super().__init__(db_session, Image, SearchImage, ImageUpdate)
