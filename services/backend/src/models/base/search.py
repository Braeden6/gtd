from abc import ABC, abstractmethod
from typing import Any, Generic, Type, TypeVar, Union
from sqlmodel import SQLModel, Field
from sqlalchemy.sql import Select
from enum import Enum
from uuid import UUID
from datetime import datetime

class QueryType(ABC):
    @abstractmethod
    def apply(self, model_class: Type[SQLModel], query: Select, value: Any, field: str) -> Select:
        pass
    
class SearchStringComparison(Enum):
    EQ = "eq"
    NE = "ne"
    LIKE = "like"
    
# class StringComparison(Enum):
#     EQ = "eq"
#     NE = "ne"
#     LIKE = "like"    
    
class BasicComparison(Enum):
    EQ = "eq"
    NE = "ne"
    
class NumberComparison(Enum):
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
            
class StringComparison(SQLModel, table=False):
    value: str = Field()
    option: SearchStringComparison = Field(default=SearchStringComparison.EQ)

    def apply(self, model_class: Type[SQLModel], query: Select, field: str) -> Select:
        if self.option == SearchStringComparison.EQ:
            return query.where(
                getattr(model_class, field) == self.value
            )
        elif self.option == SearchStringComparison.NE:
            return query.where(
                getattr(model_class, field) != self.value
            )
        elif self.option == SearchStringComparison.LIKE:
            return query.where(
                getattr(model_class, field).ilike(f"%{self.value}%")
            )
        
class ComparisonSearch(SQLModel, table=False):
    value: Union[int, float, datetime] = Field()
    option: NumberComparison = Field(default=NumberComparison.EQ)
    
    def apply(self, model_class: Type[SQLModel], query: Select, field: str) -> Select:
        if self.option == NumberComparison.EQ:
            return query.where(
                getattr(model_class, field) == self.value
            )
        elif self.option == NumberComparison.NE:
            return query.where(
                getattr(model_class, field) != self.value
            )
        elif self.option == NumberComparison.GT:
            return query.where(
                getattr(model_class, field) > self.value
            )
        elif self.option == NumberComparison.GE:
            return query.where(
                getattr(model_class, field) >= self.value
            )
        elif self.option == NumberComparison.LT:
            return query.where(
                getattr(model_class, field) < self.value
            )
        elif self.option == NumberComparison.LE:
            return query.where(
                getattr(model_class, field) <= self.value
            )


T = TypeVar("T")

class SearchBaseEnumComparison(SQLModel, Generic[T], table=False):
    value: T = Field(...)  
    option: BasicComparison = Field(default=BasicComparison.EQ)

    def apply(self, model_class: Type[SQLModel], query: Select, field: str) -> Select:
        if self.option == BasicComparison.EQ:
            return query.where(getattr(model_class, field) == self.value)
        elif self.option == BasicComparison.NE:
            return query.where(getattr(model_class, field) != self.value)
    