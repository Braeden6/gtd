from sqlalchemy.ext.asyncio import AsyncSession
from src.repository.soft_delete_base import SoftDeleteRepository
from src.models.inbox import InboxItem, InboxItemCreate, InboxItemUpdate, SearchInboxItem
from typing import List
from sqlalchemy import select


class InboxRepository(SoftDeleteRepository[InboxItem, InboxItemCreate, InboxItemUpdate]):
    """Repository for CRUD operations on InboxItem."""

    def __init__(self, db_session: AsyncSession):
        """Initialize with database session."""
        super().__init__(db_session, InboxItem)

    async def search(self, search_model: SearchInboxItem) -> List[InboxItem]:
        """Search for inbox items."""
        query = select(InboxItem).where(InboxItem.user_id == search_model.user_id)
        if search_model.content:
            query = query.where(InboxItem.content.ilike(f"%{search_model.content}%"))
            
        if search_model.action_id:
            query = query.where(InboxItem.action_id == search_model.action_id)
        if search_model.project_id:
            query = query.where(InboxItem.project_id == search_model.project_id)
            
        if search_model.action_id is False:
            query = query.where(InboxItem.action_id.is_(None))
        if search_model.project_id is False:
            query = query.where(InboxItem.project_id.is_(None))
            
        if search_model.processed is not None:
            query = query.where(InboxItem.processed == search_model.processed)
            
        if search_model.has_image:
            query = query.where(InboxItem.image_id.isnot(None))
        if search_model.has_audio:
            query = query.where(InboxItem.audio_id.isnot(None))
            
        if search_model.is_new is not None:
            query = query.where(InboxItem.is_new == search_model.is_new)
            
        if search_model.order_by:
            if search_model.order_by == "created_at":
                query = query.order_by(InboxItem.created_at.desc() if search_model.order_direction == "desc" else InboxItem.created_at.asc())
            elif search_model.order_by == "due_date":
                query = query.order_by(InboxItem.due_date.desc() if search_model.order_direction == "desc" else InboxItem.due_date.asc())
            elif search_model.order_by == "priority":
                query = query.order_by(InboxItem.priority.desc() if search_model.order_direction == "desc" else InboxItem.priority.asc())
        result = await self.db_session.execute(query)
        return list(result.scalars().all())
