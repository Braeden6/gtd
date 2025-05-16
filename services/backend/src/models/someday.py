from src.models.base import BaseSoftDeleteModel
from sqlmodel import Field
from uuid import UUID
from typing import Optional
from datetime import datetime

class SomedayMaybe(BaseSoftDeleteModel, table=True):
    __tablename__ = "someday_maybe"
    
    review_date: Optional[datetime] = Field(nullable=True)
    notes: Optional[str] = Field(nullable=True)
    inbox_item_id: Optional[UUID] = Field(default=None, foreign_key="inbox_items.id")