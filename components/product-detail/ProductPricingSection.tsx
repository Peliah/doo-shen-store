import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Product } from '@/utils/database';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProductPricingSectionProps {
    product: Product;
}

export const ProductPricingSection: React.FC<ProductPricingSectionProps> = ({ product }) => {
    const getStockStatus = (quantity: number) => {
        if (quantity === 0) return { status: 'out', color: '#ff4444', text: 'Out of Stock' };
        if (quantity <= 5) return { status: 'low', color: '#ffaa00', text: 'Low Stock' };
        return { status: 'good', color: '#44ff44', text: 'In Stock' };
    };

    const stockStatus = getStockStatus(product.quantity);

    return (
        <View style={styles.pricingSection}>
            <NeoBrutalismCard variant="accent" padding="lg" style={styles.pricingCard}>
                <NeoBrutalismText variant="subheading" color="primary" style={styles.sectionTitle}>
                    Pricing & Inventory
                </NeoBrutalismText>

                <View style={styles.priceRow}>
                    <View style={styles.priceItem}>
                        <NeoBrutalismText variant="body" color="secondary" style={styles.priceLabel}>
                            Price
                        </NeoBrutalismText>
                        <NeoBrutalismText variant="heading" color="primary" style={styles.priceValue}>
                            ${product.price.toFixed(2)}
                        </NeoBrutalismText>
                    </View>

                    <View style={styles.priceItem}>
                        <NeoBrutalismText variant="body" color="secondary" style={styles.priceLabel}>
                            Quantity
                        </NeoBrutalismText>
                        <NeoBrutalismText variant="heading" color="primary" style={styles.priceValue}>
                            {product.quantity}
                        </NeoBrutalismText>
                    </View>
                </View>

                {/* Stock Status */}
                <View style={[styles.stockStatus, { backgroundColor: stockStatus.color + '20' }]}>
                    <View style={[styles.stockIndicator, { backgroundColor: stockStatus.color }]} />
                    <NeoBrutalismText variant="body" color="primary" style={styles.stockText}>
                        {stockStatus.text}
                    </NeoBrutalismText>
                </View>
            </NeoBrutalismCard>
        </View>
    );
};

const styles = StyleSheet.create({
    pricingSection: {
        marginBottom: 24,
    },
    pricingCard: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 16,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    priceItem: {
        alignItems: 'center',
        flex: 1,
    },
    priceLabel: {
        marginBottom: 4,
    },
    priceValue: {
        fontWeight: '700',
        fontSize: 24,
    },
    stockStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    stockIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    stockText: {
        fontWeight: '600',
    },
});
