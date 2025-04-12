import json
import logging
from typing import List, Optional, TypeVar
import redis.asyncio as redis

from gtd_shared.core.settings import settings
from gtd_shared.core.queue.interface import QueueInterface

logger = logging.getLogger(__name__)

T = TypeVar('T')

class RedisQueue(QueueInterface[T]):
    """Redis implementation for queue operations."""

    def __init__(
        self,
        queue_name: str,
        host: Optional[str] = None,
        port: Optional[int] = None,
        db: Optional[int] = None,
        decode_responses: bool = False,
    ):
        """Initialize Redis queue client.

        If parameters are not provided, they'll be loaded from settings.
        """
        self.queue_name = queue_name
        self.host = host or settings.REDIS_HOST
        self.port = port or settings.REDIS_PORT
        self.db = db or settings.REDIS_DB
        self.decode_responses = decode_responses
        
        self.client = redis.Redis(
            host=self.host,
            port=self.port,
            db=self.db,
            decode_responses=self.decode_responses
        )

    async def check_connection(self) -> bool:
        """Check if Redis is connected."""
        try:
            return await self.client.ping()
        except Exception as e:
            logger.error(f"Failed to connect to Redis: {str(e)}")
            return False

    async def push(self, data: T) -> bool:
        """Push an item to the queue."""
        try:
            serialized_data = json.dumps(data) if not isinstance(data, bytes) else data
            await self.client.lpush(self.queue_name, serialized_data)
            return True
        except Exception as e:
            logger.error(f"Failed to push to queue {self.queue_name}: {str(e)}")
            return False

    async def pop(self, timeout: int = 0) -> Optional[T]:
        """Pop an item from the queue.
        
        Args:
            timeout: Time to wait for an item. 0 means block indefinitely.
        
        Returns:
            The popped item or None if timeout reached.
        """
        try:
            result = await self.client.brpop(self.queue_name, timeout=timeout)
            if result:
                _, data = result
                if self.decode_responses:
                    return json.loads(data) if not isinstance(data, bytes) else data
                return json.loads(data.decode('utf-8')) if isinstance(data, bytes) else data
            return None
        except Exception as e:
            logger.error(f"Failed to pop from queue {self.queue_name}: {str(e)}")
            return None

    async def peek(self, start: int = 0, end: int = 0) -> List[T]:
        """Peek at items in the queue without removing them.
        
        Args:
            start: Start index (0 is the rightmost/oldest item)
            end: End index (inclusive)
            
        Returns:
            List of items in the specified range
        """
        try:
            items = await self.client.lrange(self.queue_name, start, end)
            result = []
            for item in items:
                if self.decode_responses:
                    result.append(json.loads(item) if not isinstance(item, bytes) else item)
                else:
                    result.append(json.loads(item.decode('utf-8')) if isinstance(item, bytes) else item)
            return result
        except Exception as e:
            logger.error(f"Failed to peek queue {self.queue_name}: {str(e)}")
            return []

    async def length(self) -> int:
        """Get the current length of the queue."""
        try:
            return await self.client.llen(self.queue_name)
        except Exception as e:
            logger.error(f"Failed to get queue length for {self.queue_name}: {str(e)}")
            return 0

    async def clear(self) -> bool:
        """Clear all items from the queue."""
        try:
            await self.client.delete(self.queue_name)
            return True
        except Exception as e:
            logger.error(f"Failed to clear queue {self.queue_name}: {str(e)}")
            return False