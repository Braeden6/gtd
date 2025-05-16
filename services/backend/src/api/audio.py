from fastapi import Depends, status
from typing import Annotated
from uuid import UUID
from src.core.dependencies import current_active_user
from src.models.user import User
from gtd_shared.core.logging import get_logger
from src.models.audio import Audio
from src.repository.audio import AudioRepository
from src.core.dependencies import get_audio_repository, get_file_service
from src.service.file import FileService
from src.core.dependencies import get_protected_router


logger = get_logger()

router = get_protected_router(prefix="/audio", tags=["audio"])

@router.get("/{audio_id}", response_model=Audio, status_code=status.HTTP_200_OK, summary="Get audio by id")
async def get_audio_by_id(
    audio_id: UUID,
    audio_repo: Annotated[AudioRepository, Depends(get_audio_repository)],
    current_user: User = Depends(current_active_user),
):
    return await audio_repo.get_by_id(id=audio_id, user_id=current_user.id)

@router.get("/{audio_id}/file", response_model=bytes, status_code=status.HTTP_200_OK, summary="Get audio file by id")
async def get_audio_file_by_id(
    audio_id: UUID,
    audio_repo: Annotated[AudioRepository, Depends(get_audio_repository)],
    file_service: Annotated[FileService, Depends(get_file_service)],
    current_user: User = Depends(current_active_user),
):
    # !!! mimetype
    audio = await audio_repo.get_by_id(id=audio_id, user_id=current_user.id)
    return await file_service.get_file(audio.audio_path)

@router.get("/", response_model=list[Audio], status_code=status.HTTP_200_OK, summary="Get all audio")
async def get_all_audio(
    audio_repo: Annotated[AudioRepository, Depends(get_audio_repository)],
    current_user: User = Depends(current_active_user),
):
    return await audio_repo.get_all(user_id=current_user.id)
    

   
  