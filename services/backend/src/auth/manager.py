from typing import Optional
from uuid import UUID

from fastapi import Depends, Request, Response
from fastapi_users import BaseUserManager, UUIDIDMixin
from fastapi_users.db import SQLAlchemyUserDatabase

from gtd_shared.core.logging import get_logger
from src.core.settings import settings
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from src.models.user import User, OAuthAccount
from gtd_shared.core.database import get_async_session

logger = get_logger()

class UserManager(UUIDIDMixin, BaseUserManager[User, UUID]):
    reset_password_token_secret = settings.PASSWORD_SECRET_KEY
    verification_token_secret = settings.PASSWORD_SECRET_KEY

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        logger.debug(f"User {user.id} has registered.") # type: ignore

    async def on_after_forgot_password(self, user: User, token: str, request: Optional[Request] = None):
        logger.debug(f"User {user.id} has forgot their password. Reset token: {token}") # type: ignore

    async def on_after_request_verify(self, user: User, token: str, request: Optional[Request] = None):
        logger.debug(f"Verification requested for user {user.id}. Verification token: {token}") # type: ignore

    async def on_after_login(self, user: User, request: Optional[Request] = None, response: Optional[Response] = None):
        logger.debug(f"User {user.id} has logged in.") # type: ignore

async def get_user_db(session: AsyncSession = Depends(get_async_session)) -> AsyncGenerator[SQLAlchemyUserDatabase, None]:
    yield SQLAlchemyUserDatabase(session, User, OAuthAccount)

async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)
