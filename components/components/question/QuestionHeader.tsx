import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Category } from '@/types';
import { formatTime } from '@/utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type QuestionHeaderProps = {
    currentQuestion: number;
    totalQuestions: number;
    category: Category;
    timeRemaining?: number;
    showTimer?: boolean;
};

export default function QuestionHeader({
    currentQuestion,
    totalQuestions,
    category,
    timeRemaining = 25,
    showTimer = true
}: QuestionHeaderProps) {
    const { isDark } = useTheme();


    const getProgressColor = (): string => {
        const progress = currentQuestion / totalQuestions;
        if (progress >= 0.8) return '#4CAF50';
        if (progress >= 0.6) return '#FF9800';
        return '#F44336';
    };

    return (
        <NeoBrutalismCard
            variant="default"
            padding="base"
            style={{
                ...styles.container,
                backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
            }}
        >
            <View style={styles.topRow}>
                <View style={styles.progressContainer}>
                    <NeoBrutalismText variant="subheading" color="primary" style={styles.progressText}>
                        {currentQuestion}/{totalQuestions}
                    </NeoBrutalismText>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${(currentQuestion / totalQuestions) * 100}%`,
                                    backgroundColor: getProgressColor()
                                }
                            ]}
                        />
                    </View>
                </View>

                {showTimer && (
                    <NeoBrutalismCard
                        variant={timeRemaining <= 5 ? 'dark' : 'accent'}
                        padding="sm"
                        style={styles.timerCard}
                    >
                        <NeoBrutalismText variant="caption" color="primary" style={styles.timerText}>
                            ⏱️ {formatTime(timeRemaining)}
                        </NeoBrutalismText>
                    </NeoBrutalismCard>
                )}
            </View>

            {/* Category Badge */}
            <View style={styles.categoryContainer}>
                <NeoBrutalismCard
                    variant="accent"
                    padding="sm"
                    style={{
                        ...styles.categoryBadge,
                        backgroundColor: category.color,
                    }}
                >
                    <NeoBrutalismText variant="caption" color="primary" style={styles.categoryText}>
                        {category.name}
                    </NeoBrutalismText>
                </NeoBrutalismCard>
            </View>
        </NeoBrutalismCard>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressContainer: {
        flex: 1,
        marginRight: 16,
    },
    progressText: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    timerCard: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 60,
    },
    timerText: {
        fontWeight: 'bold',
    },
    categoryContainer: {
        alignItems: 'flex-start',
    },
    categoryBadge: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});
