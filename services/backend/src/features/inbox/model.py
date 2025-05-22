from src.features.action.model import Action
from src.models.base import BaseSoftDeleteModel
from typing import Optional, TYPE_CHECKING
from uuid import UUID
from sqlmodel import Field, Relationship

if TYPE_CHECKING:
    from src.features.action.model import Action
    from src.features.project.model import Project
    from src.features.image.model import Image
    from src.features.audio.model import Audio
    from src.features.someday.model import SomedayMaybe
    from src.features.reference.model import Reference

class InboxItem(BaseSoftDeleteModel, table=True):
    __tablename__ = "inbox_items"
    
    content: Optional[str] = Field(default=None)
    image_id: Optional[UUID] = Field(default=None, foreign_key="images.id")
    audio_id: Optional[UUID] = Field(default=None, foreign_key="audios.id")
    processed: Optional[bool] = Field(default=False)
    is_new: Optional[bool] = Field(default=True)
    reference_id: Optional[UUID] = Field(default=None, foreign_key="references.id")
    project_id: Optional[UUID] = Field(default=None, foreign_key="projects.id")
    
    image: Optional["Image"] = Relationship(back_populates="inbox_items")
    audio: Optional["Audio"] = Relationship(back_populates="inbox_items")
    project: Optional["Project"] = Relationship(back_populates="inbox_items")
    reference: Optional["Reference"] = Relationship(back_populates="inbox_items")
    action: Optional["Action"] = Relationship(back_populates="inbox_item")
    someday_maybe: Optional["SomedayMaybe"] = Relationship(back_populates="inbox_item")