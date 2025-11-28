/**
 * STORAGE - Gestión de almacenamiento local
 * Maneja datos en localStorage con métodos simples y seguros
 */

class StorageManager {
    constructor() {
        this.prefix = 'academyhub_';
    }

    /**
     * Guardar datos en localStorage
     */
    set(key, value) {
        try {
            const prefixedKey = this.prefix + key;
            const serialized = JSON.stringify(value);
            localStorage.setItem(prefixedKey, serialized);
            return true;
        } catch (error) {
            console.error('Error saving to storage:', error);
            return false;
        }
    }

    /**
     * Obtener datos de localStorage
     */
    get(key) {
        try {
            const prefixedKey = this.prefix + key;
            const item = localStorage.getItem(prefixedKey);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
        }
    }

    /**
     * Eliminar un elemento
     */
    remove(key) {
        try {
            const prefixedKey = this.prefix + key;
            localStorage.removeItem(prefixedKey);
            return true;
        } catch (error) {
            console.error('Error removing from storage:', error);
            return false;
        }
    }

    /**
     * Limpiar todo el almacenamiento
     */
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    }

    /**
     * Obtener todas las claves
     */
    keys() {
        const allKeys = Object.keys(localStorage);
        return allKeys.filter(key => key.startsWith(this.prefix));
    }

    /**
     * Verificar si existe una clave
     */
    has(key) {
        const prefixedKey = this.prefix + key;
        return localStorage.getItem(prefixedKey) !== null;
    }
}

// Instancia global
const storage = new StorageManager();
