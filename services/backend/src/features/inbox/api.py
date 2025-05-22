from fastapi import Body, Depends, UploadFile, Form, status
from typing import Annotated, Optional
from uuid import UUID
from src.features.extended_inbox.service import ExtendedInboxService
from src.features.inbox.service import InboxService
from src.core.dependencies import current_active_user
from src.features.user.model import User
from gtd_shared.core.logging import get_logger
from src.features.inbox.model import InboxItem
from src.features.inbox.schemas import InboxItemResponseDTO, InboxItemUpdate, SearchInboxItem
from src.core.dependencies import get_protected_router

logger = get_logger()

router = get_protected_router(prefix="/inbox", tags=["inbox"])

@router.post("/", response_model=InboxItemResponseDTO, status_code=status.HTTP_201_CREATED, summary="Create a new inbox item with optional files")
async def create_inbox_item(
    content: Annotated[str, Form()],
    inbox_service: Annotated[InboxService, Depends()],
    audio: Optional[UploadFile] = None,
    image: Optional[UploadFile] = None,
    current_user: User = Depends(current_active_user),
):
    return await inbox_service.create(InboxItem(user_id=current_user.id, content=content), audio, image)

@router.get("/", response_model=list[InboxItemResponseDTO], status_code=status.HTTP_200_OK, summary="Get all inbox items for the current user")
async def get_user_inbox_items(
     inbox_service: Annotated[InboxService, Depends()],
    current_user: User = Depends(current_active_user)
):
    return await inbox_service.get_all(current_user.id)


@router.post("/search", response_model=list[InboxItemResponseDTO], status_code=status.HTTP_200_OK, summary="Search for inbox items")
async def search_inbox_items(
    inbox_service: Annotated[ExtendedInboxService, Depends()],
    current_user: User = Depends(current_active_user),
    search_params: SearchInboxItem = Body(...),
):
    return await inbox_service.search(current_user.id, search_params)

@router.patch("/{item_id}", response_model=InboxItemResponseDTO, status_code=status.HTTP_200_OK, summary="Update an inbox item")
async def update_inbox_item(
    item_id: UUID,
    inbox_service: Annotated[InboxService, Depends()],
    current_user: User = Depends(current_active_user),
    item: InboxItemUpdate = Body(...)
):
    return await inbox_service.update(user_id=current_user.id , id=item_id, update_data=item)

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an inbox item")
async def delete_inbox_item(
    item_id: UUID,
    inbox_service: Annotated[InboxService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await inbox_service.delete(item_id, current_user.id)
        