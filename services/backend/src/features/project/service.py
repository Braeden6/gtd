from src.features.project.repository import ProjectRepository
from src.features.project.schemas import ProjectUpdate, SearchProject
from src.features.project.model import Project
from src.core.service import BaseSoftDeleteService
from fastapi import Depends
from typing import Annotated

class ProjectService(BaseSoftDeleteService[Project, ProjectUpdate, SearchProject]):
    def __init__(self, repository: Annotated[ProjectRepository, Depends()]):
        super().__init__(repository)
