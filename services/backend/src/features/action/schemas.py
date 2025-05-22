from src.features.action.model import ActionStatusComparison
from src.models.base import BaseUpdateSoftDeleteModel, BaseSearchable, NaiveDateTime
from src.models.base.search import ComparisonSearch, StringComparison
from typing import Optional
from src.features.action.model import Priority, ActionStatus
from datetime import datetime
from uuid import UUID
from sqlmodel import Field, SQLModel

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
