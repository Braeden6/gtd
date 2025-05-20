from fastapi import Depends, status
from typing import Annotated
from uuid import UUID
from src.features.someday.schemas import SearchSomeday, SomedayCreate, SomedayUpdate
from src.features.someday.service import SomedayService
from src.core.dependencies import current_active_user
from src.features.someday.model import SomedayMaybe
from src.models.user import User
from src.core.dependencies import get_protected_router
from gtd_shared.core.logging import get_logger

logger = get_logger()

router = get_protected_router(prefix="/someday", tags=["someday"])

@router.get("/", response_model=list[SomedayMaybe], status_code=status.HTTP_200_OK, summary="Get all someday items for the current user")
async def get_user_someday(
    someday_service: Annotated[SomedayService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await someday_service.get_all(current_user.id)
    
@router.post("/", response_model=SomedayMaybe, status_code=status.HTTP_201_CREATED, summary="Create a new someday item for the current user")
async def create_someday(
    create_someday: SomedayCreate,
    someday_service: Annotated[SomedayService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await someday_service.create(SomedayMaybe(user_id=current_user.id, **create_someday.model_dump()))

@router.post("/search", response_model=list[SomedayMaybe], status_code=status.HTTP_200_OK, summary="Search for someday items for the current user")
async def search_someday(
    search_someday: SearchSomeday,
    someday_service: Annotated[SomedayService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await someday_service.search(current_user.id, search_someday)

@router.put("/{someday_id}", response_model=SomedayMaybe, status_code=status.HTTP_200_OK, summary="Update a someday item for the current user")
async def update_someday(
    someday_id: UUID,
    update_someday: SomedayUpdate,
    someday_service: Annotated[SomedayService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await someday_service.update(someday_id, current_user.id, update_someday)

@router.delete("/{someday_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a someday item for the current user")
async def delete_someday(
    someday_id: UUID,
    someday_service: Annotated[SomedayService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await someday_service.delete(someday_id, current_user.id)