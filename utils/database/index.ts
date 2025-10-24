import * as SQLite from 'expo-sqlite';

// Database instance
let db: SQLite.SQLiteDatabase | null = null;

export const getDatabase = (): SQLite.SQLiteDatabase => {
    if (!db) {
        db = SQLite.openDatabaseSync('doo_shen_store.db');
    }
    return db;
};

export const initializeDatabase = async (): Promise<void> => {
    try {
        const database = getDatabase();

        // Create users table
        database.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Check if stores table exists and has user_id column
        const storesTableInfo = database.getAllSync("PRAGMA table_info(stores)");
        const hasUserIdColumn = storesTableInfo.some((column: any) => column.name === 'user_id');

        if (!hasUserIdColumn) {
            // Drop and recreate stores table with user_id
            database.execSync('DROP TABLE IF EXISTS stores;');
            database.execSync('DROP TABLE IF EXISTS products;');
            database.execSync('DROP TABLE IF EXISTS transactions;');
            database.execSync('DROP TABLE IF EXISTS categories;');
        }

        // Create stores table
        database.execSync(`
      CREATE TABLE IF NOT EXISTS stores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        location TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);

        // Create products table
        database.execSync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        store_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        sku TEXT UNIQUE,
        price REAL NOT NULL DEFAULT 0,
        cost REAL NOT NULL DEFAULT 0,
        quantity INTEGER NOT NULL DEFAULT 0,
        min_quantity INTEGER DEFAULT 0,
        category TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (store_id) REFERENCES stores (id) ON DELETE CASCADE
      );
    `);

        // Create transactions table
        database.execSync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('in', 'out', 'adjustment')),
        quantity INTEGER NOT NULL,
        price REAL,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
      );
    `);

        // Create categories table
        database.execSync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        store_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (store_id) REFERENCES stores (id) ON DELETE CASCADE,
        UNIQUE(store_id, name)
      );
    `);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
};

export const closeDatabase = (): void => {
    if (db) {
        db.closeSync();
        db = null;
    }
};