from fastapi import Depends, status
from typing import Annotated
from uuid import UUID
from src.features.project.schemas import SearchProject, ProjectCreate, ProjectUpdate, ProjectResponse
from src.features.project.service import ProjectService
from src.core.dependencies import current_active_user
from src.features.project.model import Project
from src.features.user.model import User
from src.core.dependencies import get_protected_router
from gtd_shared.core.logging import get_logger

logger = get_logger()

router = get_protected_router(prefix="/project", tags=["project"])

@router.get("/", response_model=list[ProjectResponse], status_code=status.HTTP_200_OK, summary="Get all projects for the current user")
async def get_user_projects(
    project_service: Annotated[ProjectService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await project_service.get_all(current_user.id)
    
@router.post("/", response_model=None, status_code=status.HTTP_201_CREATED, summary="Create a new project for the current user")
async def create_project(
    create_project: ProjectCreate,
    project_service: Annotated[ProjectService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await project_service.create(Project(user_id=current_user.id, **create_project.model_dump()))

@router.post("/search", response_model=list[ProjectResponse], status_code=status.HTTP_200_OK, summary="Search for projects for the current user")
async def search_projects(
    search_project: SearchProject,
    project_service: Annotated[ProjectService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await project_service.search(current_user.id, search_project)

@router.patch("/{project_id}", response_model=Project, status_code=status.HTTP_200_OK, summary="Update an project for the current user")
async def update_project(
    project_id: UUID,
    project: ProjectUpdate,
    project_service: Annotated[ProjectService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await project_service.update(project_id, current_user.id, project)
 
    
@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an project for the current user")
async def delete_project(
    project_id: UUID,
    project_service: Annotated[ProjectService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return  await project_service.delete(project_id, current_user.id)