from src.models.base import BaseSoftDeleteModel, BaseUpdateSoftDeleteModel, BaseSearchable
from sqlmodel import Field, Relationship
from src.models.base import Priority, ActionStatus
from uuid import UUID
from typing import Optional
from datetime import datetime
from typing import List, TYPE_CHECKING
from src.models.base.search import ComparisonSearch, StringComparison, SearchBaseEnumComparison

if TYPE_CHECKING:
    from src.models.inbox import InboxItem

class Action(BaseSoftDeleteModel, table=True):
    __tablename__ = "actions"
    
    title: str = Field(nullable=False)
    description: Optional[str] = Field(nullable=True)
    priority: Optional[Priority] = Field(nullable=True)
    due_date: Optional[datetime] = Field(nullable=True)
    status: Optional[ActionStatus] = Field(default=ActionStatus.PENDING)
    project_id: Optional[UUID] = Field(default=None, foreign_key="projects.id")
    inbox_items: List["InboxItem"] = Relationship(back_populates="action")

class ActionUpdate(BaseUpdateSoftDeleteModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None
    status: Optional[ActionStatus] = None
    project_id: Optional[UUID] = None


class SearchEnumComparison(SearchBaseEnumComparison[ActionStatus], table=False):
    value: ActionStatus = Field(...)  
    
class SearchAction(BaseSearchable):
    title: Optional[StringComparison] = None
    description: Optional[StringComparison] = None
    priority: Optional[ComparisonSearch] = None
    due_date: Optional[ComparisonSearch] = None
    status: Optional[SearchEnumComparison] = None
    project_id: Optional[ComparisonSearch] = None