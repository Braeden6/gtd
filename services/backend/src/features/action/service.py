from src.features.action.repository import ActionRepository
from src.features.action.schemas import ActionUpdate, SearchAction
from src.features.action.model import Action
from src.core.service import BaseSoftDeleteService
from fastapi import Depends
from typing import Annotated

class ActionService(BaseSoftDeleteService[Action, ActionUpdate, SearchAction]):
    def __init__(self, repository: Annotated[ActionRepository, Depends()]):
        super().__init__(repository)
