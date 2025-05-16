from fastapi import APIRouter, HTTPException, Request, Query
from src.schemas.user import UserRead, UserUpdate
from src.core.dependencies import fastapi_users
from src.auth.oauth import authentik_oauth_client, google_oauth_client, google_oauth_mobile
from src.core.settings import settings
import secrets
from httpx import AsyncClient
from authlib.oauth2.rfc7636 import create_s256_code_challenge # type: ignore
from src.auth.manager import get_user_manager, UserManager
from fastapi_users.authentication import Authenticator
from fastapi import Depends
from src.auth.backend import auth_backend, DatabaseStrategy, get_database_strategy
from gtd_shared.core.logging import get_logger
from src.models.user import User
from fastapi_users.schemas import BaseUserCreate

logger = get_logger()

router = APIRouter()

router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

router.include_router(
    fastapi_users.get_oauth_router(
        authentik_oauth_client,
        auth_backend,
        state_secret=settings.AUTHENTIK_SECRET,
        associate_by_email=True,
        redirect_url=f"{settings.FRONTEND_URL}/auth/callback",
        is_verified_by_default=True,
    ),
    prefix="/auth/oauth/authentik",
    tags=["auth"],
)

router.include_router(
    fastapi_users.get_oauth_router(
        google_oauth_client,
        auth_backend,
        state_secret=settings.AUTHENTIK_SECRET,
        associate_by_email=True,
        redirect_url=f"{settings.FRONTEND_URL}/auth/callback",
        is_verified_by_default=True,
    ),
    prefix="/auth/oauth/google",
    tags=["auth"],
)

router.include_router(
    fastapi_users.get_oauth_router(
        authentik_oauth_client,
        auth_backend,
        state_secret=settings.AUTHENTIK_SECRET,
        associate_by_email=True,
        redirect_url="com.braeden6.gtd://",
        is_verified_by_default=True,
    ),
    prefix="/auth/oauth/mobile/authentik",
    tags=["auth"],
)

get_user_token = Authenticator([auth_backend], get_user_manager).current_user_token(
    active=True, verified=True
)

@router.post("/auth/logout", tags=["auth"])
async def logout(
        request: Request, 
        strategy: DatabaseStrategy = Depends(get_database_strategy),
        user_token: tuple[User, str] = Depends(get_user_token)
    ):
    user, token = user_token
    request.session.clear()
    await auth_backend.logout(strategy, user, token)
    return {"message": "Logged out"}

@router.get("/auth/oauth/mobile/google/authorize", tags=["auth"])
async def get_authorization_url(request: Request) -> dict[str, str]:
    code_verifier = secrets.token_urlsafe(48)
    code_challenge = create_s256_code_challenge(code_verifier)
    request.session["code_verifier"] = code_verifier
    state = secrets.token_urlsafe(32)
    request.session["oauth_state"] = state
    
    uri = await google_oauth_mobile.create_authorization_url(
        settings.GOOGLE_MOBILE_REDIRECT_URI,
        code_challenge=code_challenge,
        code_challenge_method="S256",
        state=state,
        prompt="consent"
    )
    return {"authorization_url": uri["url"]}

@router.get("/auth/oauth/mobile/google/callback", tags=["auth"])
async def auth_callback(
    request: Request,
    code: str = Query(...),
    state: str = Query(...),
    user_manager: UserManager = Depends(get_user_manager),
    strategy: DatabaseStrategy = Depends(get_database_strategy)
):
    """Process OAuth callback with PKCE"""
    # Verify state to prevent CSRF
    session_state = request.session.get("oauth_state")
    if state != session_state:
        raise HTTPException(status_code=400, detail="Invalid state parameter")
    
    # Get stored code verifier
    code_verifier = request.session.get("code_verifier")
    if not code_verifier:
        raise HTTPException(status_code=400, detail="Missing code verifier")
    
    async with AsyncClient() as client:
        token_response = await client.post(
            settings.GOOGLE_TOKEN_URL,
            data={
                "client_id": settings.GOOGLE_MOBILE_CLIENT_ID,
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": settings.GOOGLE_MOBILE_REDIRECT_URI,
                "code_verifier": code_verifier,
            },
        )
        
        if token_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Token exchange failed")
        
        tokens = token_response.json()
        user_response = await client.get(
            settings.GOOGLE_USERINFO_URL,
            headers={"Authorization": f"Bearer {tokens['access_token']}"},
        )
        
        if user_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to get user info")
        
        user_info = user_response.json()
        if "code_verifier" in request.session:
            del request.session["code_verifier"]
        if "oauth_state" in request.session:
            del request.session["oauth_state"]

        try:
            user = await user_manager.get_by_email(user_info["email"])
        except Exception:
            user = await user_manager.create(BaseUserCreate(email=user_info["email"], password=secrets.token_urlsafe(32), is_verified=True))
        return await auth_backend.login(strategy, user)