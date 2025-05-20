from src.models.base import BaseUpdateSoftDeleteModel, BaseSearchable, NaiveDateTime
from src.models.base.search import ComparisonSearch, StringComparison
from sqlmodel import SQLModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime


class SomedayUpdate(BaseUpdateSoftDeleteModel):
    review_date: Optional[datetime] = None
    notes: Optional[str] = None
    inbox_id: Optional[UUID] = None

class SearchSomeday(BaseSearchable):
    review_date: Optional[StringComparison] = None
    notes: Optional[StringComparison] = None
    inbox_id: Optional[ComparisonSearch] = None
    
# ----- DTOs ----- #
class SomedayCreate(SQLModel, table=False):
    review_date: Optional[NaiveDateTime] = Field(None, description="Review date of the someday item")  
    notes: Optional[str] = Field(None, description="Notes of the someday item")
    inbox_id: Optional[UUID] = Field(None, description="Inbox id of the someday item")
    created_at: Optional[NaiveDateTime] = Field(None, description="Created at of the someday item")

    class Config:
        json_schema_extra = {
            "example": {
                "review_date": "2023-06-15T12:30:45.123Z",
                "notes": "Remember to check on the project status",
                "inbox_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "created_at": "2023-06-15T12:30:45.123Z"
            }
        }

class ProjectResponse(SQLModel, table=False):
    id: UUID
    review_date: Optional[datetime] = None
    notes: Optional[str] = None
    inbox_id: Optional[UUID] = None
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
