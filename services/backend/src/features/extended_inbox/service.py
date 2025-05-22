from src.features.extended_inbox.repository import ExtendedInboxRepository
from src.features.extended_inbox.schemas import ExtendedInboxUpdate, SearchExtendedInbox
from src.features.extended_inbox.model import ExtendedInbox
from src.core.service import BaseSoftDeleteService
from fastapi import Depends
from typing import Annotated

class ExtendedInboxService(BaseSoftDeleteService[ExtendedInbox, ExtendedInboxUpdate, SearchExtendedInbox]):
    def __init__(self, repository: Annotated[ExtendedInboxRepository, Depends()]):
        super().__init__(repository)
