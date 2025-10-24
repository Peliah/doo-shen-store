import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Question } from '@/types';
import { getRandomWorker } from '@/utils';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type QuestionCardProps = {
    question: Question;
    selectedAnswer?: number;
    onAnswerSelect: (answerIndex: number) => void;
};

export default function QuestionCard({ question, selectedAnswer, onAnswerSelect }: QuestionCardProps) {
    const { isDark } = useTheme();

    return (
        <NeoBrutalismCard
            variant="default"
            padding="lg"
            style={{
                ...styles.container,
                backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
            }}
        >
            <View style={styles.imageContainer}>
                <Image source={getRandomWorker()} style={styles.image} />
                <NeoBrutalismText variant="subheading" color="primary" style={styles.questionText}>
                    {question.question}
                </NeoBrutalismText>
            </View>

            <View style={styles.optionsContainer}>
                {question.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onAnswerSelect(index)}
                        style={styles.optionWrapper}
                        activeOpacity={0.8}
                    >
                        <NeoBrutalismCard
                            variant={selectedAnswer === index ? 'accent' : 'default'}
                            padding="base"
                            style={{
                                ...styles.optionCard,
                                ...(selectedAnswer === index && styles.selectedOption),
                                backgroundColor: selectedAnswer === index
                                    ? (isDark ? Colors.dark.tint : Colors.light.tint)
                                    : (isDark ? Colors.dark.cardBackground : Colors.light.cardBackground)
                            }}
                        >
                            <View style={styles.optionContent}>
                                <View style={[
                                    styles.optionIndicator,
                                    {
                                        backgroundColor: selectedAnswer === index
                                            ? '#000'
                                            : (isDark ? Colors.dark.border : Colors.light.border)
                                    }
                                ]}>
                                    <NeoBrutalismText variant="caption" color="primary" style={styles.optionLetter}>
                                        {String.fromCharCode(65 + index)}
                                    </NeoBrutalismText>
                                </View>
                                <NeoBrutalismText
                                    variant="body"
                                    color="primary"
                                    style={{
                                        ...styles.optionText,
                                        ...(selectedAnswer === index && styles.selectedOptionText)
                                    }}
                                >
                                    {option}
                                </NeoBrutalismText>
                            </View>
                        </NeoBrutalismCard>
                    </TouchableOpacity>
                ))}
            </View>
        </NeoBrutalismCard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 16,
    },
    imageContainer: {
        width: '100%',
        // flexDirection: 'row',
        // alignItems: 'center',
        gap: 12,
    },
    questionText: {
        marginBottom: 16,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    codeContainer: {
        marginBottom: 20,
    },
    codeBlock: {
        borderRadius: 8,
    },
    codeText: {
        fontFamily: 'monospace',
        fontSize: 14,
        lineHeight: 20,
    },
    optionsContainer: {
        gap: 12,
    },
    optionWrapper: {
        width: '100%',
    },
    optionCard: {
        width: '100%',
    },
    selectedOption: {
        borderWidth: 2,
        borderColor: '#000',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    optionIndicator: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    optionLetter: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    optionText: {
        flex: 1,
        lineHeight: 20,
    },
    selectedOptionText: {
        fontWeight: 'bold',
    },
});
