from pydantic import BaseModel, Field, UUID4
from typing import Optional
from datetime import datetime
from src.models.base import Priority, ProjectStatus

class ProjectCreate(BaseModel):
    """Schema for creating a new project."""

    title: str = Field(..., description="Title of the project")
    description: Optional[str] = Field(None, description="Description of the project")
    priority: Optional[Priority] = Field(None, description="Priority of the project")
    due_date: Optional[datetime] = Field(None, description="Due date of the project")
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

class ProjectResponse(BaseModel):
    """Schema for project response."""

    id: UUID4
    title: str
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ProjectStatus] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
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
