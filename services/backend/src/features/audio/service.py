from src.core.dependencies import get_file_service
from src.features.audio.repository import AudioRepository
from src.features.audio.schemas import AudioUpdate, SearchAudio
from src.features.audio.model import Audio
from src.core.service import BaseSoftDeleteService
from fastapi import Depends, UploadFile
from typing import Annotated
from typing import override
from src.service.file import FileService
from io import BytesIO
from gtd_shared.core.queue.redis import RedisQueue
from gtd_shared.services.transcription import TranscriptionRequest
from uuid import UUID

class AudioService(BaseSoftDeleteService[Audio, AudioUpdate, SearchAudio]):
    def __init__(
        self, 
        repository: Annotated[AudioRepository, Depends()], 
        file_service: Annotated[FileService, Depends(get_file_service)]
    ):
        super().__init__(repository)
        self.file_service = file_service
        self.queue = RedisQueue(queue_name="transcription_jobs")
        
    @override
    async def create(self, audio: Audio, audio_data: UploadFile) -> Audio:
        audio_file = BytesIO( await audio_data.read())
        audio_path = await self.file_service.upload_inbox_audio(user_id=audio.user_id, audio_data=audio_file, filename=audio_data.filename)
        audio.audio_path = audio_path
        audio_entry = await super().create(audio)
        request = TranscriptionRequest(
            bucket_name="gtd-storage",
            path=str(audio_entry.audio_path),
            audio_id=str(audio_entry.id)
        )
        await self.queue.push(request.model_dump())
        return audio_entry
    
    @override
    async def delete(self, audio_id: UUID, user_id: UUID) -> None:
        audio = await super().get_by_id(audio_id, user_id)
        if audio.audio_path:
            await self.file_service.delete_file(audio.audio_path)
        return await super().delete(audio_id, user_id)
