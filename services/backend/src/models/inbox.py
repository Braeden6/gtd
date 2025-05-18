from src.models.base import BaseSearchable, BaseUpdateSoftDeleteModel, BaseSoftDeleteModel
from typing import Optional
from uuid import UUID
from sqlmodel import Field, Relationship
from src.models.base.search import BooleanSearch, ComparisonSearch, StringComparison
from src.models.image import Image
from src.models.audio import Audio
from src.models.action import Action
from src.models.project import Project

class InboxItem(BaseSoftDeleteModel, table=True):
    __tablename__ = "inbox_items"
    
    content: Optional[str] = Field(default=None)
    image_id: Optional[UUID] = Field(default=None, foreign_key="images.id")
    image: Optional[Image] = Relationship(back_populates="inbox_items")
    audio_id: Optional[UUID] = Field(default=None, foreign_key="audios.id")
    audio: Optional[Audio] = Relationship(back_populates="inbox_items")
    processed: Optional[bool] = Field(default=False)
    is_new: Optional[bool] = Field(default=True)
    
    action_id: Optional[UUID] = Field(default=None, foreign_key="actions.id")
    action: Optional[Action] = Relationship(back_populates="inbox_items")
    project_id: Optional[UUID] = Field(default=None, foreign_key="projects.id")
    project: Optional[Project] = Relationship(back_populates="inbox_items")


class InboxItemUpdate(BaseUpdateSoftDeleteModel):
    content: Optional[str] = None
    image_id: Optional[UUID] = None
    audio_id: Optional[UUID] = None
    action_id: Optional[UUID] = None
    project_id: Optional[UUID] = None
    processed: Optional[bool] = None
    is_new: Optional[bool] = None
    
class SearchInboxItem(BaseSearchable):
    content: Optional[StringComparison] = None
    image_id: Optional[ComparisonSearch] = None
    processed: Optional[BooleanSearch] = None
    is_new: Optional[BooleanSearch] = None
    action_id: Optional[ComparisonSearch] = None
    project_id: Optional[ComparisonSearch] = None
