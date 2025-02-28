import os
import time
import uuid
from fastapi import FastAPI, Query
from pydantic import BaseModel
import io
import asyncpg
import aioboto3
import aiofiles
from botocore.client import Config

app = FastAPI()

# Configure async MinIO client
s3_session = aioboto3.Session(
    aws_access_key_id='minioadmin',
    aws_secret_access_key='minioadmin',
    region_name='us-east-1'
)

# Configure PostgreSQL connection pool
async def init_db():
    app.state.pool = await asyncpg.create_pool(
        host="postgres",
        database="gtd",
        user="postgres",
        password="postgres"
    )

@app.on_event("startup")
async def startup():
    await init_db()

@app.on_event("shutdown")
async def shutdown():
    await app.state.pool.close()

class BenchmarkResponse(BaseModel):
    status: str
    iterations: int
    prime_count: int
    cpu_time_ms: int
    io_time_ms: int
    total_time_ms: int
    io_details: dict

@app.get("/api/benchmark", response_model=BenchmarkResponse)
async def benchmark_operation(
    iterations: int = Query(100000, description="Number of calculation iterations"),
    io_type: str = Query("all", description="I/O operation type (file, minio, postgres, all)")
):
    start_time = time.time()
    
    # CPU-intensive operation - calculate prime numbers
    prime_count = 0
    for i in range(2, iterations):
        is_prime = True
        for j in range(2, int(i**0.5) + 1):
            if i % j == 0:
                is_prime = False
                break
        if is_prime:
            prime_count += 1
    
    cpu_time = (time.time() - start_time) * 1000  # Convert to milliseconds
    io_start_time = time.time()
    
    # I/O operations based on selected type
    io_results = {}
    
    # File I/O
    if io_type == "file" or io_type == "all":
        file_start = time.time()
        try:
            # Create a temporary file to simulate I/O
            temp_file_name = f"/tmp/benchmark-{uuid.uuid4()}.bin"
            data = os.urandom(1024 * 100)  # 100KB of data
            
            # Write asynchronously
            async with aiofiles.open(temp_file_name, 'wb') as temp_file:
                await temp_file.write(data)
            
            # Read it back asynchronously
            async with aiofiles.open(temp_file_name, 'rb') as f:
                await f.read()
            
            # Clean up
            os.unlink(temp_file_name)
            
            io_results["file_io_ms"] = int((time.time() - file_start) * 1000)
        except Exception as e:
            io_results["file_io_error"] = str(e)
            
    # MinIO I/O
    if io_type == "minio" or io_type == "all":
        minio_start = time.time()
        try:
            # Generate random data
            data = os.urandom(1024 * 100)  # 100KB of data
            
            # Upload to MinIO
            bucket_name = "benchmark"
            object_name = f"benchmark-{int(time.time() * 1000000)}.bin"
            
            async with s3_session.client(
                's3',
                endpoint_url='http://minio:9000',
                config=Config(signature_version='s3v4'),
            ) as s3_client:
                # Ensure bucket exists
                try:
                    await s3_client.head_bucket(Bucket=bucket_name)
                except:
                    await s3_client.create_bucket(Bucket=bucket_name)
                
                # Upload object
                await s3_client.put_object(
                    Bucket=bucket_name,
                    Key=object_name,
                    Body=io.BytesIO(data),
                    ContentLength=len(data),
                    ContentType="application/octet-stream"
                )
                
                # Download object
                await s3_client.get_object(Bucket=bucket_name, Key=object_name)
            
            io_results["minio_io_ms"] = int((time.time() - minio_start) * 1000)
            io_results["minio_object_path"] = f"{bucket_name}/{object_name}"
        except Exception as e:
            io_results["minio_error"] = str(e)
    
    # PostgreSQL I/O
    if io_type == "postgres" or io_type == "all":
        pg_start = time.time()
        try:
            # Get connection from pool
            async with app.state.pool.acquire() as conn:
                                # Create a benchmark record
                benchmark_id = str(uuid.uuid4())
                content = f"Benchmark test at {time.strftime('%Y-%m-%d %H:%M:%S')}"
                
                # Insert into database
                await conn.execute(
                    "INSERT INTO inbox_items (id, user_id, content, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())",
                    benchmark_id, "40c8bdda-fc65-41d9-a29b-f5e4d2407dad", content
                )
                
                # Read it back
                row = await conn.fetchrow("SELECT * FROM inbox_items WHERE id = $1", benchmark_id)
                
                # Delete it
                await conn.execute("DELETE FROM inbox_items WHERE id = $1", benchmark_id)
            
            io_results["postgres_io_ms"] = int((time.time() - pg_start) * 1000)
            io_results["postgres_operation"] = "create-read-delete"
        except Exception as e:
            io_results["postgres_error"] = str(e)
    
    io_time = (time.time() - io_start_time) * 1000
    total_time = (time.time() - start_time) * 1000
    
    return {
        "status": "success",
        "iterations": iterations,
        "prime_count": prime_count,
        "cpu_time_ms": int(cpu_time),
        "io_time_ms": int(io_time),
        "total_time_ms": int(total_time),
        "io_details": io_results
    }
                
                
@app.get("/health")
def health_check():
    return {"status": "healthy"} 