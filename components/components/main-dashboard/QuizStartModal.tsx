import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Category } from '@/types';
import { getRandomWorker } from '@/utils/workerUtils';
import { Image } from 'expo-image';
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

type QuizStartModalProps = {
    visible: boolean;
    category: Category | null;
    onClose: () => void;
    onStartQuiz: () => void;
};

export default function QuizStartModal({ visible, category, onClose, onStartQuiz }: QuizStartModalProps) {
    const { isDark } = useTheme();

    if (!category) return null;

    const randomWorker = getRandomWorker();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <NeoBrutalismCard
                    variant="default"
                    padding="xl"
                    style={{
                        ...styles.modal,
                        backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
                    }}
                >
                    {/* Worker Image */}
                    <View style={styles.workerContainer}>
                        <Image source={randomWorker} style={styles.workerImage} />
                    </View>

                    {/* Category Info */}
                    <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                        You selected {category.name}!
                    </NeoBrutalismText>

                    <NeoBrutalismText variant="body" color="secondary" style={styles.description}>
                        {category.description}
                    </NeoBrutalismText>

                    {/* Timeout Info */}
                    <NeoBrutalismCard variant="accent" padding="lg" style={styles.timeoutCard}>
                        <NeoBrutalismText variant="subheading" color="primary" style={styles.timeoutTitle}>
                            ⏱️ Time Limit
                        </NeoBrutalismText>
                        <NeoBrutalismText variant="body" color="primary" style={styles.timeoutText}>
                            25 seconds per question
                        </NeoBrutalismText>
                        <NeoBrutalismText variant="caption" color="secondary" style={styles.timeoutSubtext}>
                            Think fast and choose wisely!
                        </NeoBrutalismText>
                    </NeoBrutalismCard>

                    {/* Action Buttons */}
                    <View style={styles.buttonContainer}>
                        <NeoBrutalismButton
                            title="Cancel"
                            onPress={onClose}
                            variant="secondary"
                            size="base"
                            style={styles.cancelButton}
                        />
                        <NeoBrutalismButton
                            title="Begin"
                            onPress={onStartQuiz}
                            variant="accent"
                            size="base"
                            style={styles.startButton}
                        />
                    </View>
                </NeoBrutalismCard>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modal: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        gap: 20,
    },
    workerContainer: {
        width: 150,
        height: 150,
        overflow: 'hidden',
    },
    workerImage: {
        width: '100%',
        height: '100%',
    },
    title: {
        textAlign: 'center',
        marginBottom: 8,
    },
    description: {
        textAlign: 'center',
        lineHeight: 20,
    },
    timeoutCard: {
        width: '100%',
        alignItems: 'center',
        gap: 8,
    },
    timeoutTitle: {
        textAlign: 'center',
    },
    timeoutText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    timeoutSubtext: {
        textAlign: 'center',
        fontStyle: 'italic',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    cancelButton: {
        flex: 1,
    },
    startButton: {
        flex: 1,
    },
});
