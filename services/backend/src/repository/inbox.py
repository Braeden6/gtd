from sqlalchemy.ext.asyncio import AsyncSession
from src.repository.soft_delete_base import SoftDeleteRepository
from src.models.inbox import InboxItem, InboxItemCreate, InboxItemUpdate


class InboxRepository(SoftDeleteRepository[InboxItem, InboxItemCreate, InboxItemUpdate]):
    """Repository for CRUD operations on InboxItem."""

    def __init__(self, db_session: AsyncSession):
        """Initialize with database session."""
        super().__init__(db_session, InboxItem)
