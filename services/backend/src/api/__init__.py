from src.api.auth import router as auth_router
from src.api.inbox import router as inbox_router 
from src.api.action import router as action_router
from src.api.project import router as project_router 
from src.api.audio import router as audio_router 
from src.api.image import router as image_router

routers = [
    auth_router,
    inbox_router,
    action_router,
    project_router,
    audio_router,
    image_router,
]


