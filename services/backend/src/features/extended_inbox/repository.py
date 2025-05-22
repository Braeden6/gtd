from sqlalchemy.ext.asyncio import AsyncSession
from src.features.extended_inbox.model import ExtendedInbox
from src.features.extended_inbox.schemas import ExtendedInboxUpdate, SearchExtendedInbox
from src.core.repository import BaseSoftDeleteRepository
from fastapi import Depends
from typing import Annotated
from gtd_shared.core.database import get_async_session

class ExtendedInboxRepository(BaseSoftDeleteRepository[ExtendedInbox, ExtendedInboxUpdate, SearchExtendedInbox]):
    def __init__(self, db_session: Annotated[AsyncSession, Depends(get_async_session)]):
        super().__init__(db_session, ExtendedInbox, SearchExtendedInbox, ExtendedInboxUpdate)
