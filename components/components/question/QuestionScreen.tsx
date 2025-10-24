import QuestionCard from '@/components/question/QuestionCard';
import QuestionFooter from '@/components/question/QuestionFooter';
import QuestionHeader from '@/components/question/QuestionHeader';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Category, Question } from '@/types';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type QuestionScreenProps = {
    questions: Question[];
    category: Category;
    onQuizComplete: (answers: number[], timeTaken: number) => void;
    onBackToDashboard: () => void;
};

export default function QuestionScreen({
    questions,
    category,
    onQuizComplete,
    onBackToDashboard
}: QuestionScreenProps) {
    const { isDark } = useTheme();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
        new Array(questions.length).fill(null)
    );
    const [timeRemaining, setTimeRemaining] = useState(25);
    const [quizStartTime] = useState(Date.now());

    const currentQuestion = questions[currentQuestionIndex];
    const hasSelectedAnswer = selectedAnswers[currentQuestionIndex] !== null;

    useEffect(() => {
        const handleNextQuestion = () => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setTimeRemaining(25);
            }
        };

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    handleNextQuestion();
                    return 25;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex, questions.length]);

    const handleAnswerSelect = (answerIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setSelectedAnswers(newAnswers);
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setTimeRemaining(25);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeRemaining(25);
        }
    };

    const handleSubmit = () => {
        const timeTakenMs = Date.now() - quizStartTime;
        const timeTaken = Math.floor(timeTakenMs / 1000);
        const finalAnswers = selectedAnswers.map(answer => answer ?? 0);
        onQuizComplete(finalAnswers, timeTaken);
    };

    if (!currentQuestion) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>No questions available</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <>
            <QuestionHeader
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                category={category}
                timeRemaining={timeRemaining}
                showTimer={true}
            />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                <QuestionCard
                    question={currentQuestion}
                    selectedAnswer={selectedAnswers[currentQuestionIndex] ?? undefined}
                    onAnswerSelect={handleAnswerSelect}
                />

                <QuestionFooter
                    currentQuestion={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                    hasSelectedAnswer={hasSelectedAnswer}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onSubmit={handleSubmit}
                />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    scrollView: {
        // flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: '#666',
    },
});
