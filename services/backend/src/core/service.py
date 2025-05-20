from typing import Generic
from uuid import UUID
from src.models.base import BaseModelType, UpdateType, SearchableType, SoftDeleteModelType, UpdateSoftDeleteType
from src.core.repository import BaseRepository, BaseSoftDeleteRepository

class BaseService(Generic[BaseModelType, UpdateType, SearchableType]):
    def __init__(self, repository: BaseRepository):
        self.repository = repository
        
    async def get_all(self, user_id: UUID) -> list[BaseModelType]:
        return await self.repository.get_all(user_id)
    
    async def get_by_id(self, id: UUID, user_id: UUID) -> BaseModelType:
        return await self.repository.get_by_id(id, user_id)
    
    async def create(self, item: BaseModelType) -> BaseModelType:
        return await self.repository.create(item)
    
    async def update(self, id: UUID, user_id: UUID, update_data: UpdateType) -> BaseModelType:
        return await self.repository.update(id, user_id, update_data)
    
    async def delete(self, id: UUID, user_id: UUID) -> None:
        return await self.repository.delete(id, user_id)
    
    async def search(self, user_id: UUID, search_criteria: SearchableType) -> list[BaseModelType]:
        return await self.repository.search(user_id, search_criteria)


class BaseSoftDeleteService(BaseService[SoftDeleteModelType, UpdateSoftDeleteType, SearchableType]):
    def __init__(self, repository: BaseSoftDeleteRepository):
        super().__init__(repository)
        self.soft_delete_repository = repository
    
    async def hard_delete(self, id: UUID, user_id: UUID) -> None:
        return await self.soft_delete_repository.hard_delete(id, user_id)
    
    async def restore(self, id: UUID, user_id: UUID) -> None:
        return await self.soft_delete_repository.restore(id, user_id)