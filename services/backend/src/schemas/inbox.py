from pydantic import BaseModel, UUID4
from typing import Optional, Union, Literal
from datetime import datetime
from uuid import UUID

class InboxItemUpdateDTO(BaseModel):
    """Schema for updating an inbox item."""

    content: Optional[str] = None
    image_id: Optional[UUID | Literal[False]] = None
    audio_id: Optional[UUID | Literal[False]] = None
    action_id: Optional[UUID | Literal[False]] = None
    project_id: Optional[UUID | Literal[False]] = None
    processed: Optional[bool] = None
    is_new: Optional[bool] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "content": "Remember to check on the project status",
                "image_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "audio_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "action_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "processed": False,
                "is_new": True
            }
        }


class SearchInboxItemDTO(BaseModel):
    content: Optional[str] = None
    action_id: Optional[Union[UUID, Literal[False]]] = None
    project_id: Optional[Union[UUID, Literal[False]]] = None
    processed: Optional[bool] = None
    has_image: Optional[bool] = None
    has_audio: Optional[bool] = None
    is_new: Optional[bool] = None
    order_by: Optional[Literal["created_at", "due_date", "priority"]] = None
    order_direction: Optional[Literal["asc", "desc"]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "content": "Remember to check on the project status",
                "action_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "processed": False,
                "has_image": True,
                "has_audio": True,
                "is_new": True,
                "order_by": "created_at",
                "order_direction": "desc"
            }
        }
    
class InboxItemResponseDTO(BaseModel):
    """Schema for inbox item response."""

    id: UUID4
    user_id: UUID4
    content: str
    audio_id: Optional[UUID4] = None
    image_path: Optional[str] = None
    processed: bool
    created_at: datetime
    transcription: Optional[str] = None
    is_new: bool
    action_id: Optional[UUID4] = None
    project_id: Optional[UUID4] = None
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "content": "Remember to check on the project status",
                "audio_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "image_path": "image/3fa85f64-5717-4562-b3fc-2c963f66afa6/20230615123045_e5f6g7h8.jpg",
                "processed": False,
                "is_new": True,
                "created_at": "2023-06-15T12:30:45.123Z",
                "transcription": "Remember to check on the project status",
                "action_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }
