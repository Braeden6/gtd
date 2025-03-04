import uuid
from datetime import datetime
from typing import TypeVar
from sqlalchemy import Column, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base

SQLAlchemyBase = declarative_base()

class BaseModel(SQLAlchemyBase): # type: ignore
    """Base model with common fields for all entities."""
    __abstract__ = True

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__}(id={self.id})>"


class SoftDeleteModel(BaseModel):
    """Base model with soft delete capability."""
    __abstract__ = True

    deleted_at = Column(DateTime, nullable=True, index=True)
    
    @property
    def is_deleted(self) -> bool:
        return self.deleted_at is not None

BaseModelType = TypeVar('BaseModelType', bound=BaseModel)
SoftDeleteModelType = TypeVar('SoftDeleteModelType', bound=SoftDeleteModel)