from sqlmodel import Field, Relationship
from src.models.base import BaseModel, BaseSoftDeleteModel
from typing import Optional, List, TYPE_CHECKING

if TYPE_CHECKING:
    from src.features.reference_tag.model import ReferenceTagLink

class Tag(BaseModel, table=True):
    __tablename__ = "tags"
    
    name: str = Field(nullable=False, unique=True)
    color: Optional[str] = Field(default=None)
    description: Optional[str] = Field(default=None)
    
    # reference_links: List["ReferenceTagLink"] = Relationship(back_populates="tag")