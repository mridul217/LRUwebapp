from collections import OrderedDict
import time

class LRUCache:
    def __init__(self, max_size):
        self.cache = OrderedDict()
        self.max_size = max_size
        self.expiration_times = {}

    def get(self, key):
        if key in self.cache:
            # Check if the key is expired
            if self._is_expired(key):
                del self.cache[key]
                return None
            # Move the accessed item to the end
            self.cache.move_to_end(key)
            return self.cache[key]
        return None

    def set(self, key, value, expiration):
        current_time = time.time()
        self.expiration_times[key] = current_time + expiration

        if len(self.cache) >= self.max_size:
            # Remove the first item (least recently used)
            self._remove_expired_items()
            if len(self.cache) >= self.max_size:
                self.cache.popitem(last=False)

        # Add the new item to the end
        self.cache[key] = value
        self.cache.move_to_end(key)

    def _is_expired(self, key):
        current_time = time.time()
        return key in self.expiration_times and current_time > self.expiration_times[key]

    def _remove_expired_items(self):
        current_time = time.time()
        keys_to_remove = [key for key in self.cache if self._is_expired(key)]
        for key in keys_to_remove:
            del self.cache[key]
            del self.expiration_times[key]
