from sqlmodel import Field, Relationship
from src.models.base import BaseSoftDeleteModel, BaseUpdateSoftDeleteModel, BaseSearchable
from src.models.base.search import ComparisonSearch, LikeSearch
from typing import Optional, List, TYPE_CHECKING
if TYPE_CHECKING:
    from src.models.inbox import InboxItem

class Image(BaseSoftDeleteModel, table=True):
    __tablename__ = "images"

    image_path: Optional[str] = Field(nullable=False)
    ai_description: Optional[str] = Field(nullable=True)
    inbox_items: List["InboxItem"] = Relationship(back_populates="image")
    mimetype: Optional[str] = Field(default=None)
class ImageUpdate(BaseUpdateSoftDeleteModel):
    image_path: Optional[str] = None
    ai_description: Optional[str] = None
    mimetype: Optional[str] = None
    
class SearchImage(BaseSearchable):
    image_path: Optional[ComparisonSearch] = None
    ai_description: Optional[LikeSearch] = None
    mimetype: Optional[LikeSearch] = None
