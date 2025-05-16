from fastapi import HTTPException
from typing import Type, override
from sqlmodel import and_, select, delete
from uuid import UUID
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import ColumnElement
from typing import Generic
from src.models.base import BaseModelType, UpdateType, SearchableType, UpdateSoftDeleteType, SoftDeleteModelType

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
    