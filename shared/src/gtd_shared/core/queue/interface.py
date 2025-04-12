from abc import ABC, abstractmethod
from typing import Generic, List, Optional, TypeVar

T = TypeVar('T')

class QueueInterface(Generic[T], ABC):
    """Abstract interface for queue operations."""
    
    @abstractmethod
    async def check_connection(self) -> bool:
        """Check if the queue service is connected."""
        pass

    @abstractmethod
    async def push(self, data: T) -> bool:
        """Push an item to the queue."""
        pass

    @abstractmethod
    async def pop(self, timeout: int = 0) -> Optional[T]:
        """Pop an item from the queue.
        
        Args:
            timeout: Time to wait for an item. 0 means block indefinitely.
        
        Returns:
            The popped item or None if timeout reached.
        """
        pass

    @abstractmethod
    async def peek(self, start: int = 0, end: int = 0) -> List[T]:
        """Peek at items in the queue without removing them.
        
        Args:
            start: Start index
            end: End index (inclusive)
            
        Returns:
            List of items in the specified range
        """
        pass

    @abstractmethod
    async def length(self) -> int:
        """Get the current length of the queue."""
        pass

    @abstractmethod
    async def clear(self) -> bool:
        """Clear all items from the queue."""
        pass