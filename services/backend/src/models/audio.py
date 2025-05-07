from sqlalchemy import Column, Text
from sqlalchemy import Index
from src.models.base import SoftDeleteModel, BaseCreateModel, BaseUpdateModel
from typing import Optional


class Audio(SoftDeleteModel):
    """Audio model for storing user submissions."""

    __tablename__ = "audios"

    audio_path = Column(Text, nullable=True)
    transcription = Column(Text, nullable=True)

    __table_args__ = (Index("idx_audio_transcription", "transcription"),)

    def __repr__(self) -> str:
        return f"<Audio(id={self.id}, audio_path={self.audio_path}, transcription={self.transcription})>"
    
    
class AudioCreate(BaseCreateModel):
    audio_path: str
    transcription: Optional[str] = None

class AudioUpdate(BaseUpdateModel):
    audio_path: Optional[str] = None
    transcription: Optional[str] = None
