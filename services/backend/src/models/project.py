from src.models.base import BaseSoftDeleteModel, BaseUpdateSoftDeleteModel, BaseSearchable, NaiveDateTime
from src.models.base import Priority, PriorityComparison
from typing import Optional, List, TYPE_CHECKING
from src.models.base.search import StringComparison, SearchBaseEnumComparison
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from uuid import UUID
from enum import Enum

if TYPE_CHECKING:
    from src.models.inbox import InboxItem
    from src.models.action import Action
    
# ----- ENUMs ----- #
class ProjectStatus(Enum):
    ACTIVE = "active"
    ON_HOLD = "on_hold"
    COMPLETED = "completed"
    
class ProjectStatusComparison(SearchBaseEnumComparison[ProjectStatus], table=False):
    value: ProjectStatus = Field(...) 

# ----- MODELs ----- #
class Project(BaseSoftDeleteModel, table=True):
    __tablename__ = "projects"
    
    title: str = Field(nullable=False)
    description: Optional[str] = Field(nullable=True)
    priority: Optional[Priority] = Field(nullable=True)
    due_date: Optional[datetime] = Field(nullable=True)
    
    inbox_items: List["InboxItem"] = Relationship(back_populates="project")
    actions: List["Action"] = Relationship(back_populates="project")

class ProjectUpdate(BaseUpdateSoftDeleteModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ProjectStatus] = None

class SearchProject(BaseSearchable):
    title: Optional[StringComparison] = None
    description: Optional[StringComparison] = None
    priority: Optional[PriorityComparison] = None
    status: Optional[ProjectStatusComparison] = None
    
# ----- DTOs ----- #
class ProjectCreate(SQLModel, table=False):
    title: str = Field(..., description="Title of the project")
    description: Optional[str] = Field(None, description="Description of the project")
    priority: Optional[Priority] = Field(None, description="Priority of the project")
    due_date: Optional[NaiveDateTime] = Field(None, description="Due date of the project")
    status: Optional[ProjectStatus] = Field(None, description="Status of the project")

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Remember to check on the project status",
                "description": "Check on the project status",
                "priority": Priority.HIGH,
                "due_date": "2023-06-15T12:30:45.123Z",
                "status": ProjectStatus.ACTIVE,
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }

class ProjectResponse(SQLModel, table=False):
    id: UUID
    title: str
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ProjectStatus] = None
    created_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "title": "Remember to check on the project status",
                "description": "Check on the project status",
                "priority": Priority.HIGH,
                "due_date": "2023-06-15T12:30:45.123Z",
                "status": ProjectStatus.ACTIVE,
                "created_at": "2023-06-15T12:30:45.123Z",
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }
