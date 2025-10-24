import {
    NeoBrutalismBorderRadius,
    NeoBrutalismBorderWidth,
    NeoBrutalismShadows,
    NeoBrutalismSpacing
} from '@/constants/neo-brutalism';
import { useNeoBrutalismColor } from '@/hooks/use-neo-brutalism-color';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export type NeoBrutalismCardVariant = 'default' | 'accent' | 'dark' | 'light';

interface NeoBrutalismCardProps {
    children: React.ReactNode;
    variant?: NeoBrutalismCardVariant;
    padding?: 'sm' | 'base' | 'lg' | 'xl';
    style?: ViewStyle;
    shadow?: boolean;
    border?: boolean;
}

export function NeoBrutalismCard({
    children,
    variant = 'default',
    padding = 'base',
    style,
    shadow = true,
    border = true,
}: NeoBrutalismCardProps) {
    // Get colors at component level
    const backgroundPrimary = useNeoBrutalismColor({}, 'background.primary');
    const backgroundSecondary = useNeoBrutalismColor({}, 'background.secondary');
    const primaryBlack = useNeoBrutalismColor({}, 'primary.black');
    const accentGreen = useNeoBrutalismColor({}, 'accent.neonGreen');
    const borderPrimary = useNeoBrutalismColor({}, 'border.primary');
    const borderSecondary = useNeoBrutalismColor({}, 'border.secondary');

    const getVariantStyles = () => {
        switch (variant) {
            case 'default':
                return {
                    backgroundColor: backgroundPrimary,
                    borderColor: borderPrimary,
                };
            case 'accent':
                return {
                    backgroundColor: accentGreen,
                    borderColor: borderPrimary,
                };
            case 'dark':
                return {
                    backgroundColor: primaryBlack,
                    borderColor: borderPrimary,
                };
            case 'light':
                return {
                    backgroundColor: backgroundSecondary,
                    borderColor: borderSecondary,
                };
            default:
                return {
                    backgroundColor: backgroundPrimary,
                    borderColor: borderPrimary,
                };
        }
    };

    const getPaddingStyles = () => {
        switch (padding) {
            case 'sm':
                return NeoBrutalismSpacing.sm;
            case 'base':
                return NeoBrutalismSpacing.base;
            case 'lg':
                return NeoBrutalismSpacing.lg;
            case 'xl':
                return NeoBrutalismSpacing.xl;
            default:
                return NeoBrutalismSpacing.base;
        }
    };

    const variantStyles = getVariantStyles();
    const paddingValue = getPaddingStyles();

    const cardStyles = [
        styles.card,
        {
            backgroundColor: variantStyles.backgroundColor,
            borderColor: variantStyles.borderColor,
            borderWidth: border ? NeoBrutalismBorderWidth.thick : 0,
            borderRadius: NeoBrutalismBorderRadius.base,
            padding: paddingValue,
        },
        shadow ? NeoBrutalismShadows.base : NeoBrutalismShadows.none,
        style,
    ];

    return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        // Base card styles are applied dynamically
    },
});
