import { NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ProductActionSectionProps {
    onEdit: () => void;
    onDelete: () => void;
}

export const ProductActionSection: React.FC<ProductActionSectionProps> = ({ onEdit, onDelete }) => {
    const { isDark } = useTheme();

    return (
        <View style={styles.actionSection}>
            <View style={styles.actionRow}>
                <TouchableOpacity
                    onPress={onEdit}
                    style={[
                        styles.actionButton,
                        styles.editButton,
                        { backgroundColor: isDark ? Colors.dark.primary : Colors.light.primary }
                    ]}
                >
                    <Ionicons
                        name="create-outline"
                        size={20}
                        color={isDark ? Colors.dark.text : Colors.light.text}
                        style={styles.buttonIcon}
                    />
                    <NeoBrutalismText variant="body" color="primary" style={styles.buttonText}>
                        Edit Product
                    </NeoBrutalismText>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onDelete}
                    style={[
                        styles.actionButton,
                        styles.deleteButton,
                        { backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground }
                    ]}
                >
                    <Ionicons
                        name="trash-outline"
                        size={20}
                        color={isDark ? Colors.dark.text : Colors.light.text}
                        style={styles.buttonIcon}
                    />
                    <NeoBrutalismText variant="body" color="primary" style={styles.buttonText}>
                        Delete
                    </NeoBrutalismText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    actionSection: {
        marginBottom: 40,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#000',
        gap: 8,
    },
    editButton: {
        // Primary button styling
    },
    deleteButton: {
        // Secondary button styling
    },
    buttonIcon: {
        // Icon styling
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 16,
    },
});