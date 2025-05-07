from pydantic import BaseModel, Field, UUID4
from typing import Optional
from datetime import datetime
from src.models.base import Priority, ActionStatus
from uuid import UUID
class ActionCreate(BaseModel):
    """Schema for creating a new action."""

    title: str = Field(..., description="Title of the action")
    description: Optional[str] = Field(None, description="Description of the action")
    priority: Optional[Priority] = Field(None, description="Priority of the action")
    due_date: Optional[datetime] = Field(None, description="Due date of the action")
    status: Optional[ActionStatus] = Field(None, description="Status of the action")
    project_id: Optional[UUID] = Field(None, description="Project ID of the action")

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Remember to check on the project status",
                "description": "Check on the project status",
                "priority": Priority.HIGH,
                "due_date": "2023-06-15T12:30:45.123Z",
                "status": ActionStatus.PENDING,
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }

class ActionResponse(BaseModel):
    """Schema for action response."""

    id: UUID4
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
