import { Injectable } from '@nestjs/common';
import NodeCache from 'node-cache';

@Injectable()
export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  set<T>(key: string, value: T, ttl?: number): void {
    if (ttl !== undefined) {
      this.cache.set<T>(key, value, ttl);
    } else {
      this.cache.set<T>(key, value);
    }
  }

  del(key: string): void {
    this.cache.del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }
}
