from sqlalchemy.ext.asyncio import AsyncSession
from src.features.tags.schemas import TagUpdate, SearchTag
from src.features.tags.model import Tag
from src.core.repository import BaseRepository
from fastapi import Depends
from typing import Annotated
from gtd_shared.core.database import get_async_session

class TagRepository(BaseRepository[Tag, TagUpdate, SearchTag]):
    def __init__(self, db_session: Annotated[AsyncSession, Depends(get_async_session)]):
        super().__init__(db_session, Tag, SearchTag)
