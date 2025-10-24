// Database initialization and configuration
export { closeDatabase, getDatabase, initializeDatabase } from './database/index';

// User operations
export {
    createUser, deleteUser, findOrCreateUser, getAllUsers, getUserById, getUserByName, updateUser, type User
} from './database/users';

// Store operations
export {
    createStore, deleteStore, getAllStores, getStore, getStoresByUser, updateStore, type Store
} from './database/stores';

// Product operations
export {
    createProduct, deleteProduct, getAllProducts, getLowStockProducts, getProduct,
    getProductsByStore, updateProduct, type Product
} from './database/products';

// Transaction operations
export {
    createTransaction, getAllTransactions, getTransactionsByProduct, getTransactionsByStore,
    updateProductQuantity,
    type Transaction
} from './database/transactions';

// Category operations
export {
    createCategory, deleteCategory, getAllCategories, getCategoriesByStore, updateCategory, type Category
} from './database/categories';

