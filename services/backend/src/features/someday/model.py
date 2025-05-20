from src.models.base import BaseSoftDeleteModel
from sqlmodel import Field
from uuid import UUID
from typing import Optional, TYPE_CHECKING
from datetime import datetime
from sqlmodel import Relationship

if TYPE_CHECKING:
    from src.models.inbox import InboxItem

class SomedayMaybe(BaseSoftDeleteModel, table=True):
    __tablename__ = "someday_maybe"
    
    review_date: Optional[datetime] = Field(nullable=True)
    notes: Optional[str] = Field(nullable=True)
    inbox_id: Optional[UUID] = Field(default=None, foreign_key="inbox_items.id")
    
    inbox_item: Optional["InboxItem"] = Relationship(back_populates="someday_maybe")