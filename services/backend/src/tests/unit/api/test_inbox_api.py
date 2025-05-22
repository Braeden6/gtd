import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from io import BytesIO
from uuid import uuid4

from src.api.inbox import router
from src.models.inbox import InboxItem
from src.features.user.model import User


@pytest.fixture
def mock_file_service():
    service = AsyncMock()
    service.upload_inbox_audio.return_value = "audio/path/file.mp3"
    service.upload_inbox_image.return_value = "image/path/file.jpg"
    return service


@pytest.fixture
def mock_inbox_repo():
    repo = AsyncMock()
    repo.create.return_value = InboxItem(id=uuid4(), user_id=uuid4(), content="Test content", audio_path="audio/path/file.mp3", image_path="image/path/file.jpg", processed=False)
    repo.db_session = AsyncMock()
    return repo


@pytest.mark.unit
async def test_create_inbox_item(mock_file_service, mock_inbox_repo):
    user = User(id=uuid4(), email="test@example.com")

    content = "Test content"
    audio = MagicMock()
    audio.filename = "test.mp3"
    audio.read = AsyncMock(return_value=b"fake audio data")

    image = MagicMock()
    image.filename = "test.jpg"
    image.read = AsyncMock(return_value=b"fake image data")

    with (
        patch("src.api.inbox.get_file_service", return_value=mock_file_service),
        patch("src.api.inbox.get_inbox_repository", return_value=mock_inbox_repo),
        patch("src.api.inbox.current_active_user", return_value=user),
    ):
        result = await router.routes[0].endpoint(content=content, file_service=mock_file_service, inbox_repo=mock_inbox_repo, audio=audio, image=image, current_user=user)

    mock_file_service.upload_inbox_audio.assert_called_once()
    audio_call_args = mock_file_service.upload_inbox_audio.call_args
    assert audio_call_args[1]["user_id"] == user.id
    assert isinstance(audio_call_args[1]["audio_data"], BytesIO)
    assert audio_call_args[1]["filename"] == "test.mp3"

    image_call_args = mock_file_service.upload_inbox_image.call_args
    assert image_call_args[1]["user_id"] == user.id
    assert isinstance(image_call_args[1]["image_data"], BytesIO)
    assert image_call_args[1]["filename"] == "test.jpg"

    mock_inbox_repo.create.assert_called_once_with(user_id=user.id, content=content, audio_path="audio/path/file.mp3", image_path="image/path/file.jpg")

    mock_inbox_repo.db_session.commit.assert_called_once()
    assert result.content == "Test content"
    assert result.audio_path == "audio/path/file.mp3"
    assert result.image_path == "image/path/file.jpg"
