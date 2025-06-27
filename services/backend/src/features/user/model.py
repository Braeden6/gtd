from typing import Optional
from sqlmodel import Field
from uuid import UUID
from datetime import datetime
import uuid
from sqlmodel import SQLModel

class User(SQLModel, table=True):
    __tablename__ = "users" # type: ignore
    
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now())
    updated_at: datetime = Field(default_factory=lambda: datetime.now())
    deleted_at: Optional[datetime] = Field(default=None)
    first_name: Optional[str] = Field(default=None)
    last_name: Optional[str] = Field(default=None)
    email: Optional[str] = Field(default=None)