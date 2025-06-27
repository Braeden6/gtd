from typing import Annotated
from fastapi import Depends, APIRouter, HTTPException
from uuid import UUID
from enum import Enum
from gtd_shared.core.storage.inteface import StorageInterface
from gtd_shared.core.storage.minio import MinioStorage
from src.features.user.service import UserService
from src.service.file import FileService
from src.features.user.model import User
from supertokens_python.recipe.session import SessionContainer
from supertokens_python.recipe.session.framework.fastapi import verify_session

async def get_storage() -> StorageInterface:
    return MinioStorage()

async def get_file_service(storage: Annotated[StorageInterface, Depends(get_storage)]) -> FileService:
    return FileService(storage)


async def verify_user(
    session: SessionContainer = Depends(verify_session())
) -> UUID:
    return UUID(session.get_user_id())

async def current_active_user(
      user_service: Annotated[UserService, Depends()],
      user_id: UUID = Depends(verify_user)
    ) -> User:
    try:
        user = await user_service.get_by_id(user_id)
        if user is None:
            raise HTTPException(status_code=401, detail="Unauthorized")
        return user
    except Exception:
        raise HTTPException(status_code=404, detail="User not found")

def get_protected_router(prefix: str, tags: list[str | Enum]):
    return APIRouter(
        prefix=prefix,
        tags=tags,
        dependencies=[Depends(current_active_user)]
    )
