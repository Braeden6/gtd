from sqlalchemy.ext.asyncio import AsyncSession
from src.features.inbox.schemas import InboxItemUpdate, SearchInboxItem
from src.features.inbox.model import InboxItem
from src.core.repository import BaseSoftDeleteRepository
from fastapi import Depends
from typing import Annotated
from gtd_shared.core.database import get_async_session

class InboxRepository(BaseSoftDeleteRepository[InboxItem, InboxItemUpdate, SearchInboxItem]):
    def __init__(self, db_session: Annotated[AsyncSession, Depends(get_async_session)]):
        super().__init__(db_session, InboxItem, SearchInboxItem, InboxItemUpdate)
