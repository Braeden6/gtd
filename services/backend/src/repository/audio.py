from sqlalchemy.ext.asyncio import AsyncSession
from src.models.audio import Audio, AudioUpdate, SearchAudio
from src.repository.base import BaseSoftDeleteRepository

class AudioRepository(BaseSoftDeleteRepository[Audio, AudioUpdate, SearchAudio]):
    def __init__(self, db_session: AsyncSession):
        super().__init__(db_session, Audio, SearchAudio, AudioUpdate)
