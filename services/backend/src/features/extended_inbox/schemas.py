from src.models.base import BaseUpdateSoftDeleteModel, BaseSearchable
from src.models.base.search import ComparisonSearch, StringComparison, BooleanSearch
from typing import Optional

# can't update view
class ExtendedInboxUpdate(BaseUpdateSoftDeleteModel):
    pass
    
class SearchExtendedInbox(BaseSearchable):
    content: Optional[StringComparison] = None
    image_id: Optional[ComparisonSearch] = None
    audio_id: Optional[ComparisonSearch] = None
    processed: Optional[BooleanSearch] = None
    transcription: Optional[StringComparison] = None