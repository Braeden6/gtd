from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from src.core.settings import settings
from src.api.auth import auth_router
from src.api.inbox import router as inbox_router

app = FastAPI(title="GTD Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.middleware("http")
async def log_cookies_middleware(request: Request, call_next):
    if ",gtd_auth" in request.cookies.get("gtd_auth", ""):
        fixed_value = request.cookies.get("gtd_auth", "").split(",")[0]
        request._cookies = {**request.cookies, "gtd_auth": fixed_value}
        
        cookie_header = request.headers.get('cookie', '')
        if cookie_header:
            parts = []
            for part in cookie_header.split(';'):
                if part.strip().startswith('gtd_auth='):
                    parts.append(f'gtd_auth={fixed_value}')
                else:
                    parts.append(part)
            request._headers = dict(request.headers.items()) # type: ignore
            request._headers['cookie'] = '; '.join(parts) # type: ignore
            request.scope.update(headers=[(k.encode(), v.encode()) for k, v in request._headers.items()])
        
    return await call_next(request)

app.include_router(auth_router)
app.include_router(inbox_router)

@app.get("/health")
async def health_check():
    return "ok"
