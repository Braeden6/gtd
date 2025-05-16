from sqlmodel import Field, Relationship
from src.models.base import BaseSoftDeleteModel, BaseUpdateSoftDeleteModel, BaseSearchable
from src.models.base.search import ComparisonSearch, LikeSearch
from typing import Optional, List, TYPE_CHECKING
if TYPE_CHECKING:
    from src.models.inbox import InboxItem

class Audio(BaseSoftDeleteModel, table=True):
    __tablename__ = "audios"

    audio_path: str = Field()
    transcription: Optional[str] = Field(default=None)
    inbox_items: List["InboxItem"] = Relationship(back_populates="audio")
    mimetype: Optional[str] = Field(default=None)

class AudioUpdate(BaseUpdateSoftDeleteModel):
    audio_path: Optional[str] = None
    transcription: Optional[str] = None
    mimetype: Optional[str] = None
    
class SearchAudio(BaseSearchable):
    audio_path: Optional[ComparisonSearch] = None
    transcription: Optional[LikeSearch] = None
    mimetype: Optional[LikeSearch] = None
