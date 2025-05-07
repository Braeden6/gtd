from src.models.base import SoftDeleteModel
from sqlalchemy import Column, Text

class Tag(SoftDeleteModel):
    """Categorization system"""
    __tablename__ = "tags"
    
    name = Column(Text, nullable=False, unique=True)
    type = Column(Text, nullable=True) 