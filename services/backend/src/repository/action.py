from sqlalchemy.ext.asyncio import AsyncSession
from src.models.action import Action, ActionUpdate, SearchAction
from src.repository.base import BaseSoftDeleteRepository

class ActionRepository(BaseSoftDeleteRepository[Action, ActionUpdate, SearchAction]):
    def __init__(self, db_session: AsyncSession):
        super().__init__(db_session, Action, SearchAction, ActionUpdate)
