from sqlalchemy import Column, Text, Boolean, Index, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from src.models.base import SoftDeleteModel, BaseUpdateModel, BaseCreateModel, UUID_UNION_TYPE, BaseSearchModel
from typing import Optional, Union, Literal


class InboxItem(SoftDeleteModel):
    """Inbox item model for storing user submissions."""

    __tablename__ = "inbox_items"

    content = Column(Text, nullable=False)
    image_id = Column(UUID(as_uuid=True), ForeignKey("images.id"), nullable=True, index=True)
    audio_id = Column(UUID(as_uuid=True), ForeignKey("audios.id"), nullable=True, index=True)
    processed = Column(Boolean, default=False)
    is_new = Column(Boolean, default=True)
    
    action_id = Column(UUID(as_uuid=True), ForeignKey("actions.id"), nullable=True, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=True, index=True)

    __table_args__ = (Index("idx_inbox_user_processed", "user_id", "processed"),)

    def __repr__(self) -> str:
        return f"<InboxItem(id={self.id}, user_id={self.user_id}, processed={self.processed}, image_id={self.image_id}, audio_id={self.audio_id})>"
    
    
class InboxItemCreate(BaseCreateModel):
    content: str
    image_id: Optional[UUID_UNION_TYPE] = None
    audio_id: Optional[UUID_UNION_TYPE] = None
    action_id: Optional[UUID_UNION_TYPE] = None
    project_id: Optional[UUID_UNION_TYPE] = None
    processed: bool = False
    is_new: bool = True

class InboxItemUpdate(BaseUpdateModel):
    content: Optional[str] = None
    image_id: Optional[UUID_UNION_TYPE] = None
    audio_id: Optional[UUID_UNION_TYPE] = None
    action_id: Optional[UUID_UNION_TYPE] = None
    project_id: Optional[UUID_UNION_TYPE] = None
    processed: Optional[bool] = None
    is_new: Optional[bool] = None
    
class SearchInboxItem(BaseSearchModel):
    content: Optional[str] = None
    action_id: Optional[Union[UUID_UNION_TYPE, Literal[False]]] = None
    project_id: Optional[Union[UUID_UNION_TYPE, Literal[False]]] = None
    processed: Optional[bool] = None
    has_image: Optional[bool] = None
    has_audio: Optional[bool] = None
    is_new: Optional[bool] = None
    order_by: Optional[Literal["created_at", "due_date", "priority"]] = None
    order_direction: Optional[Literal["asc", "desc"]] = None

