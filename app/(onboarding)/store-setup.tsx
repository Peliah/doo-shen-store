import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismInput, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import { createStore } from '@/utils/database';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInUp, SlideInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const StoreSetup = () => {
    const { isDark } = useTheme();
    const { currentUser } = useUser();
    const [storeName, setStoreName] = useState('');
    const [storeType, setStoreType] = useState('');
    const [location, setLocation] = useState('');

    const handleComplete = async () => {
        if (!storeName.trim() || !storeType.trim() || !location.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (!currentUser) {
            Alert.alert('Error', 'User not found. Please go back and enter your name.');
            return;
        }

        try {
            // Save store to database with user association
            await createStore({
                user_id: currentUser.id!,
                name: storeName.trim(),
                type: storeType.trim(),
                location: location.trim()
            });

            // Navigate to main app after successful store creation
            router.replace('/(tabs)');
        } catch (error) {
            console.error('Error creating store:', error);
            Alert.alert('Error', 'Failed to create store. Please try again.');
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
                        <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                            Store Information
                        </NeoBrutalismText>
                        <NeoBrutalismText variant="body" color="secondary" style={styles.subtitle}>
                            Tell us about your store to get started with inventory management
                        </NeoBrutalismText>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(400)} style={styles.formContainer}>
                        <NeoBrutalismCard variant="default" padding="lg" style={styles.inputCard}>
                            <NeoBrutalismText variant="subheading" color="primary" style={styles.label}>
                                Store Name
                            </NeoBrutalismText>
                            <NeoBrutalismInput
                                placeholder="e.g., My Electronics Store"
                                value={storeName}
                                onChangeText={setStoreName}
                                style={styles.input}
                            />
                        </NeoBrutalismCard>

                        <NeoBrutalismCard variant="accent" padding="lg" style={styles.inputCard}>
                            <NeoBrutalismText variant="subheading" color="primary" style={styles.label}>
                                Store Type
                            </NeoBrutalismText>
                            <NeoBrutalismInput
                                placeholder="e.g., Electronics, Clothing, Grocery"
                                value={storeType}
                                onChangeText={setStoreType}
                                style={styles.input}
                            />
                        </NeoBrutalismCard>

                        <NeoBrutalismCard variant="default" padding="lg" style={styles.inputCard}>
                            <NeoBrutalismText variant="subheading" color="primary" style={styles.label}>
                                Location
                            </NeoBrutalismText>
                            <NeoBrutalismInput
                                placeholder="e.g., New York, NY"
                                value={location}
                                onChangeText={setLocation}
                                style={styles.input}
                            />
                        </NeoBrutalismCard>
                    </Animated.View>

                    <Animated.View entering={SlideInRight.delay(600)} style={styles.buttonContainer}>
                        <NeoBrutalismButton
                            title="Complete Setup"
                            onPress={handleComplete}
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default StoreSetup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        minHeight: '100%',
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
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
        gap: 20,
        marginBottom: 40,
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