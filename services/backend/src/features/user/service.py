from typing import Annotated
from uuid import UUID
from fastapi import Depends
from src.features.user.repository import UserRepository
from src.features.user.schemas import SearchUser, UserUpdate
from src.features.user.model import User

class UserService():
    def __init__(self, repository: Annotated[UserRepository, Depends()]):
        self.repository = repository
        
    async def get_all(self) -> list[User]:
        return await self.repository.get_all()
    
    async def get_by_id(self, id: UUID) -> User:
        return await self.repository.get_by_id(id)

    async def create(self, user: User) -> User:
        return await self.repository.create(user)
    
    async def update(self, id: UUID, update_data: UserUpdate) -> User:
        return await self.repository.update(id, update_data)
    
    async def delete(self, id: UUID) -> None:
        return await self.repository.delete(id)
    
    async def search(self, search_criteria: SearchUser) -> list[User]:
        return await self.repository.search(search_criteria)

    async def hard_delete(self, id: UUID) -> None:
        return await self.repository.hard_delete(id)
    
    async def restore(self, id: UUID) -> None:
        return await self.repository.restore(id)