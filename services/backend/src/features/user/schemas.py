from typing import Optional
from datetime import datetime
from uuid import UUID

from fastapi_users import schemas
from pydantic import BaseModel
from sqlmodel import SQLModel
from src.models.base import BaseSearchable, BaseUpdateSoftDeleteModel
from src.models.base.search import ComparisonSearch


class UserUpdate(BaseUpdateSoftDeleteModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    
class SearchUser(BaseSearchable):
    first_name: Optional[ComparisonSearch] = None
    last_name: Optional[ComparisonSearch] = None

class UserCreate(SQLModel, table=False):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com"
            }
        }

class UserUpdateDTO(SQLModel, table=False):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    
class UserReadDTO(SQLModel, table=False):
    id: UUID
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "first_name": "John",
                "last_name": "Doe",
                "created_at": "2023-06-15T12:30:45.123Z",
                "updated_at": "2023-06-15T12:30:45.123Z"
            }
        }