import { NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { User } from '@/types';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type HeaderProps = {
    user: User | null;
    points?: number;
    onMenuPress?: () => void;
};

export default function MainDashboardHeader({ user, points = 0, onMenuPress }: HeaderProps) {
    const { isDark } = useTheme();

    return (
        <NeoBrutalismCard
            variant="default"
            padding="base"
            style={{
                ...styles.container,
                backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground,
            }}
        >
            <View style={styles.leftSection}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={getAvatarImageSource(user?.avatar)}
                        style={styles.avatar}
                    />
                </View>
                <View>
                    <NeoBrutalismText variant="caption" color="secondary">
                        Welcome
                    </NeoBrutalismText>
                    <NeoBrutalismText variant="subheading" color="primary">
                        {user?.username || 'Player'}
                    </NeoBrutalismText>
                </View>
            </View>

            <View style={styles.rightSection}>
                <NeoBrutalismCard variant="accent" padding="sm" style={styles.pointsChip}>
                    <NeoBrutalismText variant="caption" color="primary">
                        {points} pts
                    </NeoBrutalismText>
                </NeoBrutalismCard>
                <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
                    <IconSymbol name="ellipsis.vertical" size={22} color={isDark ? Colors.dark.text : Colors.light.text} />
                </TouchableOpacity>
            </View>
        </NeoBrutalismCard>
    );
}

function getAvatarImageSource(avatarId?: string) {
    // Fallback to avatar1 if undefined
    switch (avatarId) {
        case 'avatar1':
            return require('@/assets/images/avatars/avatar1.png');
        case 'avatar2':
            return require('@/assets/images/avatars/avatar2.png');
        case 'avatar3':
            return require('@/assets/images/avatars/avatar3.png');
        case 'avatar4':
            return require('@/assets/images/avatars/avatar4.png');
        case 'avatar5':
            return require('@/assets/images/avatars/avatar5.png');
        case 'avatar6':
            return require('@/assets/images/avatars/avatar6.png');
        default:
            return require('@/assets/images/avatars/avatar1.png');
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarWrapper: {
        width: 44,
        height: 44,
        borderRadius: 8,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    pointsChip: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


