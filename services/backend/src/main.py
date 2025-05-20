from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.settings import settings
from src.api import routers
from src.core.util import get_all_routers
from src.service.audio_transcription_result import AudioTranscriptionResultProcessor
from starlette.middleware.sessions import SessionMiddleware

async def lifespan(app: FastAPI):
    app.state.processor = AudioTranscriptionResultProcessor()
    app.state.processor.start()
    yield
    await app.state.processor.stop()

app = FastAPI(title="GTD Service", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.add_middleware(SessionMiddleware, secret_key=settings.SESSION_SECRET_KEY)

# tech debt: convert all to new structure and will be auto imported below
for router in routers:
    app.include_router(router)
    
all_routers = get_all_routers()
for router in all_routers:
    print(router)
    app.include_router(router)
    

@app.get("/health")
async def health_check():
    return "ok"
