from gtd_shared.core.logging import get_logger
from sqlalchemy.ext.asyncio import AsyncSession

from src.repository.soft_delete_base import SoftDeleteRepository
from src.models.action import Action, ActionCreate, ActionUpdate


logger = get_logger()

class ActionRepository(SoftDeleteRepository[Action, ActionCreate, ActionUpdate]):
    """Repository for CRUD operations on Action."""

    def __init__(self, db_session: AsyncSession):
        """Initialize with database session."""
        super().__init__(db_session, Action)
