import { getDatabase } from './index';

export interface Transaction {
    id?: number;
    product_id: number;
    type: 'in' | 'out' | 'adjustment';
    quantity: number;
    price?: number;
    notes?: string;
    created_at?: string;
}

export const createTransaction = (transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<number> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.runSync(
                'INSERT INTO transactions (product_id, type, quantity, price, notes) VALUES (?, ?, ?, ?, ?)',
                [
                    transaction.product_id,
                    transaction.type,
                    transaction.quantity,
                    transaction.price || null,
                    transaction.notes || null
                ]
            );

            resolve(result.lastInsertRowId);
        } catch (error) {
            reject(error);
        }
    });
};

export const getTransactionsByProduct = (productId: number): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM transactions WHERE product_id = ? ORDER BY created_at DESC', [productId]);
            resolve(result as Transaction[]);
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllTransactions = (): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM transactions ORDER BY created_at DESC');
            resolve(result as Transaction[]);
        } catch (error) {
            reject(error);
        }
    });
};

export const getTransactionsByStore = (storeId: number): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync(
                `SELECT t.* FROM transactions t 
         JOIN products p ON t.product_id = p.id 
         WHERE p.store_id = ? 
         ORDER BY t.created_at DESC`,
                [storeId]
            );

            resolve(result as Transaction[]);
        } catch (error) {
            reject(error);
        }
    });
};

export const updateProductQuantity = (productId: number, quantityChange: number, type: 'in' | 'out' | 'adjustment'): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            // Get current quantity
            const currentResult = db.getAllSync('SELECT quantity FROM products WHERE id = ?', [productId]);

            if (currentResult.length === 0) {
                reject(new Error('Product not found'));
                return;
            }

            const currentQuantity = (currentResult[0] as { quantity: number }).quantity as number;
            let newQuantity = currentQuantity;

            // Calculate new quantity based on transaction type
            if (type === 'in') {
                newQuantity = currentQuantity + quantityChange;
            } else if (type === 'out') {
                newQuantity = currentQuantity - quantityChange;
            } else if (type === 'adjustment') {
                newQuantity = quantityChange;
            }

            // Update product quantity
            db.runSync(
                'UPDATE products SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [newQuantity, productId]
            );

            // Create transaction record
            db.runSync(
                'INSERT INTO transactions (product_id, type, quantity, notes) VALUES (?, ?, ?, ?)',
                [productId, type, quantityChange, `Quantity ${type}: ${currentQuantity} → ${newQuantity}`]
            );

            resolve();
        } catch (error) {
            reject(error);
        }
    });
};