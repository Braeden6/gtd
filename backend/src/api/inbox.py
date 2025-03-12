from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form, status
from typing import Annotated, Optional
from io import BytesIO
import logging
from uuid import UUID
from src.schemas.inbox import InboxItemResponse
from src.service.file import FileService
from src.repository.inbox import InboxRepository
from src.core.dependencies import get_file_service, get_inbox_repository, current_active_user
from src.models.user import User

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/inbox", tags=["inbox"])

@router.post("/", response_model=InboxItemResponse, status_code=status.HTTP_201_CREATED, summary="Create a new inbox item with optional files")
async def create_inbox_item(
    content: Annotated[str, Form()],
    file_service: Annotated[FileService, Depends(get_file_service)],
    inbox_repo: Annotated[InboxRepository, Depends(get_inbox_repository)],
    audio: Optional[UploadFile] = None,
    image: Optional[UploadFile] = None,
    current_user: User = Depends(current_active_user),
):
    """
    Create a new inbox item with optional audio and image attachments.

    - **content**: Text content for the inbox item
    - **audio**: Optional audio file attachment (MP3, WAV, etc.)
    - **image**: Optional image file attachment (JPG, PNG, etc.)

    Returns the created inbox item.
    """
    try:
        user_id: UUID = current_user.id  # type: ignore
        audio_path = None
        if audio:
            audio_data = await audio.read()
            audio_file = BytesIO(audio_data)
            audio_path = await file_service.upload_inbox_audio(user_id=user_id, audio_data=audio_file, filename=audio.filename)

        image_path = None
        if image:
            image_data = await image.read()
            image_file = BytesIO(image_data)
            image_path = await file_service.upload_inbox_image(user_id=user_id, image_data=image_file, filename=image.filename)

        inbox_item = await inbox_repo.create(user_id=user_id, content=content, audio_path=audio_path, image_path=image_path)

        await inbox_repo.db_session.commit()

        return inbox_item

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating inbox item: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to create inbox item: {str(e)}")


@router.get("/", response_model=list[InboxItemResponse], status_code=status.HTTP_200_OK, summary="Get all inbox items for the current user")
async def get_user_inbox_items(
    inbox_repo: Annotated[InboxRepository, Depends(get_inbox_repository)],
    current_user: User = Depends(current_active_user),
    processed: Optional[bool] = None,
):
    """
    Retrieve all inbox items for the current user.

    - **processed**: Optional filter for processed status (True/False)
    
    Returns a list of inbox items ordered by creation date (newest first).
    """
    try:
        user_id: UUID = current_user.id  # type: ignore
        inbox_items = await inbox_repo.get_by_user_id(user_id=user_id, processed=processed)
        return inbox_items
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving inbox items: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to retrieve inbox items: {str(e)}")
    
    
@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an inbox item")
async def delete_inbox_item(
    item_id: UUID,
    inbox_repo: Annotated[InboxRepository, Depends(get_inbox_repository)],
    file_service: Annotated[FileService, Depends(get_file_service)],
    current_user: User = Depends(current_active_user),
):
    """
    Delete an inbox item and its associated files.

    - **item_id**: UUID of the inbox item to delete

    Returns no content on successful deletion.
    """
    try:
        user_id: UUID = current_user.id  # type: ignore
        item = await inbox_repo.get_by_id(item_id)
        
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inbox item not found")
            
        if item.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this inbox item")
        
        if item.audio_path:
            await file_service.delete_file(item.audio_path)
            
        if item.image_path:
            await file_service.delete_file(item.image_path)
        
        await inbox_repo.delete(item_id)
        await inbox_repo.db_session.commit()
        
        return None
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting inbox item: {str(e)}")
        await inbox_repo.db_session.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to delete inbox item: {str(e)}")