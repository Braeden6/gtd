from typing import Generic, List, Optional, Dict, Any, Type
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, delete, exists, and_

from src.models.base import BaseModelType
from src.repository.interface import RepositoryInterface

class BaseRepository(RepositoryInterface[BaseModelType], Generic[BaseModelType]):
    """Base implementation of repository for CRUD operations."""
    
    def __init__(self, db_session: AsyncSession, model_class: Type[BaseModelType]):
        """Initialize with database session and model class."""
        self.db_session = db_session
        self.model_class = model_class
    
    async def create(self, **kwargs) -> BaseModelType:
        """Create a new entity."""
        entity = self.model_class(**kwargs)
        self.db_session.add(entity)
        await self.db_session.flush()
        await self.db_session.refresh(entity)
        return entity
    
    async def get_by_id(self, id: UUID) -> Optional[BaseModelType]:
        """Get an entity by ID."""
        query = select(self.model_class).where(self.model_class.id == id)
        result = await self.db_session.execute(query)
        return result.scalars().first()
    
    async def get_all(self, **filters) -> List[BaseModelType]:
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
            
        result = await self.db_session.execute(query)
        return result.scalars().all()
    
    async def update(self, id: UUID, data: Dict[str, Any]) -> Optional[BaseModelType]:
        """Update an entity."""
        query_conditions = [self.model_class.id == id]
        query = update(self.model_class).where(
            and_(*query_conditions)
        ).values(**data).returning(self.model_class)
        result = await self.db_session.execute(query)
        await self.db_session.flush()
        return result.scalars().first()
    
    async def delete(self, id: UUID) -> bool:
        """Delete an entity. Uses soft delete if available, otherwise hard delete."""
        query = delete(self.model_class).where(self.model_class.id == id)
        result = await self.db_session.execute(query)
        await self.db_session.flush()
        return result.rowcount > 0

    async def exists(self, id: UUID) -> bool:
        """Check if an entity exists."""
        query_conditions = [self.model_class.id == id]
        query = select(exists().where(and_(*query_conditions)))
        result = await self.db_session.execute(query)
        return result.scalar()