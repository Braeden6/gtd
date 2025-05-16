from fastapi import Depends, HTTPException, status
from typing import Annotated
from uuid import UUID
from src.models.action import Action
from src.schemas.action import ActionResponse, ActionCreate
from src.core.dependencies import get_action_repository, current_active_user
from src.models.user import User
from src.core.dependencies import get_protected_router

from gtd_shared.core.logging import get_logger

from src.repository.action import ActionRepository

logger = get_logger()

router = get_protected_router(prefix="/action", tags=["action"])

@router.get("/", response_model=list[ActionResponse], status_code=status.HTTP_200_OK, summary="Get all actions for the current user")
async def get_user_actions(
    action_repo: Annotated[ActionRepository, Depends(get_action_repository)],
    current_user: User = Depends(current_active_user),
):
    """
    Retrieve all actions for the current user.

    Returns a list of actions ordered by creation date (newest first).
    """
    try:
        user_id: UUID = current_user.id  # type: ignore
        actions = await action_repo.get_all(user_id=user_id)
        return actions
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving inbox items: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to retrieve inbox items: {str(e)}")
    
@router.post("/", response_model=None, status_code=status.HTTP_201_CREATED, summary="Create a new action for the current user")
async def create_action(
    create_action: ActionCreate,
    action_repo: Annotated[ActionRepository, Depends(get_action_repository)],
    current_user: User = Depends(current_active_user),
):
    """
    Create a new action for the current user.
    """
    try:
        user_id: UUID = current_user.id  # type: ignore
        new_action = Action(user_id=user_id, title=create_action.title)
        action = await action_repo.create(new_action)
        await action_repo.db_session.commit()
        return action
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating action: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to create action: {str(e)}")
    
@router.delete("/{action_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an action for the current user")
async def delete_action(
    action_id: UUID,
    action_repo: Annotated[ActionRepository, Depends(get_action_repository)],
    current_user: User = Depends(current_active_user),
):
    """
    Delete an action for the current user.
    """
    try:
        user_id: UUID = current_user.id  # type: ignore
        await action_repo.delete(action_id, user_id)
        return None
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting action: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to delete action: {str(e)}")