from src.models.base import BaseSoftDeleteModel
from src.models.base import Priority
from typing import Optional, List, TYPE_CHECKING
from src.models.base.search import SearchBaseEnumComparison
from datetime import datetime
from sqlmodel import Field, Relationship
from enum import Enum

if TYPE_CHECKING:
    from src.models.inbox import InboxItem
    from src.models.action import Action
    
# ----- ENUMs ----- #
class ProjectStatus(Enum):
    ACTIVE = "active"
    ON_HOLD = "on_hold"
    COMPLETED = "completed"
    
class ProjectStatusComparison(SearchBaseEnumComparison[ProjectStatus], table=False):
    value: ProjectStatus = Field(...) 

class Project(BaseSoftDeleteModel, table=True):
    __tablename__ = "projects"
    
    title: str = Field(nullable=False)
    description: Optional[str] = Field(nullable=True)
    priority: Optional[Priority] = Field(nullable=True)
    due_date: Optional[datetime] = Field(nullable=True)
    
    inbox_items: List["InboxItem"] = Relationship(back_populates="project")
    actions: List["Action"] = Relationship(back_populates="project")