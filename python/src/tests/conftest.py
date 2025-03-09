import pytest
from typing import AsyncGenerator, Generator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from unittest.mock import patch
from uuid import uuid4

from src.models.base import SQLAlchemyBase
from src.main import app
from src.models.user import User

TEST_DATABASE_URL = "sqlite+aiosqlite:///./test.db"


test_engine = create_async_engine(TEST_DATABASE_URL)
test_async_session_maker = sessionmaker(test_engine, class_=AsyncSession, expire_on_commit=False)  # type: ignore


@pytest.fixture
def authenticated_client(test_client: TestClient, test_user: User) -> Generator[TestClient, None, None]:
    """Create a test client with authentication cookie set."""
    session_token = f"mock_session_token_{test_user.id}"  # type: ignore
    test_client.cookies.set("gtd_auth", session_token)
    with patch("src.auth.backend.RedisStrategy.read_token", return_value=test_user):  # type: ignore
        yield test_client


@pytest.fixture(scope="session")
async def setup_database():
    async with test_engine.begin() as conn:
        await conn.run_sync(SQLAlchemyBase.metadata.drop_all)
        await conn.run_sync(SQLAlchemyBase.metadata.create_all)

    yield

    async with test_engine.begin() as conn:
        await conn.run_sync(SQLAlchemyBase.metadata.drop_all)


@pytest.fixture
async def db_session(setup_database) -> AsyncGenerator[AsyncSession, None]:
    async with test_async_session_maker() as session:  # type: ignore
        yield session


@pytest.fixture
def test_client() -> Generator[TestClient, None, None]:
    with TestClient(app) as client:
        yield client


@pytest.fixture
async def test_user(db_session: AsyncSession) -> User:
    """Create a test user for authentication tests."""
    user = User(id=uuid4(), email=f"test_{uuid4()}@example.com", hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW", is_active=True, is_verified=True, is_superuser=False)
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user
