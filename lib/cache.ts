class SimpleCache {
  private cache = new Map<string, any>();
  private ttl = new Map<string, number>();

  set(key: string, value: any, ttlMs: number = 5 * 60 * 1000) {
    this.cache.set(key, value);
    this.ttl.set(key, Date.now() + ttlMs);
  }

  get(key: string) {
    const expiry = this.ttl.get(key);
    if (expiry && Date.now() > expiry) {
      this.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  delete(key: string) {
    this.cache.delete(key);
    this.ttl.delete(key);
  }

  clear() {
    this.cache.clear();
    this.ttl.clear();
  }
}

export const cache = new SimpleCache();