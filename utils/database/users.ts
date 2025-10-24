import { getDatabase } from './index';

export interface User {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export const createUser = (name: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.runSync(
                'INSERT INTO users (name) VALUES (?)',
                [name.trim()]
            );

            resolve(result.lastInsertRowId);
        } catch (error) {
            reject(error);
        }
    });
};

export const getUserByName = (name: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM users WHERE name = ?', [name.trim()]);

            if (result.length > 0) {
                resolve(result[0] as User);
            } else {
                resolve(null);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const getUserById = (id: number): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM users WHERE id = ?', [id]);

            if (result.length > 0) {
                resolve(result[0] as User);
            } else {
                resolve(null);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            const result = db.getAllSync('SELECT * FROM users ORDER BY created_at DESC');
            resolve(result as User[]);
        } catch (error) {
            reject(error);
        }
    });
};

export const updateUser = (id: number, name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            db.runSync(
                'UPDATE users SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [name.trim(), id]
            );

            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteUser = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();

            db.runSync('DELETE FROM users WHERE id = ?', [id]);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export const findOrCreateUser = async (name: string): Promise<User> => {
    try {
        // First, try to find existing user
        const existingUser = await getUserByName(name);

        if (existingUser) {
            return existingUser;
        }

        // If user doesn't exist, create new one
        const userId = await createUser(name);
        const newUser = await getUserById(userId);

        if (!newUser) {
            throw new Error('Failed to create user');
        }

        return newUser;
    } catch (error) {
        throw error;
    }
};
