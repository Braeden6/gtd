from sqlmodel import SQLModel, Field
from uuid import UUID
from datetime import datetime

class InboxItemWithTranscription(SQLModel, table=True):
    __tablename__ = "inbox_items_with_transcription"
    
    id: UUID = Field(primary_key=True)
    user_id: UUID = Field(nullable=False)
    content: str = Field(nullable=False)
    image_id: UUID | None = Field(nullable=True)
    audio_id: UUID | None = Field(nullable=True)
    processed: bool = Field(default=False)
    created_at: datetime = Field(nullable=False)
    updated_at: datetime = Field(nullable=False)
    deleted_at: datetime | None = Field(nullable=True)
    transcription: str | None = Field(nullable=True)
    
    @classmethod
    def create_view(cls, op):
        """Create the view."""
        op.execute("""
        CREATE OR REPLACE VIEW inbox_items_with_transcription AS
        SELECT 
        i.*,
        a.transcription
    FROM 
        inbox_items i
    LEFT JOIN 
        audios a ON i.audio_id = a.id
    WHERE
            i.deleted_at IS NULL;
        """)

    @classmethod
    def drop_view(cls, op):
        op.execute("DROP VIEW IF EXISTS inbox_items_with_transcription;")
