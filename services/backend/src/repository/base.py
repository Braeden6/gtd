from typing import List, Optional, Any, Type
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, delete, exists, and_

from src.models.base import BaseModelType, CreateType, UpdateType
from src.repository.interface import RepositoryInterface


class BaseRepository(RepositoryInterface[BaseModelType, CreateType, UpdateType]):
    """Base implementation of repository for CRUD operations."""

    def __init__(self, db_session: AsyncSession, model_class: Type[BaseModelType]):
        """Initialize with database session and model class."""
        self.db_session = db_session
        self.model_class = model_class

    async def create(self, create_data: CreateType) -> BaseModelType:
        """Create a new entity."""
        print(create_data.model_dump())
        entity = self.model_class(**create_data.model_dump())
        print(entity)
        self.db_session.add(entity)
        await self.db_session.flush()
        await self.db_session.refresh(entity)
        return entity

    async def get_by_id(self, id: UUID, user_id: UUID) -> Optional[BaseModelType]:
        """Get an entity by ID."""
        query = select(self.model_class).where(
            self.model_class.id == id, 
            self.model_class.user_id == user_id
        )
        result = await self.db_session.execute(query)
        return result.scalars().first()

    async def get_all(self, user_id: UUID, **filters: Any) -> List[BaseModelType]:
        """Get all entities, optionally filtered."""
        query = select(self.model_class)

        filter_conditions = [self.model_class.user_id == user_id]
        for attr, value in filters.items():
            if hasattr(self.model_class, attr):
                filter_conditions.append(getattr(self.model_class, attr) == value)
        
        if filter_conditions:
            query = query.where(and_(*filter_conditions))

        if hasattr(self.model_class, "created_at"):
            query = query.order_by(self.model_class.created_at.desc())

        result = await self.db_session.execute(query)
        return list(result.scalars().all())

    async def update(self, update_data: UpdateType) -> Optional[BaseModelType]:
        """Update an entity."""
        query_conditions = [self.model_class.id == update_data.id, self.model_class.user_id == update_data.user_id]
        query = update(self.model_class).where(and_(*query_conditions)).values(**update_data.model_dump()).returning(self.model_class)
        result = await self.db_session.execute(query)
        await self.db_session.flush()
        return result.scalars().first()

    async def delete(self, id: UUID, user_id: UUID) -> bool:
        """Delete an entity. Uses soft delete if available, otherwise hard delete."""
        query = delete(self.model_class).where(self.model_class.id == id, self.model_class.user_id == user_id)
        result = await self.db_session.execute(query)
        await self.db_session.flush()
        return result.rowcount > 0

    async def exists(self, id: UUID, user_id: UUID) -> bool:
        """Check if an entity exists."""
        query_conditions = [self.model_class.id == id, self.model_class.user_id == user_id]
        query = select(exists().where(and_(*query_conditions)))
        result = await self.db_session.execute(query)
        return bool(result.scalar())
