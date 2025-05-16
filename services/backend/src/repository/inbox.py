from sqlalchemy.ext.asyncio import AsyncSession
from src.repository.base import BaseSoftDeleteRepository
from src.models.inbox import InboxItem, InboxItemUpdate, SearchInboxItem

class InboxRepository(BaseSoftDeleteRepository[InboxItem, InboxItemUpdate, SearchInboxItem]):
    def __init__(self, db_session: AsyncSession):
        super().__init__(db_session, InboxItem, SearchInboxItem, InboxItemUpdate)