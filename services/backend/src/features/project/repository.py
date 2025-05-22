from sqlalchemy.ext.asyncio import AsyncSession
from src.core.repository import BaseSoftDeleteRepository
from src.features.project.schemas import ProjectUpdate, SearchProject
from src.features.project.model import Project
from fastapi import Depends
from typing import Annotated
from gtd_shared.core.database import get_async_session

class ProjectRepository(BaseSoftDeleteRepository[Project, ProjectUpdate, SearchProject]):
    def __init__(self, db_session: Annotated[AsyncSession, Depends(get_async_session)]):
        super().__init__(db_session, Project, SearchProject, ProjectUpdate)
