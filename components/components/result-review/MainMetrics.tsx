import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getRandomWorker } from '@/utils/workerUtils';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type MainMetricsProps = {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeTaken: number;
    performanceLevel: string;
};

export default function MainMetrics({
    score,
    totalQuestions,
    correctAnswers,
    timeTaken,
    performanceLevel
}: MainMetricsProps) {
    const { isDark } = useTheme();
    const randomWorker = getRandomWorker();

    const getPerformanceMessage = (level: string): string => {
        switch (level) {
            case 'Excellent': return 'Outstanding work!';
            case 'Good': return 'Good job!';
            case 'Fair': return 'Not bad! Keep practicing!';
            case 'Needs Improvement': return 'Keep learning!';
            default: return 'Good job!';
        }
    };

    return (
        <NeoBrutalismCard
            variant="default"
            padding="lg"
            style={{
                ...styles.container,
                backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
            }}
        >
            <View style={styles.headerContainer}>
                <View style={styles.workerContainer}>
                    <Image source={randomWorker} style={styles.workerImage} />
                </View>
                <NeoBrutalismText variant="body" color="primary" style={styles.performanceText}>
                    {getPerformanceMessage(performanceLevel)}
                </NeoBrutalismText>
            </View>

            <View style={styles.metricsContainer}>
                <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                    Quiz Complete!
                </NeoBrutalismText>

                <NeoBrutalismCard variant="accent" padding="base" style={styles.scoreCard}>
                    <NeoBrutalismText variant="subheading" color="primary" style={styles.scoreText}>
                        Final Score: {correctAnswers}/{totalQuestions} ({score}%)
                    </NeoBrutalismText>
                </NeoBrutalismCard>

                <NeoBrutalismCard variant="default" padding="base" style={styles.timeCard}>
                    <NeoBrutalismText variant="body" color="primary" style={styles.timeText}>
                        ⏱️ Time Taken: {Math.floor(timeTaken / 60)}m {timeTaken % 60}s
                    </NeoBrutalismText>
                </NeoBrutalismCard>
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
    },
    workerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: 70,
        height: 70,
        overflow: 'hidden',
    },
    workerImage: {
        width: '100%',
        height: '100%',
    },
    metricsContainer: {
        alignItems: 'center',
        gap: 12,
        width: '100%',
    },
    title: {
        textAlign: 'center',
        marginBottom: 8,
    },
    scoreCard: {
        width: '100%',
        alignItems: 'center',
    },
    scoreText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    timeCard: {
        width: '100%',
        alignItems: 'center',
    },
    timeText: {
        textAlign: 'center',
    },
    performanceCard: {
        width: '100%',
        alignItems: 'center',
    },
    performanceText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
