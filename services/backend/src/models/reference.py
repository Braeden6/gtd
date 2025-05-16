from src.models.base import BaseSoftDeleteModel, BaseUpdateSoftDeleteModel, BaseSearchable
from sqlmodel import Field
from uuid import UUID
from sqlmodel import SQLModel
from typing import Optional, List
from src.models.tags import Tag
from sqlmodel import Relationship

class ReferenceTagLink(SQLModel, table=True):
    __tablename__ = "reference_tag_links"
    
    reference_id: UUID = Field(foreign_key="references.id", primary_key=True)
    tag_id: UUID = Field(foreign_key="tags.id", primary_key=True)


class Reference(BaseSoftDeleteModel, table=True):
    __tablename__ = "references"
    
    title: str = Field(nullable=False)
    content: str = Field(nullable=False)  # Markdown content
    ai_summary: Optional[str] = Field(nullable=True)
    # embedding = Column(JSONB, nullable=True)  # For future vector search
    inbox_item_id: Optional[UUID] = Field(default=None, foreign_key="inbox_items.id", nullable=True, index=True)
    
    tags: List[Tag] = Relationship(back_populates="references")
    
class ReferenceUpdate(BaseUpdateSoftDeleteModel):
    title: Optional[str] = None
    content: Optional[str] = None
    ai_summary: Optional[str] = None
    inbox_item_id: Optional[UUID] = None
    
class SearchReference(BaseSearchable):
    pass
    
    
    