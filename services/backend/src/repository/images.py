from sqlalchemy.ext.asyncio import AsyncSession

from src.repository.soft_delete_base import SoftDeleteRepository
from src.models.image import Image, ImageCreate, ImageUpdate


class ImageRepository(SoftDeleteRepository[Image, ImageCreate, ImageUpdate]):
    """Repository for CRUD operations on Image."""

    def __init__(self, db_session: AsyncSession):
        """Initialize with database session."""
        super().__init__(db_session, Image)
