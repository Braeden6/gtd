from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from uuid import UUID
from datetime import datetime, timezone
import uuid
from sqlalchemy import Column, DateTime

class User(SQLModel, table=True):
    __tablename__ = "users"
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    first_name: Optional[str] = Field(default=None)
    last_name: Optional[str] = Field(default=None)
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    )
    updated_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    )
    email: str = Field(default=None)
    hashed_password: str = Field(default=None) # required for fastapi-users but not used
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    is_verified: bool = Field(default=False)
    # deleted_at??
    
    oauth_accounts: List["OAuthAccount"] = Relationship(back_populates="user", sa_relationship_kwargs={"lazy": "joined"})
    access_tokens: List["AccessToken"] = Relationship(back_populates="user")
    
class OAuthAccount(SQLModel, table=True):
    __tablename__ = "oauth_accounts"
    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id")
    user: User = Relationship(back_populates="oauth_accounts")
    access_token: str = Field(default=None)
    refresh_token: Optional[str] = Field(default=None)
    oauth_name: str = Field(default=None)
    expires_at: int = Field(default=None)
    account_id: str = Field(default=None)
    account_email: str = Field(default=None)
    
class AccessToken(SQLModel, table=True):
    __tablename__ = "access_tokens"
    user_id: UUID = Field(foreign_key="users.id")
    token: str = Field(default=None, primary_key=True)
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    )
    user: User = Relationship(back_populates="access_tokens")
