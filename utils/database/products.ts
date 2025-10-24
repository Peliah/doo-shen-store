import { getDatabase } from './index';

export interface Product {
    id?: number;
    store_id: number;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    category?: string;
    image_url?: string;
    created_at?: string;
    updated_at?: string;
}

export const createProduct = (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<number> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.runSync(
                `INSERT INTO products (store_id, name, description, price, quantity, category, image_url) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    product.store_id,
                    product.name,
                    product.description || null,
                    product.price,
                    product.quantity,
                    product.category || null,
                    product.image_url || null
                ]
            );

            resolve(result.lastInsertRowId);
        } catch (error) {
            reject(error);
        }
    });
};

export const getProduct = (id: number): Promise<Product | null> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM products WHERE id = ?', [id]);

            if (result.length > 0) {
                resolve(result[0] as Product);
            } else {
                resolve(null);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const getProductsByStore = (storeId: number): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM products WHERE store_id = ? ORDER BY name ASC', [storeId]);
            resolve(result as Product[]);
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllProducts = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM products ORDER BY name ASC');
            resolve(result as Product[]);
        } catch (error) {
            reject(error);
        }
    });
};

export const updateProduct = (id: number, product: Partial<Product>): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const fields: string[] = [];
            const values: any[] = [];

            if (product.name !== undefined) {
                fields.push('name = ?');
                values.push(product.name);
            }
            if (product.description !== undefined) {
                fields.push('description = ?');
                values.push(product.description);
            }
            if (product.price !== undefined) {
                fields.push('price = ?');
                values.push(product.price);
            }
            if (product.quantity !== undefined) {
                fields.push('quantity = ?');
                values.push(product.quantity);
            }
            if (product.category !== undefined) {
                fields.push('category = ?');
                values.push(product.category);
            }
            if (product.image_url !== undefined) {
                fields.push('image_url = ?');
                values.push(product.image_url);
            }

            fields.push('updated_at = CURRENT_TIMESTAMP');
            values.push(id);

            db.runSync(
                `UPDATE products SET ${fields.join(', ')} WHERE id = ?`,
                values
            );

            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteProduct = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            db.runSync('DELETE FROM products WHERE id = ?', [id]);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export const getLowStockProducts = (storeId?: number): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const query = storeId
                ? 'SELECT * FROM products WHERE store_id = ? AND quantity <= min_quantity ORDER BY quantity ASC'
                : 'SELECT * FROM products WHERE quantity <= min_quantity ORDER BY quantity ASC';

            const params = storeId ? [storeId] : [];

            const result = db.getAllSync(query, params);
            resolve(result as Product[]);
        } catch (error) {
            reject(error);
        }
    });
};