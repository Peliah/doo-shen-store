import { NeoBrutalismButton, NeoBrutalismCard, NeoBrutalismInput, NeoBrutalismText } from '@/components/neo-brutalism';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface UtilsSectionProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onFilterPress: () => void;
    onSortPress: () => void;
}

export const UtilsSection: React.FC<UtilsSectionProps> = ({
    searchQuery,
    onSearchChange,
    onFilterPress,
    onSortPress,
}) => {
    const { isDark } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
            {/* Search Bar */}
            <View style={styles.searchRow}>
                <NeoBrutalismCard variant="default" padding="base" style={styles.searchCard}>
                    <View style={styles.searchContainer}>
                        <Ionicons
                            name="search-outline"
                            size={20}
                            color={isDark ? Colors.dark.text : Colors.light.text}
                            style={styles.searchIcon}
                        />
                        <NeoBrutalismInput
                            placeholder="Search products..."
                            value={searchQuery}
                            onChangeText={onSearchChange}
                            style={styles.searchInput}
                        />
                    </View>
                </NeoBrutalismCard>
            </View>

            {/* Filter and Sort Buttons */}
            <View style={styles.actionsRow}>

                <View style={styles.filterIconContainer}>
                    <Ionicons
                        name="filter-outline"
                        size={20}
                        color={isDark ? Colors.dark.text : Colors.light.text}
                        style={styles.searchIcon}
                    />
                    <NeoBrutalismButton
                        title="Filter"
                        onPress={onFilterPress}
                        variant="secondary"
                        size="sm"
                        style={styles.actionButton}
                    />
                </View>
                <View style={styles.filterIconContainer}>
                    <Ionicons
                        name="funnel"
                        size={20}
                        color={isDark ? Colors.dark.text : Colors.light.text}
                        style={styles.searchIcon}
                    />
                    <NeoBrutalismButton
                        title="Sort"
                        onPress={onSortPress}
                        variant="secondary"
                        size="sm"
                        style={styles.actionButton}
                    />
                </View>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
                <NeoBrutalismCard variant="accent" padding="sm" style={styles.statCard}>
                    <NeoBrutalismText variant="body" color="primary" style={styles.statText}>
                        Total Products: 0
                    </NeoBrutalismText>
                </NeoBrutalismCard>
                <NeoBrutalismCard variant="default" padding="sm" style={styles.statCard}>
                    <NeoBrutalismText variant="body" color="primary" style={styles.statText}>
                        Low Stock: 0
                    </NeoBrutalismText>
                </NeoBrutalismCard>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    searchRow: {
        marginBottom: 12,
    },
    filterIconContainer: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    searchCard: {
        width: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
    },
    statText: {
        fontSize: 12,
        fontWeight: '600',
    },
});
