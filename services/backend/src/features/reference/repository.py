from sqlalchemy.ext.asyncio import AsyncSession
from src.core.repository import BaseSoftDeleteRepository
from src.features.reference.schemas import ReferenceUpdate, SearchReference
from src.features.reference.model import Reference
from fastapi import Depends
from typing import Annotated
from gtd_shared.core.database import get_async_session

class ReferenceRepository(BaseSoftDeleteRepository[Reference, ReferenceUpdate, SearchReference]):
    def __init__(self, db_session: Annotated[AsyncSession, Depends(get_async_session)]):
        super().__init__(db_session, Reference, SearchReference, ReferenceUpdate)
