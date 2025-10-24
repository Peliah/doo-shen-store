import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { AppStorage } from '@/utils/storage/app';
import { router } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { isDark } = useTheme();

    const handleClearState = () => {
        Alert.alert(
            'Clear App State',
            'This will reset all app data including user profile, quiz history, and settings. You will need to go through onboarding again. Are you sure?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All Data',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AppStorage.setFirstLaunch(true);
                            await AppStorage.clearAllData();
                            router.replace('/(onboarding)' as any);
                        } catch (error) {
                            console.error('Error clearing app state:', error);
                            Alert.alert('Error', 'Failed to clear app data. Please try again.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <View style={styles.content}>
                <NeoBrutalismCard variant="default" padding="xl" style={styles.card}>
                    <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                        Your Profile
                    </NeoBrutalismText>
                    <NeoBrutalismText variant="body" color="secondary" style={styles.subtitle}>
                        View your stats, achievements, and progress!
                    </NeoBrutalismText>
                </NeoBrutalismCard>

                <NeoBrutalismCard variant="accent" padding="lg" style={styles.actionCard}>
                    <NeoBrutalismText variant="subheading" color="primary" style={styles.actionTitle}>
                        App Settings
                    </NeoBrutalismText>
                    <NeoBrutalismText variant="body" color="secondary" style={styles.actionDescription}>
                        Reset the app to its initial state
                    </NeoBrutalismText>
                    <NeoBrutalismButton
                        title="Clear App State"
                        onPress={handleClearState}
                        variant="danger"
                        size="base"
                        fullWidth
                        style={styles.clearButton}
                    />
                </NeoBrutalismCard>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    card: {
        alignItems: 'center',
        maxWidth: 300,
    },
    title: {
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
    },
    actionCard: {
        alignItems: 'center',
        maxWidth: 300,
    },
    actionTitle: {
        marginBottom: 8,
        textAlign: 'center',
    },
    actionDescription: {
        marginBottom: 16,
        textAlign: 'center',
    },
    clearButton: {
        marginTop: 8,
    },
});
