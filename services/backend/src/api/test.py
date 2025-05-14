
from fastapi import APIRouter, HTTPException
from typing import Optional, Type, override
from sqlmodel import SQLModel, Field, and_, select, delete
from uuid import UUID
from datetime import datetime
from gtd_shared.core.database import engine, get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import ColumnElement
from fastapi import Depends
from typing import Generic
from src.models.base.search import LikeSearch
from src.models.base import (
    BaseModel, 
    BaseModelType, 
    UpdateType, 
    SearchableType, 
    UpdateSoftDeleteType, 
    SoftDeleteModelType, 
    BaseSearchable, 
    BaseSoftDeleteModel, 
    BaseUpdateSoftDeleteModel
)
from src.models.user import * # noqa

# transcations?
# soft delete?
# index?

    
class Test(BaseModel, table=True):
    content: Optional[str] = Field(default=None)
    relationship: Optional[UUID] = Field(default=None)
    processed: Optional[bool] = Field(default=None)
    
class TestSoftDelete(BaseSoftDeleteModel, table=True):
    content: Optional[str] = Field(default=None)
    relationship: Optional[UUID] = Field(default=None)
    processed: Optional[bool] = Field(default=None)
    

class UpdateTest(SQLModel, table=False):
    content: Optional[str] = Field(default=None)
    relationship: Optional[UUID] = Field(default=None)
    processed: Optional[bool] = Field(default=None)
    
class UpdateTestSoftDelete(BaseUpdateSoftDeleteModel):
    content: Optional[str] = Field(default=None)
    relationship: Optional[UUID] = Field(default=None)
    processed: Optional[bool] = Field(default=None)
    
class SearchTest(BaseSearchable, SQLModel, table=False):
    content: Optional[LikeSearch] = Field(default=None)
    
class SearchTestSoftDelete(BaseSearchable, SQLModel, table=False):
    content: Optional[LikeSearch] = Field(default=None)
    
    
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    
router = APIRouter(prefix="/test", tags=["test"])
router_soft_delete = APIRouter(prefix="/test/soft_delete", tags=["test_soft_delete"])


class BaseRepository(Generic[BaseModelType, UpdateType, SearchableType]):
    def __init__(self, db_session: AsyncSession, model_class: Type[BaseModelType], search_class: Type[SearchableType]):
        self.db_session = db_session
        self.model_class = model_class
        self.search_class = search_class
        self.search_fields = search_class.__annotations__
        
    def _get_by_id_where(self, id: UUID, user_id: UUID) -> ColumnElement:
        return and_(
            self.model_class.id == id,
            self.model_class.user_id == user_id
        )
    
    def _get_all_where(self, user_id: UUID) -> ColumnElement:
        return and_(
            self.model_class.user_id == user_id
        )
        
    async def create(self, create_data: BaseModelType) -> BaseModelType:
        self.db_session.add(create_data)
        await self.db_session.commit()
        await self.db_session.refresh(create_data)
        return create_data
    
    async def get_by_id(self, id: UUID, user_id: UUID) -> BaseModelType:
        query = select(self.model_class).where(
            self._get_by_id_where(id, user_id)
        )
        result = (await self.db_session.execute(query)).scalars().first()
        if result is None:
            raise HTTPException(status_code=404, detail=f"{self.model_class.__name__} not found")
        return result
    
    async def get_all(self, user_id: UUID) -> list[BaseModelType]:
        query = select(self.model_class).where(
            self._get_all_where(user_id)
        )
        result = await self.db_session.execute(query)
        return list(result.scalars().all())
    
    async def delete(self, id: UUID, user_id: UUID) -> None:
        query = delete(self.model_class).where(
            self._get_by_id_where(id, user_id)
        )
        result = await self.db_session.execute(query)
        await self.db_session.commit()
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail=f"{self.model_class.__name__} not found")
        return
    
    async def update(self, id: UUID, user_id: UUID, update_data: UpdateType) -> BaseModelType:
        item = await self.get_by_id(id, user_id)
        update_dict = update_data.model_dump(exclude_unset=True)
        for key, value in update_dict.items():
            setattr(item, key, value)
    
        if hasattr(item, "updated_at"):
            item.updated_at = datetime.now()
        
        self.db_session.add(item)
        await self.db_session.commit()
        await self.db_session.refresh(item)
        return item
    
    async def search(self, user_id: UUID, search_values: SearchableType) -> list[BaseModelType]:
        query = select(self.model_class).where(
            self._get_all_where(user_id)
        )

        search_values_dict = search_values.model_dump(exclude_unset=True, exclude={"offset", "limit", "page"}) 
        for field, _ in search_values_dict.items():
            test = getattr(search_values, field)
            query = test.apply(self.model_class, query, field)
    
        if search_values.page:
            # can't use page without limit
            if search_values.limit is None:
                raise HTTPException(status_code=400, detail="limit is required if page is provided")
            search_values.offset += search_values.limit * search_values.page
            
        query = query.offset(search_values.offset)
        if search_values.limit is not None:
            query = query.limit(search_values.limit)
        
        result = await self.db_session.execute(query)
        return list(result.scalars().all())
    
class BaseSoftDeleteRepository(BaseRepository[SoftDeleteModelType, UpdateSoftDeleteType, SearchableType]):
    def __init__(
            self, 
            db_session: AsyncSession, 
            model_class: Type[SoftDeleteModelType], 
            search_class: Type[SearchableType], 
            update_class: Type[UpdateSoftDeleteType]
        ):
        super().__init__(db_session, model_class, search_class)
        self.update_class = update_class        
    
    @override
    def _get_by_id_where(self, id: UUID, user_id: UUID) -> ColumnElement:
        return and_(
            self.model_class.id == id,
            self.model_class.user_id == user_id,
            self.model_class.deleted_at == None # noqa
        )
        
    @override
    def _get_all_where(self, user_id: UUID) -> ColumnElement:
        return and_(
            self.model_class.user_id == user_id,
            self.model_class.deleted_at == None # noqa
        )
        
    async def hard_delete(self, id: UUID, user_id: UUID) -> None:
        await super().delete(id, user_id)
        
    @override
    async def delete(self, id: UUID, user_id: UUID) -> None:
        update_data = self.update_class(deleted_at=datetime.now())
        await super().update(id, user_id, update_data)
        
    async def restore(self, id: UUID, user_id: UUID) -> None:
        update_data = self.update_class(deleted_at=None)
        await super().update(id, user_id, update_data)
    

class TestRepository(BaseRepository[Test, UpdateTest, SearchTest]):
    def __init__(self, db_session: AsyncSession):
        super().__init__(db_session, Test, SearchTest)
        

class TestSoftDeleteRepository(BaseSoftDeleteRepository[TestSoftDelete, BaseUpdateSoftDeleteModel, SearchTestSoftDelete]):
    def __init__(self, db_session: AsyncSession):
        super().__init__(db_session, TestSoftDelete, SearchTestSoftDelete, BaseUpdateSoftDeleteModel)


my_user_id = UUID("85fa277a-b261-4ad8-a6cd-24633061ec7c")

@router.post("/")
async def test(
        db_session: AsyncSession = Depends(get_async_session)
    ):
    test_repository = TestRepository(db_session)
    return await test_repository.create(Test(content="Hello, World!", user_id=my_user_id))

@router.get("/{id}")
async def test_by_id(
        id: UUID,
        db_session: AsyncSession = Depends(get_async_session)
    ):
    test_repository = TestRepository(db_session)
    return await test_repository.get_by_id(id, my_user_id)

@router.get("/")
async def test_all(
        db_session: AsyncSession = Depends(get_async_session)
    ):
    test_repository = TestRepository(db_session)
    return await test_repository.get_all(my_user_id)


@router.delete("/{id}")
async def test_delete(
        id: UUID,
        db_session: AsyncSession = Depends(get_async_session)
    ):
    test_repository = TestRepository(db_session)
    await test_repository.delete(id, my_user_id)
    
@router.put("/{id}")
async def test_update(
        id: UUID,
        update_data: UpdateTest,
        db_session: AsyncSession = Depends(get_async_session)
    ):
    test_repository = TestRepository(db_session)
    return await test_repository.update(id, my_user_id, update_data)

@router.post("/search")
async def test_search(
        query: SearchTest,
        db_session: AsyncSession = Depends(get_async_session)
    ):
    test_repository = TestRepository(db_session)
    return await test_repository.search(my_user_id, query)



@router_soft_delete.post("/")
async def test_soft_delete_create(
        db_session: AsyncSession = Depends(get_async_session)
    ):
    # await create_tables()
    test_repository = TestSoftDeleteRepository(db_session)
    return await test_repository.create(TestSoftDelete(content="Hello, World!", user_id=my_user_id))


@router_soft_delete.get("/{id}")
async def test_soft_delete_by_id(
        id: UUID,
        db_session: AsyncSession = Depends(get_async_session)
    ):
    test_repository = TestSoftDeleteRepository(db_session)
    return await test_repository.get_by_id(id, my_user_id)

@router_soft_delete.get("/")
async def test_soft_delete_all(
        db_session: AsyncSession = Depends(get_async_session)
    ):
    test_repository = TestSoftDeleteRepository(db_session)
    return await test_repository.get_all(my_user_id)


