import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismInput, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import { findOrCreateUser, getStoresByUser } from '@/utils/database';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Animated, { FadeInUp, SlideInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const UsernameSetup = () => {
    const { isDark } = useTheme();
    const { setCurrentUser } = useUser();
    const [username, setUsername] = useState('');

    const handleContinue = async () => {
        if (!username.trim()) {
            Alert.alert('Error', 'Please enter a username');
            return;
        }

        try {
            // Find or create user
            const user = await findOrCreateUser(username.trim());

            // Store current user in context
            setCurrentUser(user);

            // Check if user has existing stores
            const existingStores = await getStoresByUser(user.id!);

            if (existingStores.length > 0) {
                // User has stores, go directly to main app
                router.replace('/(tabs)');
            } else {
                // User has no stores, go to store setup
                router.push('/(onboarding)/store-setup');
            }
        } catch (error) {
            console.error('Error handling user:', error);
            Alert.alert('Error', 'Failed to process username. Please try again.');
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <View style={styles.content}>
                <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
                    <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                        What&apos;s Your Name?
                    </NeoBrutalismText>
                    <NeoBrutalismText variant="body" color="secondary" style={styles.subtitle}>
                        Let&apos;s personalize your store management experience
                    </NeoBrutalismText>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(400)} style={styles.formContainer}>
                    <NeoBrutalismCard variant="default" padding="lg" style={styles.inputCard}>
                        <NeoBrutalismText variant="subheading" color="primary" style={styles.label}>
                            Store Manager Name
                        </NeoBrutalismText>
                        <NeoBrutalismInput
                            placeholder="Enter your name"
                            value={username}
                            onChangeText={setUsername}
                            style={styles.input}
                        />
                    </NeoBrutalismCard>
                </Animated.View>

                <Animated.View entering={SlideInRight.delay(600)} style={styles.buttonContainer}>
                    <NeoBrutalismButton
                        title="Continue"
                        onPress={handleContinue}
                        variant="primary"
                        size="lg"
                        fullWidth
                    />
                    <NeoBrutalismButton
                        title="Back"
                        onPress={handleBack}
                        variant="secondary"
                        size="sm"
                        fullWidth
                        style={styles.backButton}
                    />
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

export default UsernameSetup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    inputCard: {
        alignItems: 'center',
    },
    label: {
        marginBottom: 16,
    },
    input: {
        width: '100%',
    },
    buttonContainer: {
        gap: 12,
        marginBottom: 20,
    },
    backButton: {
        marginTop: 8,
    },
});