from fastapi_users.authentication import CookieTransport, AuthenticationBackend
from fastapi_users.authentication import RedisStrategy
from redis.asyncio import Redis

from src.core.settings import settings

cookie_transport = CookieTransport(
    cookie_name="gtd_auth",
    cookie_max_age=settings.SESSION_EXPIRATION,
    cookie_secure=settings.COOKIE_SECURE,
    cookie_domain=settings.COOKIE_DOMAIN,
    cookie_httponly=True,
)

redis = Redis.from_url(settings.REDIS_URL, decode_responses=True)


def get_redis_strategy() -> RedisStrategy:
    return RedisStrategy(
        redis=redis,
        lifetime_seconds=settings.SESSION_EXPIRATION,
    )


auth_backend = AuthenticationBackend(
    name="session",
    transport=cookie_transport,
    get_strategy=get_redis_strategy,
)
