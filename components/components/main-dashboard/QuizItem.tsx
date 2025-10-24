import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Category } from '@/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type QuizItemProps = {
    category: Category;
    onPress?: (category: Category) => void;
};

export default function QuizItem({ category, onPress }: QuizItemProps) {
    const { isDark } = useTheme();
    const iconName = getMaterialIconForCategory(category.id);

    return (
        <NeoBrutalismCard
            variant="default"
            padding="lg"
            style={{
                ...styles.card,
                backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
            }}
        >
            <TouchableOpacity
                style={styles.touchableCard}
                onPress={() => onPress?.(category)}
                activeOpacity={0.8}
            >
                <View style={[styles.iconBadge, { backgroundColor: category.color }]}>
                    <MaterialIcons name={iconName} size={24} color="#000" />
                </View>
                <NeoBrutalismText variant="body" color="primary" style={styles.name}>
                    {category.name}
                </NeoBrutalismText>
            </TouchableOpacity>
        </NeoBrutalismCard>
    );
}

function getMaterialIconForCategory(categoryId: string): React.ComponentProps<typeof MaterialIcons>['name'] {
    switch (categoryId) {
        case 'javascript':
            return 'code';
        case 'react':
            return 'bolt';
        case 'python':
            return 'memory';
        case 'web-development':
            return 'language';
        default:
            return 'category';
    }
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginRight: 12,
    },
    touchableCard: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    iconBadge: {
        width: 44,
        height: 44,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    name: {
        textAlign: 'center',
    },
});


