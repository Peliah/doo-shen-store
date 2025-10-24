import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Product } from '@/utils/database';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface ProductImageSectionProps {
    product: Product;
}

export const ProductImageSection: React.FC<ProductImageSectionProps> = ({ product }) => {
    const { isDark } = useTheme();

    return (
        <View style={styles.imageSection}>
            <NeoBrutalismCard variant="default" padding="lg" style={styles.imageCard}>
                <View style={[styles.imageContainer, { backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground }]}>
                    {product.image_url ? (
                        <Image source={{ uri: product.image_url }} style={styles.productImage} />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Ionicons
                                name="cube-outline"
                                size={64}
                                color={isDark ? Colors.dark.text : Colors.light.text}
                            />
                            <NeoBrutalismText variant="body" color="secondary" style={styles.imageText}>
                                No Image
                            </NeoBrutalismText>
                        </View>
                    )}
                </View>
            </NeoBrutalismCard>
        </View>
    );
};

const styles = StyleSheet.create({
    imageSection: {
        marginBottom: 24,
    },
    imageCard: {
        alignItems: 'center',
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#ccc',
    },
    productImage: {
        width: 200,
        height: 200,
        borderRadius: 16,
    },
    imagePlaceholder: {
        alignItems: 'center',
    },
    imageText: {
        marginTop: 8,
        fontSize: 14,
    },
});
