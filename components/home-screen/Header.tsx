import { NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface HeaderProps {
    onMenuPress?: () => void;
    onNotificationPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuPress, onNotificationPress }) => {
    const { isDark } = useTheme();
    const { currentUser } = useUser();

    return (
        <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <View style={styles.content}>
                <View style={styles.leftSection}>
                    <NeoBrutalismText variant="heading" color="primary" style={styles.title}>
                        Doo-Shen-Store
                    </NeoBrutalismText>
                    {currentUser && (
                        <NeoBrutalismText variant="body" color="secondary" style={styles.subtitle}>
                            Welcome back, {currentUser.name}
                        </NeoBrutalismText>
                    )}
                </View>

                <View style={styles.rightSection}>
                    <Ionicons
                        name="search-outline"
                        size={24}
                        color={isDark ? Colors.dark.text : Colors.light.text}
                        style={styles.icon}
                        onPress={onMenuPress}
                    />
                    <Ionicons
                        name="notifications-outline"
                        size={24}
                        color={isDark ? Colors.dark.text : Colors.light.text}
                        style={styles.icon}
                        onPress={onNotificationPress}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 16,
        paddingHorizontal: 20,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    leftSection: {
        flex: 1,
    },
    title: {
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    icon: {
        padding: 4,
    },
});
