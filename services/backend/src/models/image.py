from sqlalchemy import Column, Text
from sqlalchemy import Index
from src.models.base import SoftDeleteModel, BaseCreateModel, BaseUpdateModel
from typing import Optional


class Image(SoftDeleteModel):
    """Image model for storing user submissions."""

    __tablename__ = "images"

    image_path = Column(Text, nullable=True)
    ai_description = Column(Text, nullable=True)

    __table_args__ = (Index("idx_image_ai_description", "ai_description"),)

    def __repr__(self) -> str:
        return f"<Image(id={self.id}, image_path={self.image_path}, ai_description={self.ai_description})>"
    
    
class ImageCreate(BaseCreateModel):
    image_path: str
    ai_description: Optional[str] = None

class ImageUpdate(BaseUpdateModel):
    image_path: Optional[str] = None
    ai_description: Optional[str] = None
