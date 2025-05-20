from src.models.base import BaseSoftDeleteModel, BaseUpdateSoftDeleteModel, BaseSearchable
from sqlmodel import Field, SQLModel, Relationship
from uuid import UUID
from typing import Optional, List, TYPE_CHECKING

if TYPE_CHECKING:
    from src.models.inbox import InboxItem
    # from src.models.tags import Tag

class ReferenceTagLink(SQLModel, table=True):
    __tablename__ = "reference_tag_links"
    
    reference_id: UUID = Field(foreign_key="references.id", primary_key=True)
    tag_id: UUID = Field(foreign_key="tags.id", primary_key=True)
    
    # Use strings for relationship targets to avoid circular imports
    # reference: "Reference" = Relationship(back_populates="tag_links")
    # tag: "Tag" = Relationship(back_populates="reference_links")
    
class Reference(BaseSoftDeleteModel, table=True):
    __tablename__ = "references"
    
    title: str = Field(nullable=False)
    content: str = Field(nullable=False)  # Markdown content
    ai_summary: Optional[str] = Field(nullable=True)
    # embedding = Column(JSONB, nullable=True)  # For future vector search
    
    inbox_items: List["InboxItem"] = Relationship(back_populates="reference")
    # tag_links: List[ReferenceTagLink] = Relationship(back_populates="reference")

class ReferenceUpdate(BaseUpdateSoftDeleteModel):
    title: Optional[str] = None
    content: Optional[str] = None
    ai_summary: Optional[str] = None
    inbox_item_id: Optional[UUID] = None
    
class SearchReference(BaseSearchable):
    pass
    
    
    