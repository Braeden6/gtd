from fastapi import APIRouter, Depends

from src.auth.backend import auth_backend
from src.models.user import User
from src.schemas.user import UserRead, UserCreate, UserUpdate
from src.core.dependencies import fastapi_users, current_active_user
from src.auth.oauth import authentik_oauth_client
from src.core.settings import settings

auth_router = APIRouter()

auth_router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

auth_router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

auth_router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)

auth_router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)

auth_router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

auth_router.include_router(
    fastapi_users.get_oauth_router(
        authentik_oauth_client,
        auth_backend,
        state_secret=settings.AUTHENTIK_SECRET,
        associate_by_email=True,
        redirect_url='http://localhost:5173/auth/callback',
        is_verified_by_default=True,
    ),
    prefix="/auth/oauth/authentik",
    tags=["auth"],
)




@auth_router.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}"}
