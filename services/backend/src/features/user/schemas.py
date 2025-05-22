from typing import Optional
from datetime import datetime
from uuid import UUID

from fastapi_users import schemas
from pydantic import BaseModel


class UserRead(schemas.BaseUser[UUID]):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    created_at: datetime
    updated_at: datetime


class UserCreate(schemas.BaseUserCreate):
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserUpdate(schemas.BaseUserUpdate):
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class SessionRead(BaseModel):
    id: UUID
    expires_at: datetime
    created_at: datetime
