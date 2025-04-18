from httpx_oauth.oauth2 import OAuth2
from src.core.settings import settings
from typing import Any, Dict, Tuple, cast
import httpx
import ssl
from gtd_shared.core.logging import get_logger
from httpx_oauth.clients.google import GoogleOAuth2
from authlib.integrations.starlette_client import OAuth # type: ignore
from starlette.config import Config # type: ignore

logger = get_logger()

class AuthentikOAuth2(OAuth2):
    def __init__(self):
        super().__init__(
            client_id=settings.AUTHENTIK_CLIENT_ID,
            client_secret=settings.AUTHENTIK_SECRET,
            authorize_endpoint=settings.AUTHENTIK_AUTHORIZATION_URL,
            access_token_endpoint=settings.AUTHENTIK_TOKEN_URL,
        )

    async def get_id_email(self, token: str) -> Tuple[str, str]:
        try:
            ssl_context = ssl.create_default_context()
            ssl_context.check_hostname = False
            ssl_context.verify_mode = ssl.CERT_NONE

            async with httpx.AsyncClient(verify=ssl_context) as client:
                response = await client.get(
                    settings.AUTHENTIK_USERINFO_URL,
                    headers={"Authorization": f"Bearer {token}"},
                )
                if response.status_code >= 400:
                    raise Exception(f"Failed to fetch user info: {response.text}")

                data = cast(Dict[str, Any], response.json())
                return data["sub"], data["email"]
        except Exception as e:
            logger.error(f"Error in get_id_email: {str(e)}")
            raise

authentik_oauth_client = AuthentikOAuth2()
# Google People API must be enabled for this to work
google_oauth_client = GoogleOAuth2(
    settings.GOOGLE_CLIENT_ID, 
    settings.GOOGLE_CLIENT_SECRET,
    scopes=settings.GOOGLE_SCOPE.split(" "),
)

config = Config()
google_oauth_mobile = OAuth(config)
google_oauth_mobile.register(
    name="google",
    client_id=settings.GOOGLE_MOBILE_CLIENT_ID,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": settings.GOOGLE_SCOPE},
)
google_oauth_mobile = google_oauth_mobile.google