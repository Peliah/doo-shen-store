import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import { getAllProducts, Product } from '@/utils/database';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateProductModal } from './CreateProductModal';
import { Header } from './Header';
import { ProductGrid } from './ProductGrid';
import { UtilsSection } from './UtilsSection';

export const HomeScreen: React.FC = () => {
    const { isDark } = useTheme();
    const { currentUser } = useUser();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            if (currentUser) {
                // For now, get all products. Later we can filter by user's stores
                const allProducts = await getAllProducts();
                setProducts(allProducts);
                setFilteredProducts(allProducts);
            }
        } catch (error) {
            console.error('Error loading products:', error);
            Alert.alert('Error', 'Failed to load products');
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    // Load products on component mount
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // Filter products based on search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleFilterPress = () => {
        Alert.alert('Filter', 'Filter options coming soon!');
    };

    const handleSortPress = () => {
        Alert.alert('Sort', 'Sort options coming soon!');
    };

    const handleProductPress = (product: Product) => {
        // Navigation is now handled directly in ProductCard
        // This function is kept for compatibility but not used
    };

    const handleAddProduct = () => {
        setShowCreateModal(true);
    };

    const handleProductCreated = () => {
        loadProducts(); // Reload products after creation
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
    };

    const handleMenuPress = () => {
        Alert.alert('Menu', 'Menu options coming soon!');
    };

    const handleNotificationPress = () => {
        Alert.alert('Notifications', 'No new notifications');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <View style={styles.content}>
                {/* Header Section */}
                <Header
                    onMenuPress={handleMenuPress}
                    onNotificationPress={handleNotificationPress}
                />

                {/* Utils Section */}
                <UtilsSection
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onFilterPress={handleFilterPress}
                    onSortPress={handleSortPress}
                />

                {/* Product Grid Section */}
                <ProductGrid
                    products={filteredProducts}
                    onProductPress={handleProductPress}
                    onAddProduct={handleAddProduct}
                    loading={loading}
                />
            </View>

            {/* Create Product Modal */}
            <CreateProductModal
                visible={showCreateModal}
                onClose={handleCloseModal}
                onProductCreated={handleProductCreated}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});
