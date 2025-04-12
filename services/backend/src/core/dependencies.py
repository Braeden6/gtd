from typing import Annotated
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_users import FastAPIUsers
from uuid import UUID

from gtd_shared.core.storage.inteface import StorageInterface
from gtd_shared.core.storage.minio import MinioStorage
from src.repository.inbox import InboxRepository
from src.repository.audio import AudioRepository
from src.service.file import FileService
from gtd_shared.core.database import get_async_session
from src.auth.backend import auth_backend
from src.auth.manager import get_user_manager
from src.models.user import User


async def get_storage() -> StorageInterface:
    """Get storage service instance."""
    return MinioStorage()


async def get_inbox_repository(db: Annotated[AsyncSession, Depends(get_async_session)]) -> InboxRepository:
    """Get inbox repository instance."""
    return InboxRepository(db)


async def get_file_service(storage: Annotated[StorageInterface, Depends(get_storage)], inbox_repo: Annotated[InboxRepository, Depends(get_inbox_repository)]) -> FileService:
    """Get file service instance."""
    return FileService(storage, inbox_repo)


async def get_audio_repository(db: Annotated[AsyncSession, Depends(get_async_session)]) -> AudioRepository:
    """Get audio repository instance."""
    return AudioRepository(db)


fastapi_users = FastAPIUsers[User, UUID](
    get_user_manager,
    [auth_backend],
)

current_active_user = fastapi_users.current_user(active=True)
