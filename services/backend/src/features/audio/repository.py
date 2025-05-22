from sqlalchemy.ext.asyncio import AsyncSession
from src.features.audio.schemas import AudioUpdate, SearchAudio
from src.features.audio.model import Audio
from src.core.repository import BaseSoftDeleteRepository
from fastapi import Depends
from typing import Annotated
from gtd_shared.core.database import get_async_session

class AudioRepository(BaseSoftDeleteRepository[Audio, AudioUpdate, SearchAudio]):
    def __init__(self, db_session: Annotated[AsyncSession, Depends(get_async_session)]):
        super().__init__(db_session, Audio, SearchAudio, AudioUpdate)
