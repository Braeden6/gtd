from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, relationship
from src.models.base import SQLAlchemyBase
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyBaseOAuthAccountTable
import uuid


class OAuthAccount(SQLAlchemyBaseOAuthAccountTable[UUID], SQLAlchemyBase):  # type: ignore
    __tablename__ = "oauth_accounts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)  # type: ignore
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    access_token = Column(Text, nullable=False)  # type: ignore
    refresh_token = Column(Text, nullable=True)  # type: ignore


class User(SQLAlchemyBaseUserTableUUID, SQLAlchemyBase):  # type: ignore
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)  # type: ignore
    first_name = Column(String(length=255), nullable=True)
    last_name = Column(String(length=255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    oauth_accounts: Mapped[list[OAuthAccount]] = relationship("OAuthAccount", lazy="joined")
