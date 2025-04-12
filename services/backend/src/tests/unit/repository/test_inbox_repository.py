import pytest
from uuid import uuid4
from sqlalchemy.ext.asyncio import AsyncSession

from src.repository.inbox import InboxRepository


@pytest.fixture
async def inbox_repo(db_session: AsyncSession):
    return InboxRepository(db_session)


@pytest.mark.unit
async def test_create_inbox_item(inbox_repo: InboxRepository):
    user_id = uuid4()
    content = "Test inbox item"
    audio_path = "audio/path/file.mp3"
    image_path = "image/path/file.jpg"
    item = await inbox_repo.create(user_id=user_id, content=content, audio_path=audio_path, image_path=image_path)

    assert item.user_id == user_id
    assert item.content == content
    assert item.audio_path == audio_path
    assert item.image_path == image_path
    assert item.processed is False

    await inbox_repo.db_session.commit()

    db_item = await inbox_repo.get_by_id(item.id)
    assert db_item is not None
    assert db_item.id == item.id
    assert db_item.user_id == user_id
    assert db_item.content == content
    assert db_item.audio_path == audio_path
    assert db_item.image_path == image_path
    assert db_item.processed is False


@pytest.mark.unit
async def test_get_unprocessed_items(inbox_repo: InboxRepository):
    user_id = uuid4()
    for i in range(3):
        await inbox_repo.create(user_id=user_id, content=f"Processed item {i}", processed=True)

    for i in range(5):
        await inbox_repo.create(user_id=user_id, content=f"Unprocessed item {i}", processed=False)

    await inbox_repo.db_session.commit()
    unprocessed = await inbox_repo.get_by_user_id(user_id, processed=False)
    assert len(unprocessed) == 5
    for item in unprocessed:
        assert item.user_id == user_id
        assert item.processed is False
        assert "Unprocessed item" in item.content
