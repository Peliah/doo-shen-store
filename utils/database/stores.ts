import { getDatabase } from './index';

export interface Store {
    id?: number;
    user_id: number;
    name: string;
    type: string;
    location: string;
    created_at?: string;
    updated_at?: string;
}

export const createStore = (store: Omit<Store, 'id' | 'created_at' | 'updated_at'>): Promise<number> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.runSync(
                'INSERT INTO stores (user_id, name, type, location) VALUES (?, ?, ?, ?)',
                [store.user_id, store.name, store.type, store.location]
            );

            resolve(result.lastInsertRowId);
        } catch (error) {
            reject(error);
        }
    });
};

export const getStore = (id: number): Promise<Store | null> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM stores WHERE id = ?', [id]);

            if (result.length > 0) {
                resolve(result[0] as Store);
            } else {
                resolve(null);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const getStoresByUser = (userId: number): Promise<Store[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM stores WHERE user_id = ? ORDER BY created_at DESC', [userId]);
            resolve(result as Store[]);
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllStores = (): Promise<Store[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM stores ORDER BY created_at DESC');
            resolve(result as Store[]);
        } catch (error) {
            reject(error);
        }
    });
};

export const updateStore = (id: number, store: Partial<Store>): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const fields: string[] = [];
            const values: any[] = [];

            if (store.name !== undefined) {
                fields.push('name = ?');
                values.push(store.name);
            }
            if (store.type !== undefined) {
                fields.push('type = ?');
                values.push(store.type);
            }
            if (store.location !== undefined) {
                fields.push('location = ?');
                values.push(store.location);
            }

            fields.push('updated_at = CURRENT_TIMESTAMP');
            values.push(id);

            db.runSync(
                `UPDATE stores SET ${fields.join(', ')} WHERE id = ?`,
                values
            );

            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteStore = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            db.runSync('DELETE FROM stores WHERE id = ?', [id]);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};