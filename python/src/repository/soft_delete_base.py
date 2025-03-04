from typing import Generic, Optional, Type, List, Dict, Any
from uuid import UUID
from datetime import datetime
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models.base import SoftDeleteModel, SoftDeleteModelType
from src.repository.base import BaseRepository
from sqlalchemy import and_, update

class SoftDeleteRepository(BaseRepository[SoftDeleteModelType], Generic[SoftDeleteModelType]):
    """Repository implementation for models with soft delete capability."""
    
    def __init__(self, db_session: AsyncSession, model_class: Type[SoftDeleteModelType]):
        """Initialize with database session and model class."""
        super().__init__(db_session, model_class)
        if not issubclass(model_class, SoftDeleteModel):
            raise TypeError(f"Model class {model_class.__name__} must inherit from SoftDeleteModel")
    
    async def delete(self, id: UUID) -> bool:
        """Soft delete an entity."""
        result = await self.update(id, {"deleted_at": datetime.utcnow()})
        return result is not None
    
    async def hard_delete(self, id: UUID) -> bool:
        """Permanently delete an entity."""
        return await super().delete(id)
    
    async def get_deleted(self) -> List[SoftDeleteModelType]:
        """Get all soft-deleted entities."""
        query = select(self.model_class).where(
            self.model_class.deleted_at.is_not(None)
        )
        result = await self.db_session.execute(query)
        return result.scalars().all()
    
    async def restore(self, id: UUID) -> Optional[SoftDeleteModelType]:
        """Restore a soft-deleted entity."""
        query = select(self.model_class).where(
            self.model_class.id == id,
            self.model_class.deleted_at.is_not(None)
        )
        result = await self.db_session.execute(query)
        entity = result.scalars().first()
        
        if entity:
            return await self.update(id, {"deleted_at": None})
        return None 
    
    async def get_all(self, **filters) -> List[SoftDeleteModelType]:
        """Get all entities, optionally filtered."""
        query = select(self.model_class)
            
        filter_conditions = []
        for attr, value in filters.items():
            if hasattr(self.model_class, attr):
                filter_conditions.append(getattr(self.model_class, attr) == value)
                
        if filter_conditions:
            query = query.where(and_(*filter_conditions))
            
        if hasattr(self.model_class, 'created_at'):
            query = query.order_by(self.model_class.created_at.desc())
            
        query = query.where(self.model_class.deleted_at.is_(None))
            
        result = await self.db_session.execute(query)
        return result.scalars().all()

    async def update(self, id: UUID, data: Dict[str, Any]) -> Optional[SoftDeleteModelType]:
        """Update an entity."""
        query_conditions = [self.model_class.id == id]
        query = update(self.model_class).where(
            and_(*query_conditions),
            self.model_class.deleted_at.is_(None)
        ).values(**data).returning(self.model_class)
        
        result = await self.db_session.execute(query)
        await self.db_session.flush()
        return result.scalars().first()

    async def get_by_id(self, id: UUID) -> Optional[SoftDeleteModelType]:
        """Get an entity by ID."""
        query = select(self.model_class).where(
            and_(
                self.model_class.id == id,
                self.model_class.deleted_at.is_(None)
            )
        )
        result = await self.db_session.execute(query)
        return result.scalars().first()
    
    async def get_deleted_by_id(self, id: UUID) -> Optional[SoftDeleteModelType]:
        """Get a deleted entity by ID."""
        query = select(self.model_class).where(self.model_class.id == id,)
        result = await self.db_session.execute(query)
        return result.scalars().first()
