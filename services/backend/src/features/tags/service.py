from src.features.tags.repository import TagRepository
from src.features.tags.schemas import TagUpdate, SearchTag
from src.features.tags.model import Tag
from src.core.service import BaseService
from fastapi import Depends
from typing import Annotated

class TagService(BaseService[Tag, TagUpdate, SearchTag]):
    def __init__(self, repository: Annotated[TagRepository, Depends()]):
        super().__init__(repository)
