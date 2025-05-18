from fastapi import Depends, HTTPException, status
from typing import Annotated, Any
from uuid import UUID
from src.models.action import Action, ActionUpdate, SearchAction
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
    try:
        user_id: UUID = current_user.id  # type: ignore
        actions = await action_repo.get_all(user_id=user_id)
        return actions
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving inbox items: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to retrieve inbox items: {str(e)}")
    
@router.post("/", response_model=Action, status_code=status.HTTP_201_CREATED, summary="Create a new action for the current user")
async def create_action(
    create_action: ActionCreate,
    action_repo: Annotated[ActionRepository, Depends(get_action_repository)],
    current_user: User = Depends(current_active_user),
):
    action = await action_repo.create(Action(user_id=current_user.id, **create_action.model_dump()))
    await action_repo.db_session.commit()
    return action

@router.post("/search", response_model=list[ActionResponse], status_code=status.HTTP_200_OK, summary="Search for actions for the current user")
async def search_actions(
    search_action: SearchAction,
    action_repo: Annotated[ActionRepository, Depends(get_action_repository)],
    current_user: User = Depends(current_active_user),
):
    return await action_repo.search(current_user.id, search_action)

@router.put("/{action_id}", response_model=Action, status_code=status.HTTP_200_OK, summary="Update an action for the current user")
async def update_action(
    action_id: UUID,
    action: ActionUpdate,
    action_repo: Annotated[ActionRepository, Depends(get_action_repository)],
    current_user: User = Depends(current_active_user),
):
    return await action_repo.update(action_id, current_user.id, action)

@router.delete("/{action_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an action for the current user")
async def delete_action(
    action_id: UUID,
    action_repo: Annotated[ActionRepository, Depends(get_action_repository)],
    current_user: User = Depends(current_active_user),
):
    return await action_repo.delete(action_id, current_user.id)