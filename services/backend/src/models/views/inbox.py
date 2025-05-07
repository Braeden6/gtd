


from sqlalchemy import Column, Text, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from src.models.base import SQLAlchemyBase as ViewBase


class InboxItemWithTranscription(ViewBase):
    """View model for inbox items with transcription."""
    
    __tablename__ = "inbox_items_with_transcription"
    
    __table_args__ = {'info': {'is_view': True}}
    
    id = Column(UUID(as_uuid=True), primary_key=True)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    content = Column(Text, nullable=False)
    image_id = Column(UUID(as_uuid=True), nullable=True)
    audio_id = Column(UUID(as_uuid=True), nullable=True)
    processed = Column(Boolean, default=False)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    deleted_at = Column(DateTime, nullable=True)
    transcription = Column(Text, nullable=True)
    
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
