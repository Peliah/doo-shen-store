import { NeoBrutalismButton } from '@/components/neo-brutalism';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type QuestionFooterProps = {
    currentQuestion: number;
    totalQuestions: number;
    hasSelectedAnswer: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
};

export default function QuestionFooter({
    currentQuestion,
    totalQuestions,
    hasSelectedAnswer,
    onPrevious,
    onNext,
    onSubmit
}: QuestionFooterProps) {
    const isFirstQuestion = currentQuestion === 1;
    const isLastQuestion = currentQuestion === totalQuestions;

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {/* Previous Button */}
                <NeoBrutalismButton
                    title="Previous"
                    onPress={onPrevious}
                    variant="secondary"
                    size="base"
                    disabled={isFirstQuestion}
                    style={styles.previousButton}
                />

                {/* Next/Submit Button */}
                <NeoBrutalismButton
                    title={isLastQuestion ? "Submit" : "Next"}
                    onPress={isLastQuestion ? onSubmit : onNext}
                    variant="accent"
                    size="base"
                    disabled={!hasSelectedAnswer}
                    style={styles.nextButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
    },
    previousButton: {
        flex: 1,
    },
    nextButton: {
        flex: 1,
    },
});
