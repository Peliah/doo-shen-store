import {
    NeoBrutalismTypography
} from '@/constants/neo-brutalism';
import { useNeoBrutalismColor } from '@/hooks/use-neo-brutalism-color';
import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

export type NeoBrutalismTextVariant = 'heading' | 'subheading' | 'body' | 'caption' | 'accent';
export type NeoBrutalismTextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

interface NeoBrutalismTextProps {
    children: React.ReactNode;
    variant?: NeoBrutalismTextVariant;
    size?: NeoBrutalismTextSize;
    color?: 'primary' | 'secondary' | 'inverse' | 'accent' | 'muted';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
    uppercase?: boolean;
    style?: TextStyle;
}

export function NeoBrutalismText({
    children,
    variant = 'body',
    size,
    color = 'primary',
    weight,
    uppercase = false,
    style,
}: NeoBrutalismTextProps) {
    // Get colors at component level
    const textPrimary = useNeoBrutalismColor({}, 'text.primary');
    const textSecondary = useNeoBrutalismColor({}, 'text.secondary');
    const textInverse = useNeoBrutalismColor({}, 'text.inverse');
    const textAccent = useNeoBrutalismColor({}, 'text.accent');
    const textMuted = useNeoBrutalismColor({}, 'text.muted');

    const getColorValue = (colorType: string) => {
        switch (colorType) {
            case 'primary':
                return textPrimary;
            case 'secondary':
                return textSecondary;
            case 'inverse':
                return textInverse;
            case 'accent':
                return textAccent;
            case 'muted':
                return textMuted;
            default:
                return textPrimary;
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'heading':
                return {
                    fontSize: size ? NeoBrutalismTypography.fontSize[size] : NeoBrutalismTypography.fontSize['4xl'],
                    fontWeight: weight || NeoBrutalismTypography.fontWeight.black,
                    color: getColorValue(color),
                    textTransform: uppercase ? 'uppercase' : 'none',
                    letterSpacing: 2,
                };
            case 'subheading':
                return {
                    fontSize: size ? NeoBrutalismTypography.fontSize[size] : NeoBrutalismTypography.fontSize['2xl'],
                    fontWeight: weight || NeoBrutalismTypography.fontWeight.extrabold,
                    color: getColorValue(color),
                    textTransform: uppercase ? 'uppercase' : 'none',
                    letterSpacing: 1.5,
                };
            case 'body':
                return {
                    fontSize: size ? NeoBrutalismTypography.fontSize[size] : NeoBrutalismTypography.fontSize.base,
                    fontWeight: weight || NeoBrutalismTypography.fontWeight.bold,
                    color: getColorValue(color),
                    textTransform: uppercase ? 'uppercase' : 'none',
                    letterSpacing: 0.5,
                };
            case 'caption':
                return {
                    fontSize: size ? NeoBrutalismTypography.fontSize[size] : NeoBrutalismTypography.fontSize.sm,
                    fontWeight: weight || NeoBrutalismTypography.fontWeight.semibold,
                    color: getColorValue(color),
                    textTransform: uppercase ? 'uppercase' : 'none',
                    letterSpacing: 1,
                };
            case 'accent':
                return {
                    fontSize: size ? NeoBrutalismTypography.fontSize[size] : NeoBrutalismTypography.fontSize.lg,
                    fontWeight: weight || NeoBrutalismTypography.fontWeight.extrabold,
                    color: getColorValue(color),
                    textTransform: uppercase ? 'uppercase' : 'none',
                    letterSpacing: 2,
                };
            default:
                return {
                    fontSize: size ? NeoBrutalismTypography.fontSize[size] : NeoBrutalismTypography.fontSize.base,
                    fontWeight: weight || NeoBrutalismTypography.fontWeight.bold,
                    color: getColorValue(color),
                    textTransform: uppercase ? 'uppercase' : 'none',
                    letterSpacing: 0.5,
                };
        }
    };

    const variantStyles = getVariantStyles();

    const textStyles = [
        styles.text,
        variantStyles,
        style,
    ];

    return <Text style={textStyles}>{children}</Text>;
}

const styles = StyleSheet.create({
    text: {
        // Base text styles are applied dynamically
    },
});
