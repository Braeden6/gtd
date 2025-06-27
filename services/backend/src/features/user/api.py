from uuid import UUID
from src.features.user.service import UserService
from typing_extensions import Annotated
from fastapi import APIRouter
from src.features.user.schemas import UserCreate, UserReadDTO
from src.core.dependencies import current_active_user, verify_user
from fastapi import Depends
from gtd_shared.core.logging import get_logger
from src.features.user.model import User

logger = get_logger()

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("/me", response_model=UserReadDTO, summary="Get current user")
async def get_current_user(
    user: User = Depends(current_active_user),
):
    return user


@router.post("/create", response_model=UserReadDTO, summary="Create user")
async def create_user(
    user: UserCreate,
    user_id: Annotated[UUID, Depends(verify_user)],
    user_service: Annotated[UserService, Depends()],
):
    return await user_service.create(User(**user.model_dump(), id=user_id))
    
    
# patch

# delete??


