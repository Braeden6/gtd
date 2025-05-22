from fastapi import Depends, status
from typing import Annotated
from uuid import UUID
from src.features.action.schemas import ActionCreate, ActionResponse, ActionUpdate, SearchAction
from src.features.action.service import ActionService
from src.core.dependencies import current_active_user
from src.features.action.model import Action
from src.features.user.model import User
from src.core.dependencies import get_protected_router
from gtd_shared.core.logging import get_logger

logger = get_logger()

router = get_protected_router(prefix="/action", tags=["action"])

@router.get("/", response_model=list[ActionResponse], status_code=status.HTTP_200_OK, summary="Get all actions for the current user")
async def get_user_actions(
    action_service: Annotated[ActionService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await action_service.get_all(user_id=current_user.id)

@router.post("/", response_model=Action, status_code=status.HTTP_201_CREATED, summary="Create a new action for the current user")
async def create_action(
    create_action: ActionCreate,
    action_service: Annotated[ActionService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await action_service.create(Action(user_id=current_user.id, **create_action.model_dump()))

@router.post("/search", response_model=list[ActionResponse], status_code=status.HTTP_200_OK, summary="Search for actions for the current user")
async def search_actions(
    search_action: SearchAction,
    action_service: Annotated[ActionService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await action_service.search(current_user.id, search_action)

@router.patch("/{action_id}", response_model=Action, status_code=status.HTTP_200_OK, summary="Update an action for the current user")
async def update_action(
    action_id: UUID,
    action: ActionUpdate,
    action_service: Annotated[ActionService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await action_service.update(action_id, current_user.id, action)

@router.delete("/{action_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an action for the current user")
async def delete_action(
    action_id: UUID,
    action_service: Annotated[ActionService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await action_service.delete(action_id, current_user.id)