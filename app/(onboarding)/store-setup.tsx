import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismInput, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import { createStore } from '@/utils/database';
import { Ionicons } from '@expo/vector-icons';
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
                        <View style={styles.titleContainer}>
                            <Ionicons
                                name="storefront"
                                size={32}
                                color={isDark ? Colors.dark.text : Colors.light.text}
                                style={styles.titleIcon}
                            />
                            <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                                Create Your Store
                            </NeoBrutalismText>
                        </View>
                        <NeoBrutalismText variant="body" color="secondary" style={styles.subtitle}>
                            Set up your store details to start managing your inventory
                        </NeoBrutalismText>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(400)} style={styles.formContainer}>
                        <View style={styles.formSection}>
                            <NeoBrutalismText variant="subheading" color="primary" style={styles.sectionTitle}>
                                Store Details
                            </NeoBrutalismText>

                            <NeoBrutalismCard variant="default" padding="lg" style={styles.inputCard}>
                                <View style={styles.inputHeader}>
                                    <View style={styles.labelContainer}>
                                        <Ionicons
                                            name="create-outline"
                                            size={20}
                                            color={isDark ? Colors.dark.text : Colors.light.text}
                                        />
                                        <NeoBrutalismText variant="body" color="primary" style={styles.inputLabel}>
                                            Store Name
                                        </NeoBrutalismText>
                                    </View>
                                </View>
                                <NeoBrutalismInput
                                    placeholder="Enter your store name"
                                    value={storeName}
                                    onChangeText={setStoreName}
                                    style={styles.input}
                                />
                            </NeoBrutalismCard>

                            <NeoBrutalismCard variant="accent" padding="lg" style={styles.inputCard}>
                                <View style={styles.inputHeader}>
                                    <View style={styles.labelContainer}>
                                        <Ionicons
                                            name="pricetag-outline"
                                            size={20}
                                            color={isDark ? Colors.dark.text : Colors.light.text}
                                        />
                                        <NeoBrutalismText variant="body" color="primary" style={styles.inputLabel}>
                                            Store Type
                                        </NeoBrutalismText>
                                    </View>
                                </View>
                                <NeoBrutalismInput
                                    placeholder="e.g., Electronics, Clothing, Grocery"
                                    value={storeType}
                                    onChangeText={setStoreType}
                                    style={styles.input}
                                />
                            </NeoBrutalismCard>

                            <NeoBrutalismCard variant="default" padding="lg" style={styles.inputCard}>
                                <View style={styles.inputHeader}>
                                    <View style={styles.labelContainer}>
                                        <Ionicons
                                            name="location-outline"
                                            size={20}
                                            color={isDark ? Colors.dark.text : Colors.light.text}
                                        />
                                        <NeoBrutalismText variant="body" color="primary" style={styles.inputLabel}>
                                            Location
                                        </NeoBrutalismText>
                                    </View>
                                </View>
                                <NeoBrutalismInput
                                    placeholder="e.g., New York, NY"
                                    value={location}
                                    onChangeText={setLocation}
                                    style={styles.input}
                                />
                            </NeoBrutalismCard>
                        </View>

                        <View style={styles.infoSection}>
                            <NeoBrutalismCard variant="accent" padding="base" style={styles.infoCard}>
                                <View style={styles.infoContainer}>
                                    <Ionicons
                                        name="information-circle-outline"
                                        size={20}
                                        color={isDark ? Colors.dark.text : Colors.light.text}
                                    />
                                    <NeoBrutalismText variant="body" color="primary" style={styles.infoText}>
                                        You can always edit these details later in your store settings
                                    </NeoBrutalismText>
                                </View>
                            </NeoBrutalismCard>
                        </View>
                    </Animated.View>

                    <Animated.View entering={SlideInRight.delay(600)} style={styles.buttonContainer}>
                        <NeoBrutalismButton
                            title="Create Store"
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
        paddingHorizontal: 20,
        paddingVertical: 20,
        minHeight: '100%',
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    titleIcon: {
        marginRight: 12,
    },
    title: {
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    formContainer: {
        flex: 1,
        marginBottom: 30,
    },
    formSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    inputCard: {
        marginBottom: 16,
    },
    inputHeader: {
        marginBottom: 12,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputLabel: {
        fontWeight: '600',
        marginLeft: 8,
    },
    input: {
        width: '100%',
    },
    infoSection: {
        marginTop: 8,
    },
    infoCard: {
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginLeft: 8,
    },
    buttonContainer: {
        gap: 12,
        marginBottom: 20,
    },
    backButton: {
        marginTop: 8,
    },
});