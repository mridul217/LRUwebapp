from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from lru_cache import LRUCache  # You'll need to implement this LRUCache class

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the cache
cache = LRUCache(max_size=1024)

class KeyValue(BaseModel):
    key: str
    value: str
    expiration: int

@app.get('/get')
def get(key: str):
    value = cache.get(key)
    if value is not None:
        return {'value': value}
    else:
        return {'message': 'Key not found'}, 404

@app.post('/set')
def set(key_value: KeyValue):
    cache.set(key_value.key, key_value.value, key_value.expiration)
    return {'message': 'Key/Value set successfully'}

@app.get('/getall')  # Add this new endpoint
def getall():
    all_keys = list(cache.cache.keys())
    all_values = [cache.get(key) for key in all_keys]
    print(all_keys," ",all_values)
    return {'keys': all_keys, 'values': all_values}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)

