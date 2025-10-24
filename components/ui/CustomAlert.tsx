import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AlertButton {
    text: string;
    onPress: () => void;
    style?: 'default' | 'cancel' | 'destructive';
}

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    buttons: AlertButton[];
    onClose: () => void;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
    visible,
    title,
    message,
    buttons,
    onClose,
}) => {
    const { isDark } = useTheme();

    const getButtonVariant = (style?: string) => {
        switch (style) {
            case 'destructive':
                return 'secondary';
            case 'cancel':
                return 'secondary';
            default:
                return 'primary';
        }
    };

    const getIconName = (style?: string) => {
        switch (style) {
            case 'destructive':
                return 'warning-outline';
            case 'cancel':
                return 'close-outline';
            default:
                return 'checkmark-outline';
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <SafeAreaView style={styles.container}>
                    <NeoBrutalismCard
                        variant="default"
                        padding="lg"
                        style={styles.alertCard}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                                {title}
                            </NeoBrutalismText>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Ionicons
                                    name="close"
                                    size={20}
                                    color={isDark ? Colors.dark.text : Colors.light.text}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Message */}
                        <NeoBrutalismText variant="body" color="secondary" style={styles.message}>
                            {message}
                        </NeoBrutalismText>

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            {buttons.map((button, index) => (
                                <NeoBrutalismButton
                                    key={index}
                                    title={button.text}
                                    onPress={() => {
                                        button.onPress();
                                        onClose();
                                    }}
                                    variant={getButtonVariant(button.style)}
                                    size="lg"
                                    style={styles.button}
                                />
                            ))}
                        </View>
                    </NeoBrutalismCard>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    container: {
        width: '100%',
        maxWidth: 400,
    },
    alertCard: {
        borderRadius: 12,
        borderWidth: 3,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        flex: 1,
    },
    closeButton: {
        padding: 4,
        marginLeft: 12,
    },
    message: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 24,
        textAlign: 'left',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        minHeight: 48,
    },
    singleButton: {
        flex: 1,
    },
    halfButton: {
        flex: 1,
    },
});
