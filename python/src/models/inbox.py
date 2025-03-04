from sqlalchemy import Column, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Index

from src.models.base import SoftDeleteModel

class InboxItem(SoftDeleteModel):
    """Inbox item model for storing user submissions."""
    __tablename__ = 'inbox_items'
    
    user_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    content = Column(Text, nullable=False)
    audio_path = Column(Text, nullable=True)
    image_path = Column(Text, nullable=True)
    processed = Column(Boolean, default=False)

    __table_args__ = (
        Index('idx_inbox_user_processed', 'user_id', 'processed'),
    )

    def __repr__(self):
        return f"<InboxItem(id={self.id}, user_id={self.user_id}, processed={self.processed})>"