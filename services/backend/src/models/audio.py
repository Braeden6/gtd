from sqlalchemy import Column, Text
from sqlalchemy import Index
from src.models.base import SoftDeleteModel


class Audio(SoftDeleteModel):
    """Inbox item model for storing user submissions."""

    __tablename__ = "audios"

    audio_path = Column(Text, nullable=True)
    transcription = Column(Text, nullable=True)

    __table_args__ = (Index("idx_audio_transcription", "transcription"),)

    def __repr__(self) -> str:
        return f"<Audio(id={self.id}, audio_path={self.audio_path}, transcription={self.transcription})>"
