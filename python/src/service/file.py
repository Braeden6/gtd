from uuid import UUID
import uuid
from datetime import datetime
from pathlib import Path
from typing import BinaryIO, Optional
import logging

from src.core.storage.inteface import StorageInterface
from src.repository.inbox import InboxRepository

logger = logging.getLogger(__name__)


class FileService:
    """Service for handling file operations."""
    
    def __init__(self, storage: StorageInterface, inbox_repo: InboxRepository):
        """Initialize with storage implementation and inbox repository."""
        self.storage = storage
        self.inbox_repo = inbox_repo
    
    def _generate_file_path(self, user_id: UUID, file_type: str, 
                           filename: Optional[str] = None) -> str:
        """Generate a unique path for storing a file."""
        extension = ''
        if filename:
            extension = Path(filename).suffix
        
        timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
        file_id = uuid.uuid4()
        return f"{file_type}/{user_id}/{timestamp}_{file_id}{extension}"
    
    async def upload_inbox_audio(self, user_id: UUID, audio_data: BinaryIO, 
                               filename: Optional[str] = None) -> str:
        """Upload audio file for an inbox item."""
        file_path = self._generate_file_path(user_id, 'audio', filename)
        content_type = "audio/mpeg"
        
        return await self.storage.upload_file(
            audio_data, file_path, content_type=content_type
        )
    
    async def upload_inbox_image(self, user_id: UUID, image_data: BinaryIO, 
                               filename: Optional[str] = None) -> str:
        """Upload image file for an inbox item."""
        file_path = self._generate_file_path(user_id, 'image', filename)
        content_type = None
        if filename:
            ext = Path(filename).suffix.lower()
            if ext in ['.jpg', '.jpeg']:
                content_type = 'image/jpeg'
            elif ext == '.png':
                content_type = 'image/png'
            elif ext == '.gif':
                content_type = 'image/gif'
        
        return await self.storage.upload_file(
            image_data, file_path, content_type=content_type
        )