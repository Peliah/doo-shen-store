import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Product } from '@/utils/database';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProductInfoSectionProps {
    product: Product;
}

export const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ product }) => {
    const { isDark } = useTheme();

    return (
        <View style={styles.infoSection}>
            <NeoBrutalismCard variant="default" padding="lg" style={styles.infoCard}>
                <NeoBrutalismText variant="heading" color="primary" style={styles.productName}>
                    {product.name}
                </NeoBrutalismText>

                {product.description && (
                    <NeoBrutalismText variant="body" color="secondary" style={styles.description}>
                        {product.description}
                    </NeoBrutalismText>
                )}

                {product.category && (
                    <View style={styles.categoryContainer}>
                        <Ionicons
                            name="pricetag-outline"
                            size={16}
                            color={isDark ? Colors.dark.text : Colors.light.text}
                        />
                        <NeoBrutalismText variant="body" color="primary" style={styles.category}>
                            {product.category}
                        </NeoBrutalismText>
                    </View>
                )}
            </NeoBrutalismCard>
        </View>
    );
};

const styles = StyleSheet.create({
    infoSection: {
        marginBottom: 24,
    },
    infoCard: {
        marginBottom: 12,
    },
    productName: {
        fontWeight: '700',
        marginBottom: 12,
    },
    description: {
        lineHeight: 20,
        marginBottom: 12,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    category: {
        fontWeight: '600',
    },
});
