from sqlmodel import Field, SQLModel, Relationship
from uuid import UUID
from typing import TYPE_CHECKING, Optional

# if TYPE_CHECKING:
#     from src.features.tags.model import Tag
    # from src.features.reference.model import Reference

class ReferenceTagLink(SQLModel, table=True):
    __tablename__ = "reference_tag_links"
    
    reference_id: UUID = Field(foreign_key="references.id", primary_key=True)
    tag_id: UUID = Field(foreign_key="tags.id", primary_key=True)
    
    # reference: Optional["Reference"] = Relationship(back_populates="tag_links")
    # tag: Optional["Tag"] = Relationship(back_populates="reference_links")