// Example usage of the database utilities
import { createProduct, createStore, getAllStores, getProductsByStore } from '@/utils/database';

// Example: Create a store (requires user_id)
const createExampleStore = async (userId: number) => {
    try {
        const storeId = await createStore({
            user_id: userId,
            name: 'My Electronics Store',
            type: 'Electronics',
            location: 'New York, NY'
        });
        console.log('Store created with ID:', storeId);
    } catch (error) {
        console.error('Error creating store:', error);
    }
};

// Example: Get all stores
const getStores = async () => {
    try {
        const stores = await getAllStores();
        console.log('All stores:', stores);
    } catch (error) {
        console.error('Error getting stores:', error);
    }
};

// Example: Create a product
const createExampleProduct = async (storeId: number) => {
    try {
        const productId = await createProduct({
            store_id: storeId,
            name: 'iPhone 15',
            description: 'Latest iPhone model',
            price: 999.99,
            quantity: 10,
            category: 'Smartphones'
        });
        console.log('Product created with ID:', productId);
    } catch (error) {
        console.error('Error creating product:', error);
    }
};

// Example: Get products by store
const getStoreProducts = async (storeId: number) => {
    try {
        const products = await getProductsByStore(storeId);
        console.log('Store products:', products);
    } catch (error) {
        console.error('Error getting products:', error);
    }
};
