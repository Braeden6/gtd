import asyncio
import io
from gtd_shared.core.storage.minio import MinioStorage
from faster_whisper import WhisperModel # type: ignore
from gtd_shared.services.transcription import TranscriptionRequest, TranscriptionResult
from gtd_shared.core.queue.processor import QueueProcessor
from gtd_shared.core.logging import get_logger

logger = get_logger()

logger.info("Loading Whisper model...")
model = WhisperModel("large-v3", compute_type="int8")  # or "tiny", "base", "small", "medium", "large"

async def process_transcription(request: TranscriptionRequest) -> TranscriptionResult:
    """Process a single transcription request and return the result."""
    minio_client = MinioStorage(bucket_name="gtd-storage")
    await minio_client.check_connection()
    
    file_data = await minio_client.download_file(request.path)
    audio_data = io.BytesIO(file_data)
    segments, info = model.transcribe(audio_data)
    all_segments = []
    for segment in segments:
        all_segments.append(segment.text)
    
    transcription_text = " ".join(all_segments)
    return TranscriptionResult(transcription=transcription_text, audio_id=request.audio_id)

async def process_transcription_jobs():
    processor = QueueProcessor(
        input_queue_name="transcription_jobs",
        output_queue_name="transcription_results",
        process_function=process_transcription,
        request_model=TranscriptionRequest
    )
    
    await processor.run()
    
    
def main() -> None:
    asyncio.run(process_transcription_jobs())

def dev() -> None:
    from watchfiles import Change, run_process
    
    def py_file_filter(change: Change, path: str) -> bool:
        return path.endswith('.py') and not path.startswith('test_')

    run_process('app', watch_filter=py_file_filter, target=main)

if __name__ == "__main__":
    dev()
    