from src.features.reference.repository import ReferenceRepository
from src.features.reference.schemas import ReferenceUpdate, SearchReference
from src.features.reference.model import Reference
from src.core.service import BaseSoftDeleteService
from fastapi import Depends
from typing import Annotated

class ReferenceService(BaseSoftDeleteService[Reference, ReferenceUpdate, SearchReference]):
    def __init__(self, repository: Annotated[ReferenceRepository, Depends()]):
        super().__init__(repository)
