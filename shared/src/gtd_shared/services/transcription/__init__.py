from pydantic import BaseModel

class TranscriptionRequest(BaseModel):
    bucket_name: str
    path: str
    audio_id: str
    
class TranscriptionResult(BaseModel):
    transcription: str
    audio_id: str
    
    