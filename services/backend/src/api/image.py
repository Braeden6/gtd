from fastapi import Depends, status, Response
from typing import Annotated
from uuid import UUID
from src.core.dependencies import current_active_user
from src.models.user import User
from gtd_shared.core.logging import get_logger
from src.core.dependencies import get_image_repository, get_file_service
from src.service.file import FileService
from src.core.dependencies import get_protected_router
from src.models.image import Image
from src.repository.images import ImageRepository


logger = get_logger()

router = get_protected_router(prefix="/image", tags=["image"])

@router.get("/{image_id}", response_model=Image, status_code=status.HTTP_200_OK, summary="Get image by id")
async def get_image_by_id(
    image_id: UUID,
    image_repo: Annotated[ImageRepository, Depends(get_image_repository)],
    current_user: User = Depends(current_active_user),
):
    return await image_repo.get_by_id(id=image_id, user_id=current_user.id)

# tech debt: figure out how to fix this so sdk can be used on frontend
@router.get("/{image_id}/file", 
        status_code=status.HTTP_200_OK, 
        summary="Get image file by id",
        response_class=Response,
    )
async def get_image_file_by_id(
    image_id: UUID,
    image_repo: Annotated[ImageRepository, Depends(get_image_repository)],
    file_service: Annotated[FileService, Depends(get_file_service)],
    current_user: User = Depends(current_active_user),
):
    image = await image_repo.get_by_id(id=image_id, user_id=current_user.id)
    file_content = await file_service.get_file(image.image_path)
    return Response(
        content=file_content,
        media_type=image.mimetype
    )

@router.get("/", response_model=list[Image], status_code=status.HTTP_200_OK, summary="Get all images")
async def get_all_images(
    image_repo: Annotated[ImageRepository, Depends(get_image_repository)],
    current_user: User = Depends(current_active_user),
):
    return await image_repo.get_all(user_id=current_user.id)
    

   
  