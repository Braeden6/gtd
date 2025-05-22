from src.models.base import BaseUpdateSoftDeleteModel, BaseSearchable, NaiveDateTime
from src.models.base.search import ComparisonSearch, StringComparison
from sqlmodel import SQLModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime

class ReferenceUpdate(BaseUpdateSoftDeleteModel):
    title: Optional[str] = None
    content: Optional[str] = None
    ai_summary: Optional[str] = None
    inbox_item_id: Optional[UUID] = None
    
class SearchReference(BaseSearchable):
    title: Optional[StringComparison] = None
    content: Optional[StringComparison] = None
    ai_summary: Optional[StringComparison] = None
    inbox_item_id: Optional[ComparisonSearch] = None
    
# ----- DTOs ----- #
class ReferenceCreate(SQLModel, table=False):
    title: str = Field(..., description="Title of the reference")
    content: str = Field(..., description="Content of the reference")
    ai_summary: Optional[str] = Field(None, description="AI summary of the reference")
    inbox_item_id: Optional[UUID] = Field(None, description="Inbox item id of the reference")
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "Reference Title",
                "content": "Reference Content",
                "ai_summary": "AI Summary",
                "inbox_item_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            }
        }

class ReferenceResponse(SQLModel, table=False):
    id: UUID
    title: str
    content: str
    ai_summary: Optional[str] = None
    inbox_item_id: Optional[UUID] = None
    created_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "review_date": "2023-06-15T12:30:45.123Z",
                "notes": "Remember to check on the project status",
                "inbox_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "created_at": "2023-06-15T12:30:45.123Z"
            }
        }
