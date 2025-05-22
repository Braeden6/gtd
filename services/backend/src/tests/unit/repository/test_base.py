import pytest
from unittest.mock import AsyncMock
from sqlalchemy.ext.asyncio import AsyncSession


@pytest.fixture
def mock_db_session():
    session = AsyncMock()
    session.execute.return_value.scalar.return_value = True
    return session




@pytest.mark.unit
async def test_create(mock_db_session: AsyncSession):
    pass
    # repo = MockBaseRepository(mock_db_session, BaseModelType)
    # test_data = {"name": "test", "value": 123}
    # result = await repo.create(**test_data)

    # repo.db_session.add.assert_called_once()
    # repo.db_session.flush.assert_awaited_once()
    # repo.db_session.refresh.assert_awaited_once()
    # assert isinstance(result, repo.model_class)


# @pytest.mark.unit
# async def test_get_by_id(base_repo: BaseRepository[BaseModelType]):
#     test_id = uuid4()
#     result = await base_repo.get_by_id(test_id)

#     base_repo.db_session.execute.assert_awaited_once()
#     select.assert_called_once()
#     assert isinstance(result, base_repo.model_class)

# @pytest.mark.unit
# async def test_get_all(base_repo: BaseRepository[BaseModelType]):
#     result = await base_repo.get_all()

#     base_repo.db_session.execute.assert_awaited_once()
#     assert isinstance(result, list)
#     assert isinstance(result[0], base_repo.model_class)

# @pytest.mark.unit
# async def test_get_all_with_filters(base_repo: BaseRepository[BaseModelType]):
#     filters = {"name": "test"}
#     await base_repo.get_all(**filters)

#     base_repo.db_session.execute.assert_awaited_once()

# @pytest.mark.unit
# async def test_update(base_repo: BaseRepository[BaseModelType]):
#     test_id = uuid4()
#     update_data = {"name": "updated"}
#     result = await base_repo.update(test_id, update_data)

#     base_repo.db_session.execute.assert_awaited_once()
#     base_repo.db_session.flush.assert_awaited_once()
#     assert isinstance(result, base_repo.model_class)

# @pytest.mark.unit
# async def test_delete(base_repo: BaseRepository[BaseModelType]):
#     test_id = uuid4()
#     result = await base_repo.delete(test_id)

#     base_repo.db_session.execute.assert_awaited_once()
#     base_repo.db_session.flush.assert_awaited_once()
#     assert isinstance(result, bool)

# @pytest.mark.unit
# async def test_exists(base_repo: BaseRepository[BaseModelType]):
# test_id = uuid4()
# result = await base_repo.exists(test_id)

# base_repo.db_session.execute.return_value.scalar.assert_called_once()
# assert isinstance(result, bool)
