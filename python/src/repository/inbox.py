from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from src.repository.soft_delete_base import SoftDeleteRepository
from src.models.inbox import InboxItem

class InboxRepository(SoftDeleteRepository[InboxItem]):
    """Repository for CRUD operations on InboxItem."""
    
    def __init__(self, db_session: AsyncSession):
        """Initialize with database session."""
        super().__init__(db_session, InboxItem)
    
    async def get_by_user_id(self, user_id: UUID, 
                          processed: Optional[bool] = None) -> List[InboxItem]:
        """Get all inbox items for a user."""
        query = select(InboxItem).where(
            InboxItem.user_id == user_id,
            InboxItem.deleted_at.is_(None)
        )
        
        if processed is not None:
            query = query.where(InboxItem.processed == processed)
            
        query = query.order_by(InboxItem.created_at.desc())
        
        result = await self.db_session.execute(query)
        return result.scalars().all()