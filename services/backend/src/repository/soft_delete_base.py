from typing import Optional, Type, List
from uuid import UUID
from datetime import datetime
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from src.models.base import SoftDeleteModelType, SoftDeleteCreateType, SoftDeleteUpdateType, BaseUpdateModel
from src.repository.base import BaseRepository
from sqlalchemy import and_, update

class DeleteByUpdateType(BaseUpdateModel):
    deleted_at: datetime

class SoftDeleteRepository(BaseRepository[SoftDeleteModelType, SoftDeleteCreateType, SoftDeleteUpdateType]):
    """Repository implementation for models with soft delete capability."""

    def __init__(self, db_session: AsyncSession, model_class: Type[SoftDeleteModelType]):
        """Initialize with database session and model class."""
        super().__init__(db_session, model_class)
        
    async def delete(self, id: UUID, user_id: UUID) -> bool:
        """Soft delete an entity."""
        result = await self.update(DeleteByUpdateType(id=id, user_id=user_id, deleted_at=datetime.utcnow())) # type: ignore
        return result is not None

    async def hard_delete(self, id: UUID, user_id: UUID) -> bool:
        """Permanently delete an entity."""
        return await super().delete(id, user_id)

    async def get_deleted(self) -> List[SoftDeleteModelType]:
        """Get all soft-deleted entities."""
        query = select(self.model_class).where(self.model_class.deleted_at.is_not(None))
        result = await self.db_session.execute(query)
        return list(result.scalars().all())

    async def restore(self, id: UUID) -> Optional[SoftDeleteModelType]:
        """Restore a soft-deleted entity."""
        query = select(self.model_class).where(self.model_class.id == id, self.model_class.deleted_at.is_not(None))
        result = await self.db_session.execute(query)
        entity = result.scalars().first()

        if entity:
            return await self.update(DeleteByUpdateType(id=id, user_id=entity.user_id, deleted_at=None)) # type: ignore
        return None

    async def get_all(self, user_id: UUID, **filters) -> List[SoftDeleteModelType]:
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

        query = query.where(self.model_class.deleted_at.is_(None))

        result = await self.db_session.execute(query)
        return list(result.scalars().all())

    async def update(self, update_data: SoftDeleteUpdateType) -> Optional[SoftDeleteModelType]:
        """Update an entity."""
        query_conditions = [self.model_class.id == update_data.id, self.model_class.user_id == update_data.user_id]
        query = update(self.model_class).where(and_(*query_conditions), self.model_class.deleted_at.is_(None)).values(**update_data.model_dump()).returning(self.model_class)
        result = await self.db_session.execute(query)
        await self.db_session.flush()
        return result.scalars().first()

    async def get_by_id(self, id: UUID, user_id: UUID) -> Optional[SoftDeleteModelType]:
        """Get an entity by ID."""
        query = select(self.model_class).where(and_(self.model_class.id == id, self.model_class.user_id == user_id, self.model_class.deleted_at.is_(None)))
        result = await self.db_session.execute(query)
        return result.scalars().first()

    async def get_deleted_by_id(self, id: UUID, user_id: UUID) -> Optional[SoftDeleteModelType]:
        """Get all items, including deleted entities by ID."""
        query = select(self.model_class).where(
            self.model_class.id == id,
            self.model_class.user_id == user_id
        )
        result = await self.db_session.execute(query)
        return result.scalars().first()
