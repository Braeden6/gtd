import pytest
from fastapi.testclient import TestClient
from fastapi import status
import io
from unittest.mock import patch


@pytest.fixture
def mock_minio_client():
    """Mock the MinIO client to avoid actual file uploads during tests."""
    with patch("gtd_shared.core.storage.minio.MinioStorage.upload_file") as mock_upload:

        def custom_upload(*args, **kwargs):
            return f"mocked/file/{kwargs['content_type']}"

        mock_upload.side_effect = custom_upload
        yield mock_upload


@pytest.mark.integration
def test_create_inbox_item(authenticated_client: TestClient, mock_minio_client):
    content = "Test inbox item"
    audio_data = io.BytesIO(b"fake audio data")
    audio_data.name = "test.mp3"

    image_data = io.BytesIO(b"fake image data")
    image_data.name = "test.jpg"

    response = authenticated_client.post("/inbox/", data={"content": content}, files={"audio": (audio_data.name, audio_data, "audio/mpeg"), "image": (image_data.name, image_data, "image/jpeg")})
    assert mock_minio_client.call_count == 2
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["content"] == content
    assert data["audio_path"] == "mocked/file/audio/mpeg"
    assert data["image_path"] == "mocked/file/image/jpeg"
    assert data["processed"] is False


@pytest.mark.integration
def test_create_inbox_item_text_only(authenticated_client: TestClient, mock_minio_client):
    content = "Text only inbox item"
    response = authenticated_client.post("/inbox/", data={"content": content})
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert mock_minio_client.call_count == 0
    assert data["content"] == content
    assert data["audio_path"] is None
    assert data["image_path"] is None
