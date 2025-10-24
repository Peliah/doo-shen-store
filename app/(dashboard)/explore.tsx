import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
    const { isDark } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <View style={styles.content}>
                <NeoBrutalismCard variant="default" padding="xl" style={styles.card}>
                    <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                        Explore Categories
                    </NeoBrutalismText>
                    <NeoBrutalismText variant="body" color="secondary" style={styles.subtitle}>
                        Choose your tech interests and start quizzing!
                    </NeoBrutalismText>
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
});
