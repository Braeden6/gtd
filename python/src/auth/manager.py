from typing import Optional
from uuid import UUID

from fastapi import Depends, Request, Response
from fastapi_users import BaseUserManager, UUIDIDMixin
from fastapi_users.db import SQLAlchemyUserDatabase

from src.core.settings import settings
from src.models.user import User
from src.core.database import get_user_db

import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


class UserManager(UUIDIDMixin, BaseUserManager[User, UUID]):
    reset_password_token_secret = settings.PASSWORD_SECRET_KEY
    verification_token_secret = settings.PASSWORD_SECRET_KEY

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        logger.debug(f"User {user.id} has registered.")

    async def on_after_forgot_password(self, user: User, token: str, request: Optional[Request] = None):
        logger.debug(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(self, user: User, token: str, request: Optional[Request] = None):
        logger.debug(f"Verification requested for user {user.id}. Verification token: {token}")
        print(request)
        
    async def on_after_login(self, user: User, request: Optional[Request] = None, response: Optional[Response] = None):
        logger.debug(f"User {user.id} has logged in.")



async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)
