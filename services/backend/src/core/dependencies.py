from typing import Annotated
from fastapi import Depends, APIRouter
from fastapi_users import FastAPIUsers
from uuid import UUID
from enum import Enum
from gtd_shared.core.storage.inteface import StorageInterface
from gtd_shared.core.storage.minio import MinioStorage
from src.service.file import FileService
from src.auth.backend import auth_backend
from src.auth.manager import get_user_manager
from src.features.user.model import User

async def get_storage() -> StorageInterface:
    return MinioStorage()

async def get_file_service(storage: Annotated[StorageInterface, Depends(get_storage)]) -> FileService:
    return FileService(storage)

fastapi_users = FastAPIUsers[User, UUID](
    get_user_manager,
    [auth_backend],
)

current_active_user = fastapi_users.current_user(active=True)


def get_protected_router(prefix: str, tags: list[str | Enum]):
    return APIRouter(
        prefix=prefix,
        tags=tags,
        dependencies=[Depends(current_active_user)]
    )
