import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type LoadingStateProps = {
    message?: string;
};

export default function LoadingState({ message = "Loading questions..." }: LoadingStateProps) {
    const { isDark } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <NeoBrutalismCard
                variant="default"
                padding="xl"
                style={{
                    ...styles.card,
                    backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
                }}
            >
                <ActivityIndicator
                    size="large"
                    color={isDark ? Colors.dark.tint : Colors.light.tint}
                    style={styles.spinner}
                />
                <NeoBrutalismText variant="body" color="secondary" style={styles.message}>
                    {message}
                </NeoBrutalismText>
            </NeoBrutalismCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    card: {
        alignItems: 'center',
        gap: 16,
    },
    spinner: {
        marginBottom: 8,
    },
    message: {
        textAlign: 'center',
    },
});
