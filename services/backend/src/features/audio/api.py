from fastapi import Depends, status, Response
from typing import Annotated
from uuid import UUID
from src.service.file import FileService
from src.features.audio.service import AudioService
from src.core.dependencies import current_active_user, get_file_service
from src.features.audio.model import Audio
from src.features.user.model import User
from src.core.dependencies import get_protected_router
from gtd_shared.core.logging import get_logger

logger = get_logger()

router = get_protected_router(prefix="/audio", tags=["audio"])

@router.get("/{audio_id}", response_model=Audio, status_code=status.HTTP_200_OK, summary="Get audio by id")
async def get_audio_by_id(
    audio_id: UUID,
    audio_service: Annotated[AudioService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await audio_service.get_by_id(id=audio_id, user_id=current_user.id)

@router.get("/{audio_id}/file", status_code=status.HTTP_200_OK, summary="Get audio file by id")
async def get_audio_file_by_id(
    audio_id: UUID,
    audio_service: Annotated[AudioService, Depends()],
    file_service: Annotated[FileService, Depends(get_file_service)],
    current_user: User = Depends(current_active_user),
):
    audio = await audio_service.get_by_id(id=audio_id, user_id=current_user.id)
    file_content = await file_service.get_file(audio.audio_path)
    return Response(
        content=file_content,
        media_type=audio.mimetype
    )

@router.get("/", response_model=list[Audio], status_code=status.HTTP_200_OK, summary="Get all audio")
async def get_all_audio(
    audio_service: Annotated[AudioService, Depends()],
    current_user: User = Depends(current_active_user),
):
    return await audio_service.get_all(user_id=current_user.id)
    
