from src.features.project.model import ProjectStatus, ProjectStatusComparison
from src.models.base import BaseUpdateSoftDeleteModel, BaseSearchable, NaiveDateTime, Priority, PriorityComparison
from src.models.base.search import StringComparison
from sqlmodel import SQLModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime

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
            }
        }