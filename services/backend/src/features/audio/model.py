from sqlmodel import Field, Relationship
from src.models.base import BaseSoftDeleteModel
from typing import Optional, List, TYPE_CHECKING
if TYPE_CHECKING:
    from src.features.inbox.model import InboxItem

class Audio(BaseSoftDeleteModel, table=True):
    __tablename__ = "audios"

    audio_path: str = Field()
    transcription: Optional[str] = Field(default=None)
    mimetype: Optional[str] = Field(default=None)
    
    inbox_items: List["InboxItem"] = Relationship(back_populates="audio")