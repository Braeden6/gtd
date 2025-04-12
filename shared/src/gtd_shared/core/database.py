from typing import AsyncGenerator
from contextlib import asynccontextmanager
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from gtd_shared.core.settings import settings  # type: ignore

DATABASE_URL = settings.DATABASE_URL

engine = create_async_engine(DATABASE_URL or "")
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)  # type: ignore


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:  # type: ignore
        yield session
        
@asynccontextmanager
async def get_async_session_context() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:  # type: ignore
        yield session
