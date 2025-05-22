from src.models.base import BaseSearchable
from src.models.base.search import ComparisonSearch, StringComparison
from typing import Optional
from sqlmodel import SQLModel
from uuid import UUID
from datetime import datetime

class TagUpdate(SQLModel, table=False):
    name: Optional[str] = None
    color: Optional[str] = None
    description: Optional[str] = None
    
class SearchTag(BaseSearchable):
    name: Optional[ComparisonSearch] = None
    color: Optional[StringComparison] = None
    description: Optional[StringComparison] = None
    
    
class CreateTagDTO(SQLModel, table=False):
    name: str
    color: Optional[str] = None
    description: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Tag Name",
                "color": "blue",
                "description": "Tag Description"
            }
        }
    
class TagResponse(SQLModel, table=False):
    id: UUID
    name: str
    color: Optional[str] = None
    description: Optional[str] = None
    created_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "name": "Tag Name",
                "color": "blue",
                "description": "Tag Description",
                "created_at": "2021-01-01T00:00:00Z"
            }
        }
    
    
