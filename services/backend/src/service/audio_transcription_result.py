from gtd_shared.core.queue.processor import QueueProcessor
from gtd_shared.services.transcription import TranscriptionResult
from gtd_shared.core.logging import get_logger
from src.features.audio.service import AudioService
from src.features.audio.repository import AudioRepository
from gtd_shared.core.database import get_async_session_context
from uuid import UUID

logger = get_logger()

# tech debt: some reason this doesn't work
# likely issue due to dependency injection. this queue processor is outside the fastapi app context
class AudioTranscriptionResultProcessor(QueueProcessor):
    def __init__(self):
        super().__init__(
            input_queue_name="transcription_results",
            process_function=self._process_request,
            request_model=TranscriptionResult,
        )
    
    async def _process_request(
        self, 
        request: TranscriptionResult
    ) -> None:
        async with get_async_session_context() as db:
            audio_service: AudioService = AudioService(AudioRepository(db))
            logger.info(f"Processing transcription result: {request}")
            await audio_service.update(UUID(request.audio_id), {"transcription": request.transcription})
            await db.commit()
            return None
        