from fastapi import Depends, status
from typing import Annotated
from uuid import UUID
from src.models.project import Project, ProjectUpdate, SearchProject
from src.models.project import ProjectResponse, ProjectCreate
from src.core.dependencies import get_project_repository, current_active_user
from src.models.user import User
from src.core.dependencies import get_protected_router
from gtd_shared.core.logging import get_logger

from src.repository.project import ProjectRepository

logger = get_logger()

router = get_protected_router(prefix="/project", tags=["project"])

@router.get("/", response_model=list[ProjectResponse], status_code=status.HTTP_200_OK, summary="Get all projects for the current user")
async def get_user_projects(
    project_repo: Annotated[ProjectRepository, Depends(get_project_repository)],
    current_user: User = Depends(current_active_user),
):
    return await project_repo.get_all(current_user.id)
    
@router.post("/", response_model=None, status_code=status.HTTP_201_CREATED, summary="Create a new project for the current user")
async def create_project(
    create_project: ProjectCreate,
    project_repo: Annotated[ProjectRepository, Depends(get_project_repository)],
    current_user: User = Depends(current_active_user),
):
    project = await project_repo.create(Project(user_id=current_user.id, **create_project.model_dump()))
    await project_repo.db_session.commit()
    return project

@router.post("/search", response_model=list[ProjectResponse], status_code=status.HTTP_200_OK, summary="Search for projects for the current user")
async def search_projects(
    search_project: SearchProject,
    project_repo: Annotated[ProjectRepository, Depends(get_project_repository)],
    current_user: User = Depends(current_active_user),
):
    return await project_repo.search(current_user.id, search_project)

@router.put("/{project_id}", response_model=Project, status_code=status.HTTP_200_OK, summary="Update an project for the current user")
async def update_project(
    project_id: UUID,
    project: ProjectUpdate,
    project_repo: Annotated[ProjectRepository, Depends(get_project_repository)],
    current_user: User = Depends(current_active_user),
):
    return await project_repo.update(project_id, current_user.id, project)
 
    
@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an project for the current user")
async def delete_project(
    project_id: UUID,
    project_repo: Annotated[ProjectRepository, Depends(get_project_repository)],
    current_user: User = Depends(current_active_user),
):
    return  await project_repo.delete(project_id, current_user.id)