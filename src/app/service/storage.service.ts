import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = localStorage;

  constructor() { }

  read(key: string): any {
    try {
      const value = this.storage.getItem(key);
      return (value) ? JSON.parse(atob(value)) : null;
    } catch {
      return null;
    }
  }

  save(key: string, value: any, base64: boolean = false): void {
    this.storage.setItem(key, (base64) ? value : btoa(JSON.stringify(value)));
  }

  destroy(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
