from gtd_shared.core.settings import Settings as SharedSettings
from typing import Optional


class Settings(SharedSettings):
    DATABASE_URL: Optional[str] = "postgresql+asyncpg://postgres:postgres@localhost:5432/gtd"
    PASSWORD_SECRET_KEY: str = "dasdasdasd"
    COOKIE_SECURE: bool = True
    COOKIE_DOMAIN: Optional[str] = None

    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    
    FRONTEND_URL: str = "http://localhost:5173"
    
    # tech debt: a refresh token strategy should be used instead of this long session expiration
    SESSION_EXPIRATION: int = 3600 * 24 * 7  # 1 week

    MINIO_ENDPOINT_URL: str = "http://localhost:9000"
    MINIO_ACCESS_KEY: str = "minioadmin"
    MINIO_SECRET_KEY: str = "minioadmin"
    MINIO_REGION: Optional[str] = None
    MINIO_BUCKET_NAME: str = "gtd-storage"

    AUTHENTIK_CLIENT_ID: str = ""
    AUTHENTIK_SECRET: str = ""
    AUTHENTIK_AUTHORIZATION_URL: str = "https://auth.braeden6.com/application/o/authorize/"
    AUTHENTIK_TOKEN_URL: str = "https://auth.braeden6.com/application/o/token/"
    AUTHENTIK_USERINFO_URL: str = "https://auth.braeden6.com/application/o/userinfo/"
    
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    
    SESSION_SECRET_KEY: str = "examplestring"
    GOOGLE_AUTH_URL: str = "https://accounts.google.com/o/oauth2/v2/auth"
    GOOGLE_TOKEN_URL: str = "https://oauth2.googleapis.com/token"
    GOOGLE_USERINFO_URL: str = "https://www.googleapis.com/oauth2/v3/userinfo"
    GOOGLE_SCOPE: str = "openid email profile https://www.googleapis.com/auth/calendar.events"
    GOOGLE_MOBILE_REDIRECT_URI: str = "com.braeden6.gtd://"
    GOOGLE_MOBILE_CLIENT_ID: str = ""

    @property
    def REDIS_URL(self) -> str:
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
