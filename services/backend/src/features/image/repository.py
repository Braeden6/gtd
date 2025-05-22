from sqlalchemy.ext.asyncio import AsyncSession
from src.core.repository import BaseSoftDeleteRepository
from src.features.image.schemas import ImageUpdate, SearchImage
from src.features.image.model import Image
from fastapi import Depends
from typing import Annotated
from gtd_shared.core.database import get_async_session

class ImageRepository(BaseSoftDeleteRepository[Image, ImageUpdate, SearchImage]):
    def __init__(self, db_session: Annotated[AsyncSession, Depends(get_async_session)]):
        super().__init__(db_session, Image, SearchImage, ImageUpdate)
