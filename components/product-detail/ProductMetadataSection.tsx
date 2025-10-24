import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Product } from '@/utils/database';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProductMetadataSectionProps {
    product: Product;
}

export const ProductMetadataSection: React.FC<ProductMetadataSectionProps> = ({ product }) => {
    const { isDark } = useTheme();

    return (
        <View style={styles.metadataSection}>
            <NeoBrutalismCard variant="default" padding="lg" style={styles.metadataCard}>
                <NeoBrutalismText variant="subheading" color="primary" style={styles.sectionTitle}>
                    Product Information
                </NeoBrutalismText>

                <View style={styles.metadataRow}>
                    <Ionicons
                        name="calendar-outline"
                        size={16}
                        color={isDark ? Colors.dark.text : Colors.light.text}
                    />
                    <NeoBrutalismText variant="body" color="secondary" style={styles.metadataText}>
                        Created: {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'Unknown'}
                    </NeoBrutalismText>
                </View>

                {product.updated_at && (
                    <View style={styles.metadataRow}>
                        <Ionicons
                            name="refresh-outline"
                            size={16}
                            color={isDark ? Colors.dark.text : Colors.light.text}
                        />
                        <NeoBrutalismText variant="body" color="secondary" style={styles.metadataText}>
                            Updated: {new Date(product.updated_at).toLocaleDateString()}
                        </NeoBrutalismText>
                    </View>
                )}
            </NeoBrutalismCard>
        </View>
    );
};

const styles = StyleSheet.create({
    metadataSection: {
        marginBottom: 24,
    },
    metadataCard: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 16,
    },
    metadataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    metadataText: {
        fontSize: 14,
    },
});
