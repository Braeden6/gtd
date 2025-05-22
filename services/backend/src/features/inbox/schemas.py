from src.models.base import BaseUpdateSoftDeleteModel, BaseSearchable
from src.models.base.search import ComparisonSearch, StringComparison, BooleanSearch
from typing import Optional, Literal
from uuid import UUID
from sqlmodel import SQLModel
from datetime import datetime

class InboxItemUpdate(BaseUpdateSoftDeleteModel):
    content: Optional[str] = None
    image_id: Optional[UUID] = None
    audio_id: Optional[UUID] = None
    project_id: Optional[UUID] = None
    processed: Optional[bool] = None
    is_new: Optional[bool] = None
    
class SearchInboxItem(BaseSearchable):
    content: Optional[StringComparison] = None
    image_id: Optional[ComparisonSearch] = None
    processed: Optional[BooleanSearch] = None
    is_new: Optional[BooleanSearch] = None
    project_id: Optional[ComparisonSearch] = None

class InboxItemUpdateDTO(SQLModel, table=False):
    content: Optional[str] = None
    image_id: Optional[UUID | Literal[False]] = None
    audio_id: Optional[UUID | Literal[False]] = None
    project_id: Optional[UUID | Literal[False]] = None
    processed: Optional[bool] = None
    is_new: Optional[bool] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "content": "Remember to check on the project status",
                "image_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "audio_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "processed": False,
                "is_new": True
            }
        }

class InboxItemResponseDTO(SQLModel, table=False):
    id: UUID
    user_id: UUID
    content: str
    audio_id: Optional[UUID] = None
    image_id: Optional[UUID] = None
    processed: bool
    created_at: datetime
    transcription: Optional[str] = None
    is_new: bool
    project_id: Optional[UUID] = None
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "content": "Remember to check on the project status",
                "audio_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "image_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "processed": False,
                "is_new": True,
                "created_at": "2023-06-15T12:30:45.123Z",
                "transcription": "Remember to check on the project status",
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }

