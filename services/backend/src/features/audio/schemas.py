from src.models.base import BaseUpdateSoftDeleteModel, BaseSearchable
from src.models.base.search import ComparisonSearch, StringComparison
from typing import Optional

class AudioUpdate(BaseUpdateSoftDeleteModel):
    audio_path: Optional[str] = None
    transcription: Optional[str] = None
    mimetype: Optional[str] = None
    
class SearchAudio(BaseSearchable):
    audio_path: Optional[ComparisonSearch] = None
    transcription: Optional[StringComparison] = None
    mimetype: Optional[StringComparison] = None