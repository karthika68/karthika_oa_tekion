import type { Card } from "../type";

export const StorageAdapter = {
  load: (key:string) => {
    const store=localStorage.getItem(key)
    try { return store?JSON.parse(store) : null; }
    catch { return null; }
  },
  save: (key:string, value:Card[]) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { /* quota exceeded — fail silently */ }
  },
};