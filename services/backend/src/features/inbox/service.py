from src.features.extended_inbox.schemas import SearchExtendedInbox
from src.features.inbox.repository import InboxRepository
from src.features.inbox.schemas import InboxItemUpdate, SearchInboxItem
from src.features.inbox.model import InboxItem
from src.core.service import BaseSoftDeleteService
from fastapi import Depends
from typing import Annotated
from src.features.audio.service import AudioService
from src.features.image.service import ImageService
from typing import override
from typing import Optional
from fastapi import UploadFile
from src.features.audio.model import Audio
from src.features.image.model import Image
from src.features.extended_inbox.service import ExtendedInboxService
from uuid import UUID

class InboxService(BaseSoftDeleteService[InboxItem, InboxItemUpdate, SearchInboxItem]):
    def __init__(
        self, 
        repository: Annotated[InboxRepository, Depends()],
        audio_service: Annotated[AudioService, Depends()],
        image_service: Annotated[ImageService, Depends()],
        extended_inbox_service: Annotated[ExtendedInboxService, Depends()]
    ):
        super().__init__(repository)
        self.audio_service = audio_service
        self.image_service = image_service
        self.extended_inbox_service = extended_inbox_service
    @override
    async def create(self, item: InboxItem, audio: Optional[UploadFile], image: Optional[UploadFile]) -> InboxItem:
        if audio:
            audio_entry = await self.audio_service.create(Audio(**item.model_dump(), mimetype=audio.content_type), audio)
            item.audio_id = audio_entry.id
        if image:
            image_entry = await self.image_service.create(Image(**item.model_dump(), mimetype=image.content_type), image)
            item.image_id = image_entry.id
        return await super().create(item)
    
    @override
    async def delete(self, item_id: UUID, user_id: UUID) -> None:
        item = await super().get_by_id(item_id, user_id)
        if item.audio_id:
            await self.audio_service.delete(item.audio_id, user_id)
        if item.image_id:
            await self.image_service.delete(item.image_id, user_id)
        return await super().delete(item_id, user_id)
    
    @override
    async def get_all(self, user_id: UUID) -> list[InboxItem]:
        return await self.extended_inbox_service.get_all(user_id)
    
    @override
    async def get_by_id(self, item_id: UUID, user_id: UUID) -> InboxItem:
        return await self.extended_inbox_service.get_by_id(item_id, user_id)
    
    @override
    async def search(self, user_id: UUID, search: SearchExtendedInbox) -> list[InboxItem]:
        return await self.extended_inbox_service.search(user_id, search)
