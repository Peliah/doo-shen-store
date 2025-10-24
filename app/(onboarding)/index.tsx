import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
    const { isDark } = useTheme();

    const handleGetStarted = () => {
        router.push('/(onboarding)/username-setup');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <View style={styles.content}>
                <Animated.View entering={FadeInRight.delay(200)} style={styles.header}>
                    <Text style={[styles.logo, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                        Doo Shen Trivia
                    </Text>
                    <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                        Test Your Tech Knowledge
                    </NeoBrutalismText>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(400)} style={styles.mainContent}>
                    <NeoBrutalismCard variant="default" padding="lg" style={styles.featureCard}>
                        <NeoBrutalismText variant="subheading" color="primary" style={styles.featureTitle}>
                            10 Questions
                        </NeoBrutalismText>
                        <NeoBrutalismText variant="body" color="secondary" style={styles.featureDescription}>
                            Quick, focused quizzes
                        </NeoBrutalismText>
                    </NeoBrutalismCard>

                    <NeoBrutalismCard variant="accent" padding="lg" style={styles.featureCard}>
                        <NeoBrutalismText variant="subheading" color="primary" style={styles.featureTitle}>
                            Instant Results
                        </NeoBrutalismText>
                        <NeoBrutalismText variant="body" color="primary" style={styles.featureDescription}>
                            Immediate feedback
                        </NeoBrutalismText>
                    </NeoBrutalismCard>
                </Animated.View>

                <Animated.View entering={SlideInRight.delay(600)} style={styles.buttonContainer}>
                    <NeoBrutalismButton
                        title="Get Started"
                        onPress={handleGetStarted}
                        variant="primary"
                        size="lg"
                        fullWidth
                    />
                </Animated.View>
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
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    title: {
        textAlign: 'center',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        gap: 24,
    },
    featureCard: {
        alignItems: 'center',
    },
    featureTitle: {
        marginBottom: 8,
    },
    featureDescription: {
        textAlign: 'center',
    },
    buttonContainer: {
        marginBottom: 20,
    },
});
