from fastapi import Depends, status
from typing import Annotated
from uuid import UUID
from src.features.tags.model import Tag
from src.features.tags.schemas import CreateTagDTO, TagResponse, TagUpdate
from src.features.tags.service import TagService
from src.core.dependencies import current_active_user
from src.features.user.model import User
from src.core.dependencies import get_protected_router
from gtd_shared.core.logging import get_logger

logger = get_logger()

router = get_protected_router(prefix="/tags", tags=["tags"])

@router.get("/{tag_id}", response_model=TagResponse, status_code=status.HTTP_200_OK, summary="Get tag by id")
async def get_tag_by_id(
    tag_id: UUID,
    tag_service: Annotated[TagService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await tag_service.get_by_id(id=tag_id, user_id=current_user.id)


@router.get("/", response_model=list[TagResponse], status_code=status.HTTP_200_OK, summary="Get all tags")
async def get_all_tags(
    tag_service: Annotated[TagService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await tag_service.get_all(user_id=current_user.id)


@router.post("/", response_model=TagResponse, status_code=status.HTTP_201_CREATED, summary="Create tag")
async def create_tag(
    tag: CreateTagDTO,
    tag_service: Annotated[TagService, Depends()],
    current_user: User = Depends(current_active_user),
):
    create_tag = Tag(user_id=current_user.id, **tag.model_dump())
    return await tag_service.create(create_tag)


@router.patch("/{tag_id}", response_model=TagResponse, status_code=status.HTTP_200_OK, summary="Update tag")
async def update_tag(
    tag_id: UUID,
    tag: TagUpdate,
    tag_service: Annotated[TagService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await tag_service.update(id=tag_id, update_data=tag, user_id=current_user.id)


@router.delete("/{tag_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete tag")
async def delete_tag(
    tag_id: UUID,
    tag_service: Annotated[TagService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await tag_service.delete(id=tag_id, user_id=current_user.id)
