from src.models.base import BaseUpdateSoftDeleteModel, BaseSearchable
from src.models.base.search import ComparisonSearch, StringComparison
from typing import Optional

class ImageUpdate(BaseUpdateSoftDeleteModel):
    image_path: Optional[str] = None
    ai_description: Optional[str] = None
    mimetype: Optional[str] = None
    
class SearchImage(BaseSearchable):
    image_path: Optional[ComparisonSearch] = None
    ai_description: Optional[StringComparison] = None
    mimetype: Optional[StringComparison] = None
