from src.models.base import BaseSoftDeleteModel, BaseUpdateSoftDeleteModel, BaseSearchable
from src.models.base import Priority, ProjectStatus
from typing import Optional, List, TYPE_CHECKING
if TYPE_CHECKING:
    from src.models.inbox import InboxItem
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from uuid import UUID


class ProjectLinkInbox(SQLModel, table=True):
    __tablename__ = "capture_project_links"
    
    capture_item_id: UUID = Field(foreign_key="inbox_items.id", primary_key=True)
    project_id: UUID = Field(foreign_key="projects.id", primary_key=True)

class Project(BaseSoftDeleteModel, table=True):
    __tablename__ = "projects"
    
    title: str = Field(nullable=False)
    description: Optional[str] = Field(nullable=True)
    priority: Optional[Priority] = Field(nullable=True)
    due_date: Optional[datetime] = Field(nullable=True)
    status: Optional[ProjectStatus] = Field(default=ProjectStatus.ACTIVE)
    inbox_items: List["InboxItem"] = Relationship(back_populates="project")

class ProjectUpdate(BaseUpdateSoftDeleteModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ProjectStatus] = None


class SearchProject(BaseSearchable):
    pass