from src.models.base import BaseSoftDeleteModel
from sqlmodel import Field, Relationship
from src.models.base import Priority
from uuid import UUID
from typing import Optional
from datetime import datetime
from typing import TYPE_CHECKING
from src.models.base.search import SearchBaseEnumComparison
from enum import Enum

if TYPE_CHECKING:
    from src.features.inbox.model import InboxItem
    from src.features.project.model import Project
   
# ----- ENUMs ----- #
class ActionStatus(Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    DEFERRED = "deferred"

class ActionStatusComparison(SearchBaseEnumComparison[ActionStatus], table=False):
    value: ActionStatus = Field(...)  
    
# ----- MODELs ----- #
class Action(BaseSoftDeleteModel, table=True):
    __tablename__ = "actions"
    
    title: str = Field(nullable=False)
    description: Optional[str] = Field(nullable=True)
    priority: Optional[Priority] = Field(nullable=True)
    due_date: Optional[datetime] = Field(nullable=True)
    status: Optional[ActionStatus] = Field(default=ActionStatus.PENDING)
    project_id: Optional[UUID] = Field(default=None, foreign_key="projects.id")
    inbox_id: Optional[UUID] = Field(default=None, foreign_key="inbox_items.id")
    
    project: Optional["Project"] = Relationship(back_populates="actions")
    inbox_item: Optional["InboxItem"] = Relationship(back_populates="action")