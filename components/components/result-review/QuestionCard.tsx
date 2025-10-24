import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { QuestionResult } from '@/types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type QuestionCardProps = {
    questionResult: QuestionResult;
    index: number;
    isExpanded: boolean;
    onToggleExpanded: (index: number) => void;
};

export default function QuestionCard({
    questionResult,
    index,
    isExpanded,
    onToggleExpanded
}: QuestionCardProps) {
    const { isDark } = useTheme();

    const getAnswerLetter = (answerIndex: number): string => {
        return String.fromCharCode(65 + answerIndex);
    };

    const getUserAnswerIndex = (question: QuestionResult): number => {
        return question.question.options.findIndex(option => option === question.userAnswer);
    };

    const correctAnswerIndex = questionResult.question.correctAnswer;
    const userAnswerIndex = getUserAnswerIndex(questionResult);

    return (
        <NeoBrutalismCard
            variant="default"
            padding="base"
            style={{
                ...styles.questionCard,
                backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
            }}
        >
            <TouchableOpacity
                onPress={() => onToggleExpanded(index)}
                style={styles.questionHeader}
                activeOpacity={0.8}
            >
                <View style={styles.questionInfo}>
                    <NeoBrutalismText variant="body" color="primary" style={styles.questionNumber}>
                        Question {index + 1}
                    </NeoBrutalismText>
                    <View style={styles.answerStatus}>
                        <NeoBrutalismText
                            variant="caption"
                            color={questionResult.isCorrect ? "primary" : "secondary"}
                            style={{
                                ...styles.statusText,
                                color: questionResult.isCorrect ? '#4CAF50' : '#F44336'
                            }}
                        >
                            {questionResult.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                        </NeoBrutalismText>
                    </View>
                </View>
                <IconSymbol
                    name={isExpanded ? 'chevron.up' : 'chevron.down'}
                    size={20}
                    color={isDark ? Colors.dark.text : Colors.light.text}
                />
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.expandedContent}>
                    <NeoBrutalismText variant="body" color="primary" style={styles.questionText}>
                        {questionResult.question.question}
                    </NeoBrutalismText>

                    <View style={styles.answerComparison}>
                        <View style={styles.answerRow}>
                            <NeoBrutalismText variant="caption" color="secondary" style={styles.answerLabel}>
                                Your answer:
                            </NeoBrutalismText>
                            <NeoBrutalismText
                                variant="body"
                                color="primary"
                                style={{
                                    ...styles.answerText,
                                    color: questionResult.isCorrect ? '#4CAF50' : '#F44336'
                                }}
                            >
                                {getAnswerLetter(userAnswerIndex)}. {questionResult.userAnswer}
                            </NeoBrutalismText>
                        </View>

                        <View style={styles.answerRow}>
                            <NeoBrutalismText variant="caption" color="secondary" style={styles.answerLabel}>
                                Correct answer:
                            </NeoBrutalismText>
                            <NeoBrutalismText variant="body" color="primary" style={styles.correctAnswerText}>
                                {getAnswerLetter(correctAnswerIndex)}. {questionResult.question.options[correctAnswerIndex]}
                            </NeoBrutalismText>
                        </View>
                    </View>

                    <NeoBrutalismCard variant="accent" padding="sm" style={styles.explanationCard}>
                        <NeoBrutalismText variant="caption" color="primary" style={styles.explanationLabel}>
                            Explanation:
                        </NeoBrutalismText>
                        <NeoBrutalismText variant="body" color="primary" style={styles.explanationText}>
                            {questionResult.explanation}
                        </NeoBrutalismText>
                    </NeoBrutalismCard>

                    {questionResult.referenceLink && (
                        <NeoBrutalismCard variant="default" padding="sm" style={styles.referenceCard}>
                            <NeoBrutalismText variant="caption" color="secondary" style={styles.referenceLabel}>
                                Reference:
                            </NeoBrutalismText>
                            <NeoBrutalismText variant="body" color="primary" style={styles.referenceText}>
                                {questionResult.referenceLink}
                            </NeoBrutalismText>
                        </NeoBrutalismCard>
                    )}
                </View>
            )}
        </NeoBrutalismCard>
    );
}

const styles = StyleSheet.create({
    questionCard: {
        width: '100%',
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionNumber: {
        fontWeight: 'bold',
    },
    answerStatus: {
        alignItems: 'center',
    },
    statusText: {
        fontWeight: 'bold',
    },
    expandedContent: {
        marginTop: 12,
        gap: 12,
    },
    questionText: {
        lineHeight: 20,
        fontWeight: '500',
    },
    codeBlock: {
        borderRadius: 8,
    },
    codeText: {
        fontFamily: 'monospace',
        fontSize: 14,
        lineHeight: 18,
    },
    answerComparison: {
        gap: 8,
    },
    answerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    answerLabel: {
        fontWeight: 'bold',
    },
    answerText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
    },
    correctAnswerText: {
        fontWeight: 'bold',
        color: '#4CAF50',
        flex: 1,
        textAlign: 'right',
    },
    explanationCard: {
        width: '100%',
    },
    explanationLabel: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    explanationText: {
        lineHeight: 18,
    },
    referenceCard: {
        width: '100%',
    },
    referenceLabel: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    referenceText: {
        lineHeight: 18,
        fontStyle: 'italic',
    },
});
