// In-memory cache implementation with LRU eviction strategy

import { CacheEntry, CacheOptions } from './types';

class LRUCache<T> {
  private cache: Map<string, CacheEntry<T>>;
  private readonly maxSize: number;
  private readonly expiryMs: number;

  constructor(options: CacheOptions) {
    this.cache = new Map();
    this.maxSize = options.maxSize;
    this.expiryMs = options.expiryMs;
  }

  /**
   * Get item from cache
   * Returns null if not found or expired
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.data;
  }

  /**
   * Set item in cache
   * Implements LRU eviction when cache is full
   */
  set(key: string, data: T): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    // Add new entry
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + this.expiryMs,
    };

    this.cache.set(key, entry);
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; maxSize: number; expiryMs: number } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      expiryMs: this.expiryMs,
    };
  }
}

// Create singleton cache instance
// 50 entries max, 6 hours expiry (21600000 ms)
export const apodCache = new LRUCache<any>({
  maxSize: 50,
  expiryMs: 6 * 60 * 60 * 1000, // 6 hours
});

export default LRUCache;

