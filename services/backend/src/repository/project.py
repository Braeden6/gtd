from sqlalchemy.ext.asyncio import AsyncSession
from src.repository.base import BaseSoftDeleteRepository
from src.models.project import Project, ProjectUpdate, SearchProject

class ProjectRepository(BaseSoftDeleteRepository[Project, ProjectUpdate, SearchProject]):
    def __init__(self, db_session: AsyncSession):
        super().__init__(db_session, Project, SearchProject, ProjectUpdate)
