export default {

    session: {
        set(key: string, value: string): void {
            sessionStorage.setItem(key, value);
        },

        get(key: string): string | null {
            return sessionStorage.getItem(key);
        },

        remove(key: string): void {
            sessionStorage.removeItem(key);
        },

        clear(): void {
            sessionStorage.clear();
        }
    },

    local: {
        set(key: string, value: string): void {
            localStorage.setItem(key, value);
        },

        get(key: string): string | null {
            return localStorage.getItem(key);
        },

        remove(key: string): void {
            localStorage.removeItem(key);
        },

        clear(): void {
            localStorage.clear();
        }
    },

    clearAll(): void {
        this.session.clear();
        this.local.clear();
    }

};
