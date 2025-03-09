from abc import ABC, abstractmethod
from typing import Generic, List, Optional, Dict, Any
from uuid import UUID

from src.models.base import BaseModelType


class RepositoryInterface(ABC, Generic[BaseModelType]):
    """Generic repository interface for CRUD operations."""

    # tech debt: kwargs should be typed
    @abstractmethod
    async def create(self, **kwargs: Any) -> BaseModelType:
        """Create a new entity."""
        pass

    @abstractmethod
    async def get_by_id(self, id: UUID) -> Optional[BaseModelType]:
        """Get an entity by ID."""
        pass

    # tech debt: filters should be typed
    @abstractmethod
    async def get_all(self, **filters: Any) -> List[BaseModelType]:
        """Get all entities, optionally filtered."""
        pass

    @abstractmethod
    async def update(self, id: UUID, data: Dict[str, Any]) -> Optional[BaseModelType]:
        """Update an entity."""
        pass

    @abstractmethod
    async def delete(self, id: UUID) -> bool:
        """Delete an entity."""
        pass

    @abstractmethod
    async def exists(self, id: UUID) -> bool:
        """Check if an entity exists."""
        pass
