from gtd_shared.core.logging import get_logger
from sqlalchemy.ext.asyncio import AsyncSession

from src.repository.soft_delete_base import SoftDeleteRepository
from src.models.project import Project, ProjectCreate, ProjectUpdate


logger = get_logger()

class ProjectRepository(SoftDeleteRepository[Project, ProjectCreate, ProjectUpdate]):
    """Repository for CRUD operations on Project."""

    def __init__(self, db_session: AsyncSession):
        """Initialize with database session."""
        super().__init__(db_session, Project)
