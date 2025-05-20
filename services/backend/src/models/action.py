from src.models.base import BaseSoftDeleteModel, BaseUpdateSoftDeleteModel, BaseSearchable, NaiveDateTime
from sqlmodel import Field, Relationship, SQLModel
from src.models.base import Priority
from uuid import UUID
from typing import Optional
from datetime import datetime
from typing import TYPE_CHECKING
from src.models.base.search import ComparisonSearch, StringComparison, SearchBaseEnumComparison
from enum import Enum

if TYPE_CHECKING:
    from src.models.inbox import InboxItem
    from src.models.project import Project
   
# ----- ENUMs ----- #
class ActionStatus(Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    DEFERRED = "deferred"

class ActionStatusComparison(SearchBaseEnumComparison[ActionStatus], table=False):
    value: ActionStatus = Field(...)  

# ----- MODELs ----- #
class Action(BaseSoftDeleteModel, table=True):
    __tablename__ = "actions"
    
    title: str = Field(nullable=False)
    description: Optional[str] = Field(nullable=True)
    priority: Optional[Priority] = Field(nullable=True)
    due_date: Optional[datetime] = Field(nullable=True)
    status: Optional[ActionStatus] = Field(default=ActionStatus.PENDING)
    project_id: Optional[UUID] = Field(default=None, foreign_key="projects.id")
    inbox_id: Optional[UUID] = Field(default=None, foreign_key="inbox_items.id")
    
    project: Optional["Project"] = Relationship(back_populates="actions")
    inbox_item: Optional["InboxItem"] = Relationship(back_populates="action")

class ActionUpdate(BaseUpdateSoftDeleteModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ActionStatus] = None
    project_id: Optional[UUID] = None
    inbox_id: Optional[UUID] = None

class SearchAction(BaseSearchable):
    title: Optional[StringComparison] = None
    description: Optional[StringComparison] = None
    priority: Optional[ComparisonSearch] = None
    due_date: Optional[ComparisonSearch] = None
    status: Optional[ActionStatusComparison] = None
    project_id: Optional[ComparisonSearch] = None
    inbox_id: Optional[ComparisonSearch] = None

# ----- DTOs ----- #    
class ActionCreate(SQLModel, table=False):
    title: str = Field(..., description="Title of the action")
    description: Optional[str] = Field(None, description="Description of the action")
    priority: Optional[Priority] = Field(None, description="Priority of the action")
    due_date: Optional[NaiveDateTime] = Field(None, description="Due date of the action")
    status: Optional[ActionStatus] = Field(None, description="Status of the action")
    project_id: Optional[UUID] = Field(None, description="Project ID of the action")

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Do this thing",
                "description": "Do something to complete this thing",
                "priority": Priority.HIGH,
                "due_date": "2023-06-15T12:30:45.123Z",
                "status": ActionStatus.PENDING,
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }

class ActionResponse(SQLModel, table=False):
    id: UUID
    title: str
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ActionStatus] = None
    created_at: datetime
    project_id: Optional[UUID] = None
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "title": "Remember to check on the project status",
                "description": "Check on the project status",
                "priority": Priority.HIGH,
                "due_date": "2023-06-15T12:30:45.123Z",
                "status": ActionStatus.PENDING,
                "created_at": "2023-06-15T12:30:45.123Z",
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }
