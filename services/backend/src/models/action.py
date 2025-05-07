from src.models.base import UUID_UNION_TYPE, SoftDeleteModel, BaseCreateModel, BaseUpdateModel
from sqlalchemy import Column, Text, Enum, DateTime, ForeignKey
from sqlalchemy import Index
from src.models.base import Priority, ActionStatus
from sqlalchemy.dialects.postgresql import UUID
from typing import Optional
from datetime import datetime

class Action(SoftDeleteModel):
    """Actionable tasks derived from inbox items"""
    __tablename__ = "actions"
    
    title = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    priority: Column[Priority] = Column(Enum(Priority, name="priority_enum"), nullable=True)
    due_date = Column(DateTime, nullable=True)
    status: Column[ActionStatus] = Column(Enum(ActionStatus, name="action_status_enum"), default=ActionStatus.PENDING)
    inbox_item_id = Column(UUID(as_uuid=True), ForeignKey("inbox_items.id"), nullable=True, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), index=True, nullable=True)

    
    __table_args__ = (
        Index("idx_action_due_date_status", "due_date", "status"),
    )
    
    def __repr__(self):
        return f"<Action(id={self.id}, title={self.title}, description={self.description}, priority={self.priority}, due_date={self.due_date}, status={self.status})>"
    
class ActionCreate(BaseCreateModel):
    title: str
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ActionStatus] = None
    project_id: Optional[UUID_UNION_TYPE] = None


class ActionUpdate(BaseUpdateModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ActionStatus] = None
    project_id: Optional[UUID_UNION_TYPE] = None