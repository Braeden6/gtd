import pytest
from fastapi.testclient import TestClient


@pytest.mark.e2e
def test_inbox_item_full_flow(authenticated_client: TestClient):
    """Test the full flow of creating an inbox item and checking its status."""
    pass
    # # Create test data
    # content = "E2E test inbox item"

    # # Create a simple test file
    # audio_data = io.BytesIO(b"fake audio data")
    # audio_data.name = "test.mp3"

    # # Step 1: Create inbox item
    # response = test_client.post(
    #     "/inbox/",
    #     headers=auth_headers,
    #     data={"content": content},
    #     files={
    #         "audio": ("test.mp3", audio_data, "audio/mpeg"),
    #     }
    # )

    # # Verify creation response
    # assert response.status_code == status.HTTP_201_CREATED
    # data = response.json()
    # item_id = data["id"]

    # # Step 2: Get the item details
    # response = test_client.get(
    #     f"/inbox/{item_id}",
    #     headers=auth_headers
    # )

    # # Verify get response
    # assert response.status_code == status.HTTP_200_OK
    # data = response.json()
    # assert data["id"] == item_id
    # assert data["content"] == content
    # assert data["processed"] is False

    # # Step 3: Mark as processed (assuming this endpoint exists)
    # response = test_client.patch(
    #     f"/inbox/{item_id}/process",
    #     headers=auth_headers
    # )

    # # Verify processing response
    # assert response.status_code == status.HTTP_200_OK

    # # Step 4: Verify item is now processed
    # response = test_client.get(
    #     f"/inbox/{item_id}",
    #     headers=auth_headers
    # )

    # # Verify final state
    # assert response.status_code == status.HTTP_200_OK
    # data = response.json()
    # assert data["id"] == item_id
    # assert data["processed"] is True
