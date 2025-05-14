from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.settings import settings
# from src.api.auth import auth_router
# from src.api.inbox import router as inbox_router
# from src.api.action import router as action_router
# from src.api.project import router as project_router
from src.api.test import router as test_router, router_soft_delete
# from src.service.audio_transcription_result import AudioTranscriptionResultProcessor
from starlette.middleware.sessions import SessionMiddleware

async def lifespan(app: FastAPI):
    # app.state.processor = AudioTranscriptionResultProcessor()
    # app.state.processor.start()
    yield
    # await app.state.processor.stop()

app = FastAPI(title="GTD Service", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.add_middleware(SessionMiddleware, secret_key=settings.SESSION_SECRET_KEY)
# app.include_router(auth_router)
# app.include_router(inbox_router)
# app.include_router(action_router)
# app.include_router(project_router)
app.include_router(test_router)
app.include_router(router_soft_delete)
@app.get("/health")
async def health_check():
    return "ok"
