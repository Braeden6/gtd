from src.models.base import BaseSoftDeleteModel
from sqlmodel import Field, Relationship
from typing import Optional, List, TYPE_CHECKING

if TYPE_CHECKING:
    from src.features.inbox.model import InboxItem
    # from src.features.reference_tag.model import ReferenceTagLink
    
class Reference(BaseSoftDeleteModel, table=True):
    __tablename__ = "references"
    
    title: str = Field(nullable=False)
    content: str = Field(nullable=False)  # Markdown content
    ai_summary: Optional[str] = Field(nullable=True)
    # embedding = Column(JSONB, nullable=True)  # For future vector search
    
    inbox_items: List["InboxItem"] = Relationship(back_populates="reference")
    # tag_links: List["ReferenceTagLink"] = Relationship(back_populates="reference")