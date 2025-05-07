from src.models.base import SoftDeleteModel, SQLAlchemyBase as BaseModel, BaseCreateModel, BaseUpdateModel
from sqlalchemy import Column, Text, Enum, DateTime
from src.models.base import Priority, ProjectStatus
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey
from typing import Optional
from datetime import datetime

class ProjectLinkInbox(BaseModel):
    """Many-to-many relationship between InboxItems and Projects"""
    __tablename__ = "capture_project_links"
    
    capture_item_id = Column(UUID(as_uuid=True), ForeignKey("inbox_items.id"), primary_key=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), primary_key=True)
    relationship_type = Column(Text, nullable=True)  # 'source', 'related', etc.

class Project(SoftDeleteModel):
    """Project grouping of actions and references"""
    __tablename__ = "projects"
    
    title = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    priority: Column[Priority] = Column(Enum(Priority, name="priority_enum"), nullable=True)
    due_date = Column(DateTime, nullable=True)
    status: Column[ProjectStatus] = Column(Enum(ProjectStatus, name="project_status_enum"), default=ProjectStatus.ACTIVE)
    
class ProjectCreate(BaseCreateModel):
    title: str
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ProjectStatus] = None

class ProjectUpdate(BaseUpdateModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ProjectStatus] = None
