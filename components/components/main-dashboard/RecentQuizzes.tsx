import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { QuizResult } from '@/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type RecentQuizzesProps = {
    recentQuizzes: QuizResult[];
};

export default function RecentQuizzes({ recentQuizzes }: RecentQuizzesProps) {
    const { isDark } = useTheme();

    if (recentQuizzes.length === 0) {
        return (
            <View style={styles.container}>
                <NeoBrutalismText variant="subheading" color="primary" style={styles.title}>Recent Quizzes</NeoBrutalismText>
                <NeoBrutalismCard
                    variant="default"
                    padding="lg"
                    style={{
                        ...styles.container,
                        backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
                    }}
                >
                    <NeoBrutalismText variant="subheading" color="primary" style={styles.title}>
                        Recent Quizzes
                    </NeoBrutalismText>
                    <NeoBrutalismText variant="body" color="secondary" style={styles.emptyText}>
                        No quizzes taken yet. Start your first quiz!
                    </NeoBrutalismText>
                </NeoBrutalismCard>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <NeoBrutalismText variant="subheading" color="primary" style={styles.title}>Recent Quizzes</NeoBrutalismText>
            <NeoBrutalismCard
                variant="default"
                padding="lg"
                style={{
                    ...styles.container,
                    backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
                }}
            >
                <NeoBrutalismText variant="subheading" color="primary" style={styles.title}>
                    Recent Quizzes
                </NeoBrutalismText>

                <View style={styles.quizzesList}>
                    {recentQuizzes.slice(0, 3).map((quiz, index) => (
                        <View key={quiz.sessionId} style={styles.quizItem}>
                            <View style={styles.quizInfo}>
                                <NeoBrutalismText variant="body" color="primary" style={styles.categoryName}>
                                    {quiz.categoryBreakdown[0]?.category || 'General'}
                                </NeoBrutalismText>
                                <NeoBrutalismText variant="caption" color="secondary" style={styles.date}>
                                    {formatDate(quiz.createdAt)}
                                </NeoBrutalismText>
                            </View>

                            <View style={styles.scoreContainer}>
                                <NeoBrutalismCard
                                    variant={getScoreVariant(quiz.score, quiz.totalQuestions)}
                                    padding="sm"
                                    style={styles.scoreBadge}
                                >
                                    <NeoBrutalismText variant="caption" color="primary" style={styles.scoreText}>
                                        {quiz.score}/{quiz.totalQuestions}
                                    </NeoBrutalismText>
                                </NeoBrutalismCard>
                            </View>
                        </View>
                    ))}
                </View>
            </NeoBrutalismCard>
        </View>
    );
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
        return 'Just now';
    } else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    }
}

function getScoreVariant(score: number, total: number): 'default' | 'accent' | 'dark' {
    const percentage = (score / total) * 100;

    if (percentage >= 80) {
        return 'accent';
    } else if (percentage >= 60) {
        return 'default';
    } else {
        return 'dark';
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
    },
    title: {
        marginBottom: 16,
    },
    emptyText: {
        textAlign: 'center',
        fontStyle: 'italic',
    },
    quizzesList: {
        gap: 12,
    },
    quizItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    quizInfo: {
        flex: 1,
    },
    categoryName: {
        fontWeight: '600',
    },
    date: {
        marginTop: 2,
    },
    scoreContainer: {
        alignItems: 'flex-end',
    },
    scoreBadge: {
        minWidth: 50,
        alignItems: 'center',
    },
    scoreText: {
        fontWeight: 'bold',
    },
});
