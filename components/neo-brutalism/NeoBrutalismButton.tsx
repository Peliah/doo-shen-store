import {
    NeoBrutalismBorderRadius,
    NeoBrutalismBorderWidth,
    NeoBrutalismShadows,
    NeoBrutalismSpacing,
    NeoBrutalismTypography
} from '@/constants/neo-brutalism';
import { useNeoBrutalismColor } from '@/hooks/use-neo-brutalism-color';
import React from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from '../themed-text';

export type NeoBrutalismButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'success';
export type NeoBrutalismButtonSize = 'sm' | 'base' | 'lg' | 'xl';

interface NeoBrutalismButtonProps {
    title: string;
    onPress: () => void;
    variant?: NeoBrutalismButtonVariant;
    size?: NeoBrutalismButtonSize;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

export function NeoBrutalismButton({
    title,
    onPress,
    variant = 'primary',
    size = 'base',
    disabled = false,
    style,
    textStyle,
    fullWidth = false,
}: NeoBrutalismButtonProps) {
    // Get colors at component level
    const primaryBlack = useNeoBrutalismColor({}, 'primary.black');
    const primaryRed = useNeoBrutalismColor({}, 'primary.red');
    const primaryGreen = useNeoBrutalismColor({}, 'primary.green');
    const backgroundSecondary = useNeoBrutalismColor({}, 'background.secondary');
    const accentGreen = useNeoBrutalismColor({}, 'accent.neonGreen');
    const borderPrimary = useNeoBrutalismColor({}, 'border.primary');
    const textPrimary = useNeoBrutalismColor({}, 'text.primary');
    const textInverse = useNeoBrutalismColor({}, 'text.inverse');

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: primaryBlack,
                    borderColor: borderPrimary,
                    textColor: textInverse,
                };
            case 'secondary':
                return {
                    backgroundColor: backgroundSecondary,
                    borderColor: borderPrimary,
                    textColor: textPrimary,
                };
            case 'accent':
                return {
                    backgroundColor: accentGreen,
                    borderColor: borderPrimary,
                    textColor: textPrimary,
                };
            case 'danger':
                return {
                    backgroundColor: primaryRed,
                    borderColor: borderPrimary,
                    textColor: textInverse,
                };
            case 'success':
                return {
                    backgroundColor: primaryGreen,
                    borderColor: borderPrimary,
                    textColor: textPrimary,
                };
            default:
                return {
                    backgroundColor: primaryBlack,
                    borderColor: borderPrimary,
                    textColor: textInverse,
                };
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return {
                    paddingVertical: NeoBrutalismSpacing.sm,
                    paddingHorizontal: NeoBrutalismSpacing.base,
                    fontSize: NeoBrutalismTypography.fontSize.sm,
                    fontWeight: NeoBrutalismTypography.fontWeight.bold,
                };
            case 'base':
                return {
                    paddingVertical: NeoBrutalismSpacing.base,
                    paddingHorizontal: NeoBrutalismSpacing.lg,
                    fontSize: NeoBrutalismTypography.fontSize.base,
                    fontWeight: NeoBrutalismTypography.fontWeight.bold,
                };
            case 'lg':
                return {
                    paddingVertical: NeoBrutalismSpacing.lg,
                    paddingHorizontal: NeoBrutalismSpacing.xl,
                    fontSize: NeoBrutalismTypography.fontSize.lg,
                    fontWeight: NeoBrutalismTypography.fontWeight.extrabold,
                };
            case 'xl':
                return {
                    paddingVertical: NeoBrutalismSpacing.xl,
                    paddingHorizontal: NeoBrutalismSpacing['2xl'],
                    fontSize: NeoBrutalismTypography.fontSize.xl,
                    fontWeight: NeoBrutalismTypography.fontWeight.black,
                };
            default:
                return {
                    paddingVertical: NeoBrutalismSpacing.base,
                    paddingHorizontal: NeoBrutalismSpacing.lg,
                    fontSize: NeoBrutalismTypography.fontSize.base,
                    fontWeight: NeoBrutalismTypography.fontWeight.bold,
                };
        }
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    const buttonStyles = [
        styles.button,
        {
            backgroundColor: variantStyles.backgroundColor,
            borderColor: variantStyles.borderColor,
            borderWidth: NeoBrutalismBorderWidth.thick,
            borderRadius: NeoBrutalismBorderRadius.base,
            paddingVertical: sizeStyles.paddingVertical,
            paddingHorizontal: sizeStyles.paddingHorizontal,
            width: fullWidth ? '100%' : 'auto',
            opacity: disabled ? 0.6 : 1,
        },
        NeoBrutalismShadows.base,
        style,
    ];

    const textStyles = [
        styles.text,
        {
            color: variantStyles.textColor,
            fontSize: sizeStyles.fontSize,
            fontWeight: sizeStyles.fontWeight,
        },
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles as StyleProp<ViewStyle>[]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            <ThemedText style={textStyles as StyleProp<TextStyle>[]}>{title}</ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    text: {
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});
