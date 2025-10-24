import { NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const ProductDetailHeader: React.FC = () => {
    const { isDark } = useTheme();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={isDark ? Colors.dark.text : Colors.light.text}
                />
            </TouchableOpacity>
            <NeoBrutalismText variant="heading" color="primary" style={styles.headerTitle}>
                Product Details
            </NeoBrutalismText>
            <View style={styles.placeholder} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        marginBottom: 20,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontWeight: '600',
    },
    placeholder: {
        width: 40,
    },
});
