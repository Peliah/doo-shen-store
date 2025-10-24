import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getRandomWorker } from '@/utils/workerUtils';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type ActionButtonsProps = {
    onDetailedReview: () => void;
    onPlayAgain: () => void;
    onBackToDashboard: () => void;
};

export default function ActionButtons({
    onDetailedReview,
    onPlayAgain,
    onBackToDashboard
}: ActionButtonsProps) {
    const { isDark } = useTheme();
    const randomWorker = getRandomWorker();

    return (
        <NeoBrutalismCard
            variant="default"
            padding="lg"
            style={{
                ...styles.container,
                backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
            }}
        >
            <View style={styles.workerContainer}>
                <Image source={randomWorker} style={styles.workerImage} />
            </View>

            <View style={styles.contentContainer}>
                <NeoBrutalismText variant="subheading" color="primary" style={styles.title}>
                    What&apos;s Next?
                </NeoBrutalismText>

                <View style={styles.buttonsContainer}>
                    <NeoBrutalismButton
                        title="See Detailed Review"
                        onPress={onDetailedReview}
                        variant="accent"
                        size="base"
                        style={styles.button}
                    />

                    <NeoBrutalismButton
                        title="Play Again"
                        onPress={onPlayAgain}
                        variant="primary"
                        size="base"
                        style={styles.button}
                    />

                    <NeoBrutalismButton
                        title="Back to Dashboard"
                        onPress={onBackToDashboard}
                        variant="secondary"
                        size="base"
                        style={styles.button}
                    />
                </View>
            </View>
        </NeoBrutalismCard>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20,
        marginBottom: 16,
    },
    workerContainer: {
        width: 100,
        height: 100,
        overflow: 'hidden',
    },
    workerImage: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        width: '100%',
        gap: 16,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonsContainer: {
        gap: 12,
    },
    button: {
        width: '100%',
    },
});
