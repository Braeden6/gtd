import uuid
from datetime import datetime
from typing import TypeVar, Union
from sqlalchemy import Column, DateTime, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from uuid import UUID as UUID_TYPE
from sqlalchemy.ext.declarative import declarative_base
from enum import Enum as PythonEnum
from pydantic import BaseModel as PydanticBaseModel

UUID_UNION_TYPE = Union[UUID_TYPE, Column[UUID_TYPE], UUID]

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


class BaseModel(SQLAlchemyBase):  # type: ignore
    """Base model with common fields for all entities."""

    __abstract__ = True

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__}(id={self.id})>"


class SoftDeleteModel(BaseModel):
    """Base model with soft delete capability."""

    __abstract__ = True

    deleted_at = Column(DateTime, nullable=True, index=True)

    @property
    def is_deleted(self) -> bool:
        return self.deleted_at is not None
    
    
class BaseUpdateModel(PydanticBaseModel):
    id: UUID_TYPE
    user_id: UUID_TYPE
    
    class Config:
        arbitrary_types_allowed = True
    
class BaseCreateModel(PydanticBaseModel):
    user_id: UUID_TYPE
    
    class Config:
        arbitrary_types_allowed = True
    
BaseModelType = TypeVar("BaseModelType", bound=BaseModel)
CreateType = TypeVar("CreateType", bound=BaseCreateModel)
UpdateType = TypeVar("UpdateType", bound=BaseUpdateModel)
SoftDeleteModelType = TypeVar("SoftDeleteModelType", bound=SoftDeleteModel)
SoftDeleteCreateType = TypeVar("SoftDeleteCreateType", bound=BaseCreateModel)
SoftDeleteUpdateType = TypeVar("SoftDeleteUpdateType", bound=BaseUpdateModel)

