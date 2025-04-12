from gtd_shared.core.queue.processor import QueueProcessor
from gtd_shared.services.transcription import TranscriptionResult
from gtd_shared.core.logging import get_logger
from src.repository.audio import AudioRepository
from src.core.dependencies import get_audio_repository
from gtd_shared.core.database import get_async_session_context
from uuid import UUID

logger = get_logger()

class AudioTranscriptionResultProcessor(QueueProcessor):
    """Queue processor for MyService specific operations."""
    
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
        """Process the incoming request."""
        async with get_async_session_context() as db:
            audio_repo: AudioRepository = await get_audio_repository(db=db)
            logger.info(f"Processing transcription result: {request}")
            await audio_repo.update(UUID(request.audio_id), {"transcription": request.transcription})
            await db.commit()
            return None
        