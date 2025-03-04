from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.auth import auth_router
from src.api.inbox import router as inbox_router
app = FastAPI(title="GTD Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(inbox_router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}