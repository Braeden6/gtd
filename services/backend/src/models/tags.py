from src.models.base import BaseModel
from sqlmodel import Field
from typing import Optional

class Tag(BaseModel, table=True):
    __tablename__ = "tags"
    
    name: str = Field(nullable=False, unique=True)
    type: Optional[str] = Field(nullable=True) 