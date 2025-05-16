from fastapi import Depends, HTTPException, status
from typing import Annotated
from uuid import UUID
from src.models.project import Project
from src.schemas.project import ProjectResponse, ProjectCreate
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
    """
    Retrieve all actions for the current user.

    Returns a list of actions ordered by creation date (newest first).
    """
    try:
        user_id: UUID = current_user.id  # type: ignore
        projects = await project_repo.get_all(user_id=user_id)
        return projects
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving inbox items: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to retrieve inbox items: {str(e)}")
    
@router.post("/", response_model=None, status_code=status.HTTP_201_CREATED, summary="Create a new project for the current user")
async def create_project(
    create_project: ProjectCreate,
    project_repo: Annotated[ProjectRepository, Depends(get_project_repository)],
    current_user: User = Depends(current_active_user),
):
    """
    Create a new action for the current user.
    """
    try:
        user_id: UUID = current_user.id  # type: ignore
        new_project = Project(user_id=user_id, **create_project.model_dump())
        project = await project_repo.create(new_project)
        await project_repo.db_session.commit()
        return project
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating action: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to create action: {str(e)}")
    
@router.delete("/{action_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an action for the current user")
async def delete_project(
    project_id: UUID,
    project_repo: Annotated[ProjectRepository, Depends(get_project_repository)],
    current_user: User = Depends(current_active_user),
):
    """
    Delete an action for the current user.
    """
    try:
        user_id: UUID = current_user.id  # type: ignore
        await project_repo.delete(project_id, user_id)
        return None
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting action: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to delete action: {str(e)}")