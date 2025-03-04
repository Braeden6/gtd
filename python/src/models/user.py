from datetime import datetime
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from src.models.base import SQLAlchemyBase
from fastapi_users.db import SQLAlchemyBaseUserTable
import uuid

class User(SQLAlchemyBaseUserTable[UUID], SQLAlchemyBase): # type: ignore
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) # type: ignore
    first_name = Column(String(length=255), nullable=True)
    last_name = Column(String(length=255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    