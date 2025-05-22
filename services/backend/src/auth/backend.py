from fastapi_users.authentication import CookieTransport, AuthenticationBackend
from fastapi_users.authentication import RedisStrategy
from redis.asyncio import Redis
from src.core.settings import settings
from fastapi import Depends
from gtd_shared.core.database import get_async_session
from fastapi_users.authentication.strategy.db import AccessTokenDatabase, DatabaseStrategy
from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyAccessTokenDatabase
from sqlalchemy.ext.asyncio import AsyncSession
from src.features.user.model import AccessToken

async def get_access_token_db(
    session: AsyncSession = Depends(get_async_session),
): 
    yield SQLAlchemyAccessTokenDatabase(session, AccessToken)

cookie_transport = CookieTransport(
    cookie_name="gtd_auth",
    cookie_max_age=settings.SESSION_EXPIRATION,
    cookie_secure=settings.COOKIE_SECURE,
    cookie_domain=settings.COOKIE_DOMAIN,
    cookie_httponly=True,
    cookie_samesite='lax',
)

redis = Redis.from_url(settings.REDIS_URL, decode_responses=True)

def get_redis_strategy() -> RedisStrategy:
    return RedisStrategy(
        redis=redis,
        lifetime_seconds=settings.SESSION_EXPIRATION,
    )
    
def get_database_strategy(
    access_token_db: AccessTokenDatabase[AccessToken] = Depends(get_access_token_db),
) -> DatabaseStrategy:
    return DatabaseStrategy(access_token_db, lifetime_seconds=settings.SESSION_EXPIRATION)


auth_backend = AuthenticationBackend(
    name="session",
    transport=cookie_transport,
    # get_strategy=get_redis_strategy,
    get_strategy=get_database_strategy,
)
