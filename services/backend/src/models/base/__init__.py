import uuid
from datetime import datetime
from typing import Annotated, TypeVar, Optional
from uuid import UUID
from enum import Enum 
from pydantic import BeforeValidator
from sqlmodel import SQLModel, Field
from src.models.base.search import ComparisonSearch, SearchBaseEnumComparison
from dateutil import parser # type: ignore

class Priority(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    
class PriorityComparison(SearchBaseEnumComparison[Priority], table=False):
    value: Priority = Field(...)  

class BaseModel(SQLModel, table=False):
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=lambda: datetime.now())
    updated_at: datetime = Field(default_factory=lambda: datetime.now())
    
class BaseSoftDeleteModel(BaseModel, table=False):
    deleted_at: Optional[datetime] = Field(default=None)
    
class BaseSearchable(SQLModel, table=False):
    offset: int = Field(default=0)
    limit: Optional[int] = Field(default=None)
    page: Optional[int] = Field(default=None)
    created_at: Optional[ComparisonSearch] = Field(default=None)
    updated_at: Optional[ComparisonSearch] = Field(default=None)
    
class BaseUpdateSoftDeleteModel(SQLModel, table=False):
    deleted_at: Optional[datetime] = Field(default=None)

UpdateType = TypeVar("UpdateType", bound=SQLModel)
BaseModelType = TypeVar("BaseModelType", bound=BaseModel)
SearchableType = TypeVar("SearchableType", bound=BaseSearchable)

SoftDeleteModelType = TypeVar("SoftDeleteModelType", bound=BaseSoftDeleteModel)
UpdateSoftDeleteType = TypeVar("UpdateSoftDeleteType", bound=BaseUpdateSoftDeleteModel)


def convert_to_naive_datetime(dt: Optional[datetime]) -> Optional[datetime]:
    if dt is None:
        return None
    
    if isinstance(dt, str):
        try:
            
            dt = parser.parse(dt)
        except (ImportError, ValueError):
            return dt
    if hasattr(dt, 'tzinfo') and dt.tzinfo is not None:
        return dt.replace(tzinfo=None)
    
    return dt

NaiveDateTime = Annotated[datetime, BeforeValidator(convert_to_naive_datetime)]