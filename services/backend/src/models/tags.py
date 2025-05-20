from src.models.base import BaseModel
from sqlmodel import Field#, Relationship
from typing import Optional#, List, TYPE_CHECKING

# if TYPE_CHECKING:
#     from src.models.reference import ReferenceTagLink

class Tag(BaseModel, table=True):
    __tablename__ = "tags"
    
    name: str = Field(nullable=False, unique=True)
    type: Optional[str] = Field(nullable=True)
    
    # reference_links: List["ReferenceTagLink"] = Relationship(back_populates="tag")