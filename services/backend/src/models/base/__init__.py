import uuid
from datetime import datetime
from typing import TypeVar, Optional
from uuid import UUID
from sqlalchemy.ext.declarative import declarative_base
from enum import Enum as PythonEnum
from sqlmodel import SQLModel, Field
from src.models.base.search import ComparisonSearch

SQLAlchemyBase = declarative_base()

class Priority(PythonEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class ActionStatus(PythonEnum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    DEFERRED = "deferred"

class ProjectStatus(PythonEnum):
    ACTIVE = "active"
    ON_HOLD = "on_hold"
    COMPLETED = "completed"


# class BaseModel(SQLAlchemyBase):  # type: ignore
#     """Base model with common fields for all entities."""

#     __abstract__ = True

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
#     updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
#     user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)

#     def __repr__(self) -> str:
#         return f"<{self.__class__.__name__}(id={self.id})>"


# class SoftDeleteModel(BaseModel):
#     """Base model with soft delete capability."""

#     __abstract__ = True

#     deleted_at = Column(DateTime, nullable=True, index=True)

#     @property
#     def is_deleted(self) -> bool:
#         return self.deleted_at is not None
   
   
# class BaseSearchModel(PydanticBaseModel):
#     user_id: UUID_TYPE
    
#     class Config:
#         arbitrary_types_allowed = True
    
# class BaseUpdateModel(PydanticBaseModel):
#     id: UUID_TYPE
#     user_id: UUID_TYPE
    
#     class Config:
#         arbitrary_types_allowed = True
    
# class BaseCreateModel(PydanticBaseModel):
#     user_id: UUID_TYPE
    
#     class Config:
#         arbitrary_types_allowed = True
    
# BaseModelType = TypeVar("BaseModelType", bound=BaseModel)
# CreateType = TypeVar("CreateType", bound=BaseCreateModel)
# UpdateType = TypeVar("UpdateType", bound=BaseUpdateModel)
# SoftDeleteModelType = TypeVar("SoftDeleteModelType", bound=SoftDeleteModel)
# SoftDeleteCreateType = TypeVar("SoftDeleteCreateType", bound=BaseCreateModel)
# SoftDeleteUpdateType = TypeVar("SoftDeleteUpdateType", bound=BaseUpdateModel)




# --- New ---- #

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