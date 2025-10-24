import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Product } from '@/utils/database';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ProductGridProps {
    products: Product[];
    onProductPress: (product: Product) => void;
    onAddProduct: () => void;
    loading?: boolean;
}

interface ProductCardProps {
    product: Product;
    onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    const { isDark } = useTheme();

    const getStockStatus = (quantity: number) => {
        if (quantity === 0) return { status: 'out', color: '#ff4444', text: 'Out of Stock' };
        if (quantity <= 5) return { status: 'low', color: '#ffaa00', text: 'Low Stock' };
        return { status: 'good', color: '#44ff44', text: 'In Stock' };
    };

    const stockStatus = getStockStatus(product.quantity);

    const handlePress = () => {
        if (product.id) {
            router.push(`/(dashboard)/product?productId=${product.id}`);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
            <NeoBrutalismCard variant="default" padding="base" style={styles.card}>
                {/* Product Image Placeholder */}
                <View style={[styles.imageContainer, { backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground }]}>
                    {product.image_url ? (
                        <Ionicons name="image-outline" size={32} color={isDark ? Colors.dark.text : Colors.light.text} />
                    ) : (
                        <Ionicons name="cube-outline" size={32} color={isDark ? Colors.dark.text : Colors.light.text} />
                    )}
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                    <NeoBrutalismText variant="subheading" color="primary" style={styles.productName}>
                        {product.name}
                    </NeoBrutalismText>

                    <View style={styles.priceContainer}>
                        <NeoBrutalismText variant="body" color="primary" style={styles.price}>
                            ${product.price.toFixed(2)}
                        </NeoBrutalismText>
                        <NeoBrutalismText variant="body" color="secondary" style={styles.quantity}>
                            Qty: {product.quantity}
                        </NeoBrutalismText>
                    </View>

                    {/* Stock Status */}
                    <View style={[styles.stockStatus, { backgroundColor: stockStatus.color + '20' }]}>
                        <View style={[styles.stockIndicator, { backgroundColor: stockStatus.color }]} />
                        <NeoBrutalismText variant="body" color="primary" style={styles.stockText}>
                            {stockStatus.text} {stockStatus.color}
                        </NeoBrutalismText>
                    </View>
                </View>
            </NeoBrutalismCard>
        </TouchableOpacity>
    );
};

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    onProductPress,
    onAddProduct,
    loading = false,
}) => {
    const { isDark } = useTheme();

    const renderProduct = ({ item }: { item: Product }) => (
        <ProductCard product={item} onPress={() => onProductPress(item)} />
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <NeoBrutalismCard variant="accent" padding="lg" style={styles.emptyCard}>
                <Ionicons
                    name="cube-outline"
                    size={48}
                    color={isDark ? Colors.dark.text : Colors.light.text}
                    style={styles.emptyIcon}
                />
                <NeoBrutalismText variant="subheading" color="primary" style={styles.emptyTitle}>
                    No Products Yet
                </NeoBrutalismText>
                <NeoBrutalismText variant="body" color="secondary" style={styles.emptySubtitle}>
                    Add your first product to get started with inventory management
                </NeoBrutalismText>
            </NeoBrutalismCard>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <NeoBrutalismText variant="subheading" color="primary" style={styles.sectionTitle}>
                            Products
                        </NeoBrutalismText>
                        <TouchableOpacity onPress={onAddProduct} style={styles.addButton}>
                            <Ionicons
                                name="add-circle-outline"
                                size={24}
                                color={isDark ? Colors.dark.text : Colors.light.text}
                            />
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingTop: 8,
    },
    sectionTitle: {
        fontWeight: '600',
    },
    addButton: {
        padding: 4,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardContainer: {
        flex: 1,
        marginHorizontal: 4,
    },
    card: {
        height: 200,
    },
    imageContainer: {
        height: 80,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontWeight: '600',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    price: {
        fontWeight: '600',
        fontSize: 16,
    },
    quantity: {
        fontSize: 12,
    },
    stockStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    stockIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    stockText: {
        fontSize: 10,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
    },
    emptyCard: {
        alignItems: 'center',
        maxWidth: 280,
    },
    emptyIcon: {
        marginBottom: 16,
    },
    emptyTitle: {
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        textAlign: 'center',
        lineHeight: 20,
    },
});
