import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type ErrorStateProps = {
    message?: string;
    onRetry?: () => void;
};

export default function ErrorState({
    message = "No questions available for this category.",
    onRetry
}: ErrorStateProps) {
    const { isDark } = useTheme();

    const handleBackToDashboard = () => {
        router.back();
    };

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
                <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                    Oops! 😅
                </NeoBrutalismText>

                <NeoBrutalismText variant="body" color="secondary" style={styles.message}>
                    {message}
                </NeoBrutalismText>

                <View style={styles.buttonContainer}>
                    {onRetry && (
                        <NeoBrutalismButton
                            title="Try Again"
                            onPress={onRetry}
                            variant="accent"
                            size="base"
                            style={styles.button}
                        />
                    )}
                    <NeoBrutalismButton
                        title="Back to Dashboard"
                        onPress={handleBackToDashboard}
                        variant="secondary"
                        size="base"
                        style={styles.button}
                    />
                </View>
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
        width: '100%',
        maxWidth: 400,
    },
    title: {
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    button: {
        flex: 1,
    },
});
