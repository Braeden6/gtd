from datetime import datetime
from uuid import UUID
from sqlalchemy import delete, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import and_, select
from fastapi import Depends, HTTPException
from typing import Annotated
from gtd_shared.core.database import get_async_session
from src.features.user.model import User
from src.features.user.schemas import SearchUser, UserUpdate


class UserRepository():
    def __init__(self, db_session: Annotated[AsyncSession, Depends(get_async_session)]):
        self.db_session = db_session
        
    async def create(self, create_data: User) -> User:
        self.db_session.add(create_data)
        await self.db_session.commit()
        await self.db_session.refresh(create_data)
        return create_data
    
    async def get_by_id(self, id: UUID) -> User:
        query = select(User).where(
            and_(
                User.id == id,
                User.deleted_at == None # noqa
            )
        )
        result = (await self.db_session.execute(query)).scalars().first()
        if result is None:
            raise HTTPException(status_code=404, detail=f"User not found")
        return result
    
    async def get_all(self) -> list[User]:
        query = select(User).where(
            User.deleted_at == None # noqa
        )
        result = await self.db_session.execute(query)
        return list(result.scalars().all())
    
    async def delete(self, id: UUID) -> None:
        await self.update(id, UserUpdate(deleted_at=datetime.now()))
    
    async def update(self, id: UUID, update_data: UserUpdate) -> User:
        item = await self.get_by_id(id)
        update_dict = update_data.model_dump(exclude_unset=True)
        for key, value in update_dict.items():
            setattr(item, key, value)
    
        if hasattr(item, "updated_at"):
            item.updated_at = datetime.now()
        
        self.db_session.add(item)
        await self.db_session.commit()
        await self.db_session.refresh(item)
        return item
    
    async def search(self, search_values: SearchUser) -> list[User]:
        query = select(User).where(
            User.deleted_at == None # noqa
        )

        search_values_dict = search_values.model_dump(exclude_unset=True, exclude={"offset", "limit", "page"}) 
        for field, _ in search_values_dict.items():
            test = getattr(search_values, field)
            query = test.apply(User, query, field)
    
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
    
    async def hard_delete(self, id: UUID) -> None:
        await self.db_session.execute(delete(User).where(
            User.id == id # type: ignore
            ))
        await self.db_session.commit()
        
    async def restore(self, id: UUID) -> None:
        await self.db_session.execute(update(User).where(
            User.id == id # type: ignore
            ).values(deleted_at=None))
        await self.db_session.commit()
