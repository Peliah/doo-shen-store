import { getDatabase } from './index';

export interface Category {
    id?: number;
    store_id: number;
    name: string;
    description?: string;
    created_at?: string;
}

export const createCategory = (category: Omit<Category, 'id' | 'created_at'>): Promise<number> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.runSync(
                'INSERT INTO categories (store_id, name, description) VALUES (?, ?, ?)',
                [category.store_id, category.name, category.description || null]
            );

            resolve(result.lastInsertRowId);
        } catch (error) {
            reject(error);
        }
    });
};

export const getCategoriesByStore = (storeId: number): Promise<Category[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM categories WHERE store_id = ? ORDER BY name ASC', [storeId]);
            resolve(result as Category[]);
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllCategories = (): Promise<Category[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM categories ORDER BY name ASC');
            resolve(result as Category[]);
        } catch (error) {
            reject(error);
        }
    });
};

export const updateCategory = (id: number, category: Partial<Category>): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const fields: string[] = [];
            const values: any[] = [];

            if (category.name !== undefined) {
                fields.push('name = ?');
                values.push(category.name);
            }
            if (category.description !== undefined) {
                fields.push('description = ?');
                values.push(category.description);
            }

            values.push(id);

            db.runSync(
                `UPDATE categories SET ${fields.join(', ')} WHERE id = ?`,
                values
            );

            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteCategory = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            db.runSync('DELETE FROM categories WHERE id = ?', [id]);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};