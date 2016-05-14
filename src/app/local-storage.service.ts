import { Injectable, Optional } from '@angular/core'

/**
 * Wrapper around local storage API.
 */
@Injectable()
export class LocalStorageService {
    
    private namespace: string;
    
    constructor (@Optional() namespace: string) {
        
        this.namespace = namespace;
    }
    
    getNamespace (namespace: string) {
        
        return new LocalStorageService(namespace);
    }

    private _getKey (key) {
        
        if (!this.namespace) {
            return key;
        }
        
        return `${this.namespace}.${key}`;
    }
    
    get (key: string) {
        
        const realKey = this._getKey(key);
        return localStorage.getItem(realKey);
    }
    
   
    set (key: string, value: any) {
        
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        
        const realKey = this._getKey(key);
        localStorage.setItem(realKey, value);
    }
    
    remove (key: string) {
        
        const realKey = this._getKey(key);
        localStorage.removeItem(realKey);
    }
    
    has (key: string) {
        
        const value = this.get(key);
        return typeof value !== 'undefined' && value !== null;
    }
}