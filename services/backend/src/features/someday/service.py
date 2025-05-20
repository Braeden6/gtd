from src.features.someday.repository import SomedayRepository
from src.features.someday.schemas import SomedayUpdate, SearchSomeday
from src.features.someday.model import SomedayMaybe
from src.core.service import BaseSoftDeleteService
from fastapi import Depends
from typing import Annotated

class SomedayService(BaseSoftDeleteService[SomedayMaybe, SomedayUpdate, SearchSomeday]):
    def __init__(self, repository: Annotated[SomedayRepository, Depends()]):
        super().__init__(repository)
