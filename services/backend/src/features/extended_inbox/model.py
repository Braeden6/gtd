from sqlmodel import SQLModel, Field
from uuid import UUID
from datetime import datetime
from typing import Any

class ExtendedInbox(SQLModel, table=True):
    __tablename__ = "extended_inbox"
    
    id: UUID = Field(primary_key=True)
    user_id: UUID = Field(nullable=False)
    content: str = Field(nullable=False)
    image_id: UUID | None = Field(nullable=True)
    audio_id: UUID | None = Field(nullable=True)
    processed: bool = Field(default=False)
    is_new: bool = Field(default=False)
    created_at: datetime = Field(nullable=False)
    updated_at: datetime = Field(nullable=False)
    deleted_at: datetime | None = Field(nullable=True)
    transcription: str | None = Field(nullable=True)
    
    @classmethod
    def create_view(cls, op: Any) -> None:
        """Create the view."""
        op.execute("""
        CREATE OR REPLACE VIEW extended_inbox AS
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
    def drop_view(cls, op: Any) -> None:
        op.execute("DROP VIEW IF EXISTS extended_inbox;")
