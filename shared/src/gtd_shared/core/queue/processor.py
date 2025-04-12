import asyncio
import time
from typing import Callable, Type, TypeVar, Optional
from pydantic import BaseModel
from gtd_shared.core.logging import get_logger
from gtd_shared.core.queue.redis import RedisQueue

logger = get_logger()

T = TypeVar('T', bound=BaseModel)
U = TypeVar('U', bound=BaseModel)

class QueueProcessor:
    """Generic queue processor for services."""
    
    def __init__(
        self,
        input_queue_name: str,
        process_function: Callable[[T], U],
        request_model: Type[T],
        output_queue_name: Optional[str] = None,
    ):
        self.input_queue: RedisQueue = RedisQueue(queue_name=input_queue_name)
        self.output_queue: Optional[RedisQueue] = RedisQueue(queue_name=output_queue_name) if output_queue_name else None
        self.process_function = process_function
        self.request_model = request_model
        self.running = False
        self.task = None
    
    async def run(self):
        """Run the processor in an infinite loop."""
        logger.info(f"Starting service with input queue: {self.input_queue.queue_name}")
        self.running = True
        
        while self.running:
            try:
                logger.info(f"Waiting for job from {self.input_queue.queue_name}...")
                job_data = await self.input_queue.pop(timeout=0)
                request = self.request_model(**job_data)
                
                logger.info(f"Processing job: {request}")
                result = await self.process_function(request)
                
                if self.output_queue:
                    logger.info(f"Pushing result to {self.output_queue.queue_name}")
                    await self.output_queue.push(result.model_dump())
            except asyncio.CancelledError:
                logger.info(f"Queue processor for {self.input_queue.queue_name} was cancelled")
                self.running = False
                break
            except Exception as e:
                logger.error(f"Error in processing loop: {str(e)}")
                await asyncio.sleep(1)
                
    def start(self):
        """Start the processor in a background task."""
        if self.task is None or self.task.done():
            self.task = asyncio.create_task(self.run())
        return self.task
    
    async def stop(self):
        """Stop the processor gracefully."""
        if self.task and not self.task.done():
            self.running = False
            self.task.cancel()
            try:
                await self.task
            except asyncio.CancelledError:
                logger.info(f"Queue processor for {self.input_queue.queue_name} stopped")