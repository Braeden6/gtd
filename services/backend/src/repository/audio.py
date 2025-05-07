from sqlalchemy.ext.asyncio import AsyncSession

from src.repository.soft_delete_base import SoftDeleteRepository
from src.models.audio import Audio, AudioCreate, AudioUpdate


class AudioRepository(SoftDeleteRepository[Audio, AudioCreate, AudioUpdate]):
    """Repository for CRUD operations on InboxItem."""

    def __init__(self, db_session: AsyncSession):
        """Initialize with database session."""
        super().__init__(db_session, Audio)
