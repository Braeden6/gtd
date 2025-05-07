from src.models.base import SoftDeleteModel
from sqlalchemy import Column, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID


class SomedayMaybe(SoftDeleteModel):
    """Deferred items for future consideration"""
    __tablename__ = "someday_maybe"
    
    review_date = Column(DateTime, nullable=True)
    notes = Column(Text, nullable=True)
    inbox_item_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("inbox_items.id"), 
        unique=True,  # 1:1 relationship
        index=True
    )