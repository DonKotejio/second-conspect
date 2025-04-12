class HashTable {
    constructor(size = 5) {
      this.size = size;
      this.buckets = Array.from({ length: size }, () => []);
    }
  
    _hash(key) {
      let hash = 0;
      for (let char of key) {
        hash += char.charCodeAt(0);
      }
      return hash % this.size;
    }
  
    set(key, value) {
      const index = this._hash(key);
      const bucket = this.buckets[index];
      for (let pair of bucket) {
        if (pair[0] === key) {
          pair[1] = value;
          return;
        }
      }
      bucket.push([key, value]);
    }
  
    get(key) {
      const index = this._hash(key);
      const bucket = this.buckets[index];
      for (let pair of bucket) {
        if (pair[0] === key) {
          return pair[1];
        }
      }
      return undefined;
    }
  
    has(key) {
      return this.get(key) !== undefined;
    }
  
    delete(key) {
      const index = this._hash(key);
      const bucket = this.buckets[index];
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          return true;
        }
      }
      return false;
    }
  }