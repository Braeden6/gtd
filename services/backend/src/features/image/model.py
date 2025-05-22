from sqlmodel import Field, Relationship
from src.models.base import BaseSoftDeleteModel
from typing import Optional, List, TYPE_CHECKING
if TYPE_CHECKING:
    from src.features.inbox.model import InboxItem

class Image(BaseSoftDeleteModel, table=True):
    __tablename__ = "images"

    image_path: Optional[str] = Field(nullable=False)
    ai_description: Optional[str] = Field(nullable=True)
    mimetype: Optional[str] = Field(default=None)
    
    inbox_items: List["InboxItem"] = Relationship(back_populates="image")
    