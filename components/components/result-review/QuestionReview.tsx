import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { QuestionResult } from '@/types';
import { getRandomWorker } from '@/utils/workerUtils';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionCard from './QuestionCard';

type QuestionReviewProps = {
    questions: QuestionResult[];
};

export default function QuestionReview({ questions }: QuestionReviewProps) {
    const { isDark } = useTheme();
    const randomWorker = getRandomWorker();
    const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

    const toggleExpanded = (index: number) => {
        const newExpanded = new Set(expandedQuestions);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedQuestions(newExpanded);
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
            <View style={styles.workerContainer}>
                <Image source={randomWorker} style={styles.workerImage} />
            </View>

            <View style={styles.contentContainer}>
                <NeoBrutalismText variant="subheading" color="primary" style={styles.title}>
                    Question Review
                </NeoBrutalismText>

                <View style={styles.questionsContainer}>
                    {questions.map((questionResult, index) => (
                        <QuestionCard
                            key={index}
                            questionResult={questionResult}
                            index={index}
                            isExpanded={expandedQuestions.has(index)}
                            onToggleExpanded={toggleExpanded}
                        />
                    ))}
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
    questionsContainer: {
        gap: 12,
    },
});
