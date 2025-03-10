from pydantic import BaseModel, Field, UUID4
from typing import Optional
from datetime import datetime


class InboxItemCreate(BaseModel):
    """Schema for creating a new inbox item."""

    content: str = Field(..., description="Text content of the inbox item")

    class Config:
        json_schema_extra = {"example": {"content": "Remember to check on the project status"}}


class InboxItemResponse(BaseModel):
    """Schema for inbox item response."""

    id: UUID4
    user_id: UUID4
    content: str
    audio_path: Optional[str] = None
    image_path: Optional[str] = None
    processed: bool
    created_at: datetime

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "content": "Remember to check on the project status",
                "audio_path": "audio/3fa85f64-5717-4562-b3fc-2c963f66afa6/20230615123045_a1b2c3d4.mp3",
                "image_path": "image/3fa85f64-5717-4562-b3fc-2c963f66afa6/20230615123045_e5f6g7h8.jpg",
                "processed": False,
                "created_at": "2023-06-15T12:30:45.123Z",
            }
        }
