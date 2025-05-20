from src.models.action import Action
from src.models.base import BaseSearchable, BaseUpdateSoftDeleteModel, BaseSoftDeleteModel
from typing import Optional, Literal
from uuid import UUID
from sqlmodel import Field, Relationship, SQLModel
from src.models.base.search import BooleanSearch, ComparisonSearch, StringComparison
from src.models.image import Image
from src.models.audio import Audio
from src.models.project import Project
from datetime import datetime
from src.models.reference import Reference
from src.features.someday.model import SomedayMaybe

class InboxItem(BaseSoftDeleteModel, table=True):
    __tablename__ = "inbox_items"
    
    content: Optional[str] = Field(default=None)
    image_id: Optional[UUID] = Field(default=None, foreign_key="images.id")
    image: Optional[Image] = Relationship(back_populates="inbox_items")
    audio_id: Optional[UUID] = Field(default=None, foreign_key="audios.id")
    audio: Optional[Audio] = Relationship(back_populates="inbox_items")
    processed: Optional[bool] = Field(default=False)
    is_new: Optional[bool] = Field(default=True)
    reference_id: Optional[UUID] = Field(default=None, foreign_key="references.id")
    project_id: Optional[UUID] = Field(default=None, foreign_key="projects.id")
    
    project: Optional[Project] = Relationship(back_populates="inbox_items")
    reference: Optional[Reference] = Relationship(back_populates="inbox_items")
    action: Optional[Action] = Relationship(back_populates="inbox_item")
    someday_maybe: Optional[SomedayMaybe] = Relationship(back_populates="inbox_item")


class InboxItemUpdate(BaseUpdateSoftDeleteModel):
    content: Optional[str] = None
    image_id: Optional[UUID] = None
    audio_id: Optional[UUID] = None
    project_id: Optional[UUID] = None
    processed: Optional[bool] = None
    is_new: Optional[bool] = None
    
class SearchInboxItem(BaseSearchable):
    content: Optional[StringComparison] = None
    image_id: Optional[ComparisonSearch] = None
    processed: Optional[BooleanSearch] = None
    is_new: Optional[BooleanSearch] = None
    project_id: Optional[ComparisonSearch] = None

class InboxItemUpdateDTO(SQLModel, table=False):
    content: Optional[str] = None
    image_id: Optional[UUID | Literal[False]] = None
    audio_id: Optional[UUID | Literal[False]] = None
    project_id: Optional[UUID | Literal[False]] = None
    processed: Optional[bool] = None
    is_new: Optional[bool] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "content": "Remember to check on the project status",
                "image_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "audio_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "processed": False,
                "is_new": True
            }
        }

class InboxItemResponseDTO(SQLModel, table=False):
    id: UUID
    user_id: UUID
    content: str
    audio_id: Optional[UUID] = None
    image_id: Optional[UUID] = None
    processed: bool
    created_at: datetime
    transcription: Optional[str] = None
    is_new: bool
    project_id: Optional[UUID] = None
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "content": "Remember to check on the project status",
                "audio_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "image_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "processed": False,
                "is_new": True,
                "created_at": "2023-06-15T12:30:45.123Z",
                "transcription": "Remember to check on the project status",
                "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }

