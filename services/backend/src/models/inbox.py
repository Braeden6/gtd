from sqlalchemy import Column, Text, Boolean, Index, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from src.models.base import SoftDeleteModel, BaseUpdateModel, BaseCreateModel, UUID_UNION_TYPE
from typing import Optional


class InboxItem(SoftDeleteModel):
    """Inbox item model for storing user submissions."""

    __tablename__ = "inbox_items"

    content = Column(Text, nullable=False)
    image_id = Column(UUID(as_uuid=True), ForeignKey("images.id"), nullable=True, index=True)
    audio_id = Column(UUID(as_uuid=True), ForeignKey("audios.id"), nullable=True, index=True)
    processed = Column(Boolean, default=False)

    __table_args__ = (Index("idx_inbox_user_processed", "user_id", "processed"),)

    def __repr__(self) -> str:
        return f"<InboxItem(id={self.id}, user_id={self.user_id}, processed={self.processed}, image_id={self.image_id}, audio_id={self.audio_id})>"
    
    
class InboxItemCreate(BaseCreateModel):
    content: str
    image_id: Optional[UUID_UNION_TYPE] = None
    audio_id: Optional[UUID_UNION_TYPE] = None
    processed: bool = False

class InboxItemUpdate(BaseUpdateModel):
    content: Optional[str] = None
    image_id: Optional[UUID_UNION_TYPE] = None
    audio_id: Optional[UUID_UNION_TYPE] = None
    processed: Optional[bool] = None
