from httpx_oauth.oauth2 import OAuth2
from src.core.settings import settings
from typing import Any, Dict, Tuple, cast
import httpx
import ssl


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
            print(f"Error in get_id_email: {str(e)}")
            raise


authentik_oauth_client = AuthentikOAuth2()
