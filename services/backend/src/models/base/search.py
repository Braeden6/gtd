from abc import ABC, abstractmethod
from typing import Any, Type, Union
from sqlmodel import SQLModel, Field
from sqlalchemy.sql import Select
from enum import Enum
from uuid import UUID
from datetime import datetime

class QueryType(ABC):
    @abstractmethod
    def apply(self, model_class: Type[SQLModel], query: Select, value: Any, field: str) -> Select:
        pass
    
class BasicComparison(Enum):
    EQ = "eq"
    NE = "ne"
    
class AllComparison(Enum):
    EQ = "eq"
    NE = "ne"
    GT = "gt"
    GE = "ge"
    LT = "lt"
    LE = "le"

# --- Search Type --- #   
class BooleanSearch(SQLModel, table=False):
    value: Union[bool, UUID] = Field()
    option: BasicComparison = Field(default=BasicComparison.EQ)
    
    def apply(self, model_class: Type[SQLModel], query: Select, field: str) -> Select:
        if self.option == BasicComparison.EQ:
            return query.where(
                getattr(model_class, field) == self.value
            )
        elif self.option == BasicComparison.NE:
            return query.where(
                getattr(model_class, field) != self.value
            )
            
class ComparisonSearch(SQLModel, table=False):
    value: Union[int, float, datetime] = Field()
    option: AllComparison = Field(default=AllComparison.EQ)
    
    def apply(self, model_class: Type[SQLModel], query: Select, field: str) -> Select:
        if self.option == AllComparison.EQ:
            return query.where(
                getattr(model_class, field) == self.value
            )
        elif self.option == AllComparison.NE:
            return query.where(
                getattr(model_class, field) != self.value
            )
        elif self.option == AllComparison.GT:
            return query.where(
                getattr(model_class, field) > self.value
            )
        elif self.option == AllComparison.GE:
            return query.where(
                getattr(model_class, field) >= self.value
            )
        elif self.option == AllComparison.LT:
            return query.where(
                getattr(model_class, field) < self.value
            )
        elif self.option == AllComparison.LE:
            return query.where(
                getattr(model_class, field) <= self.value
            )
                  
class LikeSearch(SQLModel, table=False):
    value: str = Field()
    
    def apply(self, model_class: Type[SQLModel], query: Select, field: str) -> Select:
        return query.where(
            getattr(model_class, field).ilike(f"%{self.value}%")
        )