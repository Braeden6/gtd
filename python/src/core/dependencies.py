from typing import Annotated
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_users import FastAPIUsers
from uuid import UUID

from src.core.storage.inteface import StorageInterface
from src.core.storage.minio import MinioStorage
from src.repository.inbox import InboxRepository
from src.service.file import FileService
from src.core.database import get_async_session
from src.auth.backend import auth_backend
from src.auth.manager import get_user_manager
from src.models.user import User

async def get_storage() -> StorageInterface:
    """Get storage service instance."""
    return MinioStorage()


async def get_inbox_repository(db: Annotated[AsyncSession, Depends(get_async_session)]) -> InboxRepository:
    """Get inbox repository instance."""
    return InboxRepository(db)


async def get_file_service(
    storage: Annotated[StorageInterface, Depends(get_storage)],
    inbox_repo: Annotated[InboxRepository, Depends(get_inbox_repository)]
) -> FileService:
    """Get file service instance."""
    return FileService(storage, inbox_repo)


fastapi_users = FastAPIUsers[User, UUID](
    get_user_manager,
    [auth_backend],
)

current_active_user = fastapi_users.current_user(active=True)