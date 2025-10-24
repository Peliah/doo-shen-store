import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismText } from '@/components/neo-brutalism';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { Colors } from '@/constants/theme';
import { useAlert } from '@/contexts/AlertContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import { AppStorage } from '@/utils/storage/app';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { isDark } = useTheme();
    const { showAlert } = useAlert();
    const { currentUser } = useUser();

    const handleClearState = () => {
        showAlert(
            'Clear App State',
            'This will reset all app data including user profile, quiz history, and settings. You will need to go through onboarding again. Are you sure?',
            [
                { text: 'Cancel', style: 'cancel', onPress: () => { } },
                {
                    text: 'Clear All Data',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AppStorage.setFirstLaunch(true);
                            await AppStorage.clearAllData();
                            router.replace('/(onboarding)' as any);
                        } catch (error) {
                            console.error('Error clearing app state:', error);
                            showAlert('Error', 'Failed to clear app data. Please try again.', [
                                { text: 'OK', onPress: () => { } }
                            ]);
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <NeoBrutalismText variant="heading" color="primary" style={styles.headerTitle}>
                        Profile
                    </NeoBrutalismText>
                    <ThemeToggleButton size={28} style={styles.themeToggle} />
                </View>

                {/* User Info Section */}
                <View style={styles.section}>
                    <NeoBrutalismCard variant="default" padding="lg" style={styles.userCard}>
                        <View style={styles.userInfo}>
                            <View style={[styles.avatarContainer, { backgroundColor: isDark ? Colors.dark.cardBackground : Colors.light.cardBackground }]}>
                                <Ionicons
                                    name="person"
                                    size={40}
                                    color={isDark ? Colors.dark.text : Colors.light.text}
                                />
                            </View>
                            <View style={styles.userDetails}>
                                <NeoBrutalismText variant="heading" color="primary" style={styles.userName}>
                                    {currentUser?.name || 'Store Manager'}
                                </NeoBrutalismText>
                                <NeoBrutalismText variant="body" color="secondary" style={styles.userRole}>
                                    Store Manager
                                </NeoBrutalismText>
                                {currentUser?.created_at && (
                                    <NeoBrutalismText variant="body" color="secondary" style={styles.joinDate}>
                                        Joined {new Date(currentUser.created_at).toLocaleDateString()}
                                    </NeoBrutalismText>
                                )}
                            </View>
                        </View>
                    </NeoBrutalismCard>
                </View>

                {/* App Information Section */}
                <View style={styles.section}>
                    <NeoBrutalismText variant="subheading" color="primary" style={styles.sectionTitle}>
                        App Information
                    </NeoBrutalismText>

                    <NeoBrutalismCard variant="accent" padding="lg" style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Ionicons
                                    name="storefront"
                                    size={20}
                                    color={isDark ? Colors.dark.text : Colors.light.text}
                                />
                                <NeoBrutalismText variant="body" color="primary" style={styles.infoLabel}>
                                    App Name
                                </NeoBrutalismText>
                            </View>
                            <NeoBrutalismText variant="body" color="secondary" style={styles.infoValue}>
                                Doo-Shen-Store
                            </NeoBrutalismText>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Ionicons
                                    name="cube"
                                    size={20}
                                    color={isDark ? Colors.dark.text : Colors.light.text}
                                />
                                <NeoBrutalismText variant="body" color="primary" style={styles.infoLabel}>
                                    Version
                                </NeoBrutalismText>
                            </View>
                            <NeoBrutalismText variant="body" color="secondary" style={styles.infoValue}>
                                1.0.0
                            </NeoBrutalismText>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Ionicons
                                    name="build"
                                    size={20}
                                    color={isDark ? Colors.dark.text : Colors.light.text}
                                />
                                <NeoBrutalismText variant="body" color="primary" style={styles.infoLabel}>
                                    Platform
                                </NeoBrutalismText>
                            </View>
                            <NeoBrutalismText variant="body" color="secondary" style={styles.infoValue}>
                                React Native
                            </NeoBrutalismText>
                        </View>
                    </NeoBrutalismCard>
                </View>

                {/* Settings Section */}
                <View style={styles.section}>
                    <NeoBrutalismText variant="subheading" color="primary" style={styles.sectionTitle}>
                        Settings
                    </NeoBrutalismText>

                    <NeoBrutalismCard variant="default" padding="lg" style={styles.settingsCard}>
                        <View style={styles.settingRow}>
                            <View style={styles.settingInfo}>
                                <Ionicons
                                    name="color-palette"
                                    size={20}
                                    color={isDark ? Colors.dark.text : Colors.light.text}
                                />
                                <View style={styles.settingText}>
                                    <NeoBrutalismText variant="body" color="primary" style={styles.settingTitle}>
                                        Theme
                                    </NeoBrutalismText>
                                    <NeoBrutalismText variant="body" color="secondary" style={styles.settingDescription}>
                                        {isDark ? 'Dark Mode' : 'Light Mode'}
                                    </NeoBrutalismText>
                                </View>
                            </View>
                            <ThemeToggleButton size={24} />
                        </View>
                    </NeoBrutalismCard>
                </View>

                {/* Danger Zone */}
                <View style={styles.section}>
                    <NeoBrutalismText variant="subheading" color="primary" style={styles.sectionTitle}>
                        Danger Zone
                    </NeoBrutalismText>

                    <NeoBrutalismCard variant="accent" padding="lg" style={styles.dangerCard}>
                        <View style={styles.dangerInfo}>
                            <Ionicons
                                name="warning"
                                size={20}
                                color="#ff4444"
                            />
                            <View style={styles.dangerText}>
                                <NeoBrutalismText variant="body" color="primary" style={styles.dangerTitle}>
                                    Reset App Data
                                </NeoBrutalismText>
                                <NeoBrutalismText variant="body" color="secondary" style={styles.dangerDescription}>
                                    This will delete all your data and reset the app to its initial state
                                </NeoBrutalismText>
                            </View>
                        </View>
                        <NeoBrutalismButton
                            title="Reset App"
                            onPress={handleClearState}
                            variant="danger"
                            size="base"
                            style={styles.resetButton}
                        />
                    </NeoBrutalismCard>
                </View>

                {/* Footer Spacing */}
                <View style={styles.footer} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 10,
    },
    headerTitle: {
        fontWeight: '700',
        fontSize: 28,
    },
    themeToggle: {
        padding: 8,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    userCard: {
        marginBottom: 8,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#000',
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontWeight: '700',
        marginBottom: 4,
    },
    userRole: {
        fontWeight: '500',
        marginBottom: 4,
    },
    joinDate: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    infoCard: {
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    infoLabel: {
        marginLeft: 12,
        fontWeight: '500',
    },
    infoValue: {
        fontWeight: '400',
    },
    settingsCard: {
        marginBottom: 8,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingText: {
        marginLeft: 12,
        flex: 1,
    },
    settingTitle: {
        fontWeight: '500',
        marginBottom: 2,
    },
    settingDescription: {
        fontSize: 14,
    },
    dangerCard: {
        marginBottom: 8,
    },
    dangerInfo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    dangerText: {
        marginLeft: 12,
        flex: 1,
    },
    dangerTitle: {
        fontWeight: '600',
        marginBottom: 4,
        color: '#ff4444',
    },
    dangerDescription: {
        fontSize: 14,
        lineHeight: 20,
    },
    resetButton: {
        alignSelf: 'flex-start',
    },
    footer: {
        height: 40,
    },
});
