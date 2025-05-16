from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.models.views.inbox import InboxItemWithTranscription

class InboxViewRepository:
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session
    
    async def get_all_for_user(self, user_id: UUID, processed: Optional[bool] = None) -> List[InboxItemWithTranscription]:
        query = (
            select(InboxItemWithTranscription)
            .where(InboxItemWithTranscription.user_id == user_id)
            .order_by(InboxItemWithTranscription.created_at.desc())
        )
        
        if processed is not None:
            query = query.where(InboxItemWithTranscription.processed == processed)
            
        result = await self.db_session.execute(query)
        return list(result.scalars().all())