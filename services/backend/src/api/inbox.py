from fastapi import Body, Depends, HTTPException, UploadFile, Form, status
from typing import Annotated, Optional
from io import BytesIO
from uuid import UUID
from src.models.audio import Audio
from src.models.image import Image
from src.service.file import FileService
from src.repository.inbox import InboxRepository
from src.repository.audio import AudioRepository
from src.repository.images import ImageRepository
from src.core.dependencies import get_file_service, get_inbox_repository, get_audio_repository, get_image_repository, get_inbox_view_repository, current_active_user
from src.models.user import User
from gtd_shared.core.queue.redis import RedisQueue
from gtd_shared.services.transcription import TranscriptionRequest
from gtd_shared.core.logging import get_logger
from src.repository.inbox_view import InboxViewRepository
from src.models.inbox import InboxItem, InboxItemUpdate, SearchInboxItem
from src.schemas.inbox import InboxItemResponseDTO, SearchInboxItemDTO
from src.core.dependencies import get_protected_router

logger = get_logger()

router = get_protected_router(prefix="/inbox", tags=["inbox"])

@router.post("/", response_model=InboxItemResponseDTO, status_code=status.HTTP_201_CREATED, summary="Create a new inbox item with optional files")
async def create_inbox_item(
    content: Annotated[str, Form()],
    file_service: Annotated[FileService, Depends(get_file_service)],
    inbox_repo: Annotated[InboxRepository, Depends(get_inbox_repository)],
    audio_repo: Annotated[AudioRepository, Depends(get_audio_repository)],
    image_repo: Annotated[ImageRepository, Depends(get_image_repository)],
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
        user_id: UUID = current_user.id # type: ignore
        audio_id = None
        if audio:
            audio_data = await audio.read()
            audio_file = BytesIO(audio_data)
            audio_path = await file_service.upload_inbox_audio(user_id=user_id, audio_data=audio_file, filename=audio.filename)
            audio_entry = await audio_repo.create(Audio(audio_path=audio_path, user_id=user_id, mimetype=audio.content_type))
            audio_id = audio_entry.id
            queue: RedisQueue = RedisQueue(queue_name="transcription_jobs")
            request = TranscriptionRequest(
                bucket_name="gtd-storage",
                path=str(audio_entry.audio_path),
                audio_id=str(audio_id)
            )
            await queue.push(request.model_dump())

        image_id = None
        if image:
            image_data = await image.read()
            image_file = BytesIO(image_data)
            print(f"Image file type: {image.content_type}")
            image_path = await file_service.upload_inbox_image(user_id=user_id, image_data=image_file, filename=image.filename)
            image_entry = await image_repo.create(Image(image_path=image_path, user_id=user_id, mimetype=image.content_type))
            image_id = image_entry.id
            

        inbox_item = await inbox_repo.create(
            InboxItem(
                user_id=user_id, 
                content=content, 
                audio_id=audio_id, 
                image_id=image_id
            )
        )

        await inbox_repo.db_session.commit()

        return inbox_item

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating inbox item: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to create inbox item: {str(e)}")


@router.get("/", response_model=list[InboxItemResponseDTO], status_code=status.HTTP_200_OK, summary="Get all inbox items for the current user")
async def get_user_inbox_items(
    inbox_view_repo: Annotated[InboxViewRepository, Depends(get_inbox_view_repository)],
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
        return await inbox_view_repo.get_all_for_user(
            user_id=user_id, processed=processed
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving inbox items: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to retrieve inbox items: {str(e)}")
   
   
@router.get("/search", response_model=list[InboxItemResponseDTO], status_code=status.HTTP_200_OK, summary="Search for inbox items")
async def search_inbox_items(
    inbox_repo: Annotated[InboxRepository, Depends(get_inbox_repository)],
    current_user: User = Depends(current_active_user),
    search_params: SearchInboxItemDTO = Depends(),
):
    try:
        search_model = SearchInboxItem(**search_params.model_dump())
        return await inbox_repo.search(current_user.id, search_model)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error searching inbox items: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to search inbox items: {str(e)}")

@router.put("/{item_id}", response_model=InboxItemResponseDTO, status_code=status.HTTP_200_OK, summary="Update an inbox item")
async def update_inbox_item(
    item_id: UUID,
    inbox_repo: Annotated[InboxRepository, Depends(get_inbox_repository)],
    current_user: User = Depends(current_active_user),
    item: InboxItemUpdate = Body(...)
):
    try:
        new_item = await inbox_repo.update(user_id=current_user.id , id=item_id, update_data=item)
        await inbox_repo.db_session.commit()
        return new_item
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating inbox item: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to update inbox item: {str(e)}")

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an inbox item")
async def delete_inbox_item(
    item_id: UUID,
    inbox_repo: Annotated[InboxRepository, Depends(get_inbox_repository)],
    file_service: Annotated[FileService, Depends(get_file_service)],
    audio_repo: Annotated[AudioRepository, Depends(get_audio_repository)],
    image_repo: Annotated[ImageRepository, Depends(get_image_repository)],
    current_user: User = Depends(current_active_user),
):
    """
    Delete an inbox item and its associated files.

    - **item_id**: UUID of the inbox item to delete

    Returns no content on successful deletion.
    """
    try:
        user_id: UUID = current_user.id  # type: ignore
        item = await inbox_repo.get_by_id(item_id, user_id)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inbox item not found")
        
        if item.audio_id:
            audio = await audio_repo.get_by_id(item.audio_id, user_id) # type: ignore
            if audio:
                await file_service.delete_file(audio.audio_path)
                await audio_repo.delete(item.audio_id, user_id) # type: ignore
            
        if item.image_id:
            image = await image_repo.get_by_id(item.image_id, user_id) # type: ignore
            if image:
                if image.image_path:
                    await file_service.delete_file(image.image_path)
                await image_repo.delete(item.image_id, user_id) # type: ignore
        
        await inbox_repo.delete(item_id, user_id)
        await inbox_repo.db_session.commit()
        
        return None
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting inbox item: {str(e)}")
        await inbox_repo.db_session.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to delete inbox item: {str(e)}")