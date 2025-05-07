from src.models.base import SoftDeleteModel, SQLAlchemyBase as BaseModel
from sqlalchemy import Column, Text, ForeignKey
# from sqlalchemy import Index
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

class ReferenceTagLink(BaseModel):
    """Many-to-many relationship between References and Tags"""
    __tablename__ = "reference_tag_links"
    
    reference_id = Column(UUID(as_uuid=True), ForeignKey("references.id"), primary_key=True)
    tag_id = Column(UUID(as_uuid=True), ForeignKey("tags.id"), primary_key=True)


class Reference(SoftDeleteModel):
    """Knowledge base items"""
    __tablename__ = "references"
    
    title = Column(Text, nullable=False)
    content = Column(Text, nullable=False)  # Markdown content
    ai_summary = Column(Text, nullable=True)
    # embedding = Column(JSONB, nullable=True)  # For future vector search
    inbox_item_id = Column(UUID(as_uuid=True), ForeignKey("inbox_items.id"), nullable=True, index=True)
    
    # Relationships
    tags = relationship("Tag", secondary="reference_tag_links")
    # __table_args__ = (
    #     Index("idx_reference_embedding", "embedding", postgresql_using="gin"),
    # )