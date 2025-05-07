from abc import ABC, abstractmethod
from typing import Generic, List, Optional, Any
from uuid import UUID

from src.models.base import BaseModelType, CreateType, UpdateType

class RepositoryInterface(ABC, Generic[BaseModelType, CreateType, UpdateType]):
    """Generic repository interface for CRUD operations."""

    @abstractmethod
    async def create(self, create_data: CreateType) -> BaseModelType:
        """Create a new entity."""
        pass

    @abstractmethod
    async def get_by_id(self, id: UUID, user_id: UUID) -> Optional[BaseModelType]:
        """Get an entity by ID."""
        pass

    # tech debt: filters should be typed
    @abstractmethod
    async def get_all(self, user_id: UUID, **filters: Any) -> List[BaseModelType]:
        """Get all entities, optionally filtered."""
        pass

    @abstractmethod
    async def update(self, update_data: UpdateType) -> Optional[BaseModelType]:
        """Update an entity."""
        pass

    @abstractmethod
    async def delete(self, id: UUID, user_id: UUID) -> bool:
        """Delete an entity."""
        pass

    @abstractmethod
    async def exists(self, id: UUID, user_id: UUID) -> bool:
        """Check if an entity exists."""
        pass
