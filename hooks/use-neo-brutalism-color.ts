/**
 * Neo-Brutalism Theme Color Hook
 * Provides theme-aware colors for neo-brutalism components
 * Works with both light and dark themes
 */

import { NeoBrutalismColors } from '@/constants/neo-brutalism';
import { useTheme } from '@/contexts/ThemeContext';

export function useNeoBrutalismColor(
    props: { light?: string; dark?: string },
    colorPath: string
): string {
    const { isDark } = useTheme();

    const theme = isDark ? 'dark' : 'light';
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    }

    // Navigate through the color path (e.g., "primary.black", "text.primary")
    const pathParts = colorPath.split('.');
    let color: any = NeoBrutalismColors[theme];

    for (const part of pathParts) {
        color = color[part];
    }

    return color as string;
}

// Helper function to get neo-brutalism colors directly
export function getNeoBrutalismColor(colorPath: string, isDark: boolean = false): string {
    const theme = isDark ? 'dark' : 'light';
    const pathParts = colorPath.split('.');
    let color: any = NeoBrutalismColors[theme];

    for (const part of pathParts) {
        color = color[part];
    }

    return color as string;
}