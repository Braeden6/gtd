from sqlalchemy.ext.asyncio import AsyncSession
from src.core.repository import BaseSoftDeleteRepository
from src.features.someday.schemas import SomedayUpdate, SearchSomeday
from src.features.someday.model import SomedayMaybe
from fastapi import Depends
from typing import Annotated
from gtd_shared.core.database import get_async_session

class SomedayRepository(BaseSoftDeleteRepository[SomedayMaybe, SomedayUpdate, SearchSomeday]):
    def __init__(self, db_session: Annotated[AsyncSession, Depends(get_async_session)]):
        super().__init__(db_session, SomedayMaybe, SearchSomeday, SomedayUpdate)
