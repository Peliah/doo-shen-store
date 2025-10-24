import {
    NeoBrutalismBorderRadius,
    NeoBrutalismBorderWidth,
    NeoBrutalismShadows,
    NeoBrutalismSpacing,
    NeoBrutalismTypography
} from '@/constants/neo-brutalism';
import { useNeoBrutalismColor } from '@/hooks/use-neo-brutalism-color';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { NeoBrutalismText } from './NeoBrutalismText';


export type NeoBrutalismInputVariant = 'default' | 'accent' | 'dark' | 'light';

interface NeoBrutalismInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    variant?: NeoBrutalismInputVariant;
    size?: 'sm' | 'base' | 'lg';
    label?: string;
    error?: string;
    disabled?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    style?: ViewStyle;
    inputStyle?: TextStyle;
}

export function NeoBrutalismInput({
    placeholder,
    value,
    onChangeText,
    variant = 'default',
    size = 'base',
    label,
    error,
    disabled = false,
    multiline = false,
    numberOfLines = 1,
    style,
    inputStyle,
}: NeoBrutalismInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    // Get colors at component level
    const backgroundPrimary = useNeoBrutalismColor({}, 'background.primary');
    const backgroundSecondary = useNeoBrutalismColor({}, 'background.secondary');
    const primaryBlack = useNeoBrutalismColor({}, 'primary.black');
    const accentGreen = useNeoBrutalismColor({}, 'accent.neonGreen');
    const borderPrimary = useNeoBrutalismColor({}, 'border.primary');
    const borderSecondary = useNeoBrutalismColor({}, 'border.secondary');
    const borderAccent = useNeoBrutalismColor({}, 'border.accent');
    const textPrimary = useNeoBrutalismColor({}, 'text.primary');
    const textSecondary = useNeoBrutalismColor({}, 'text.secondary');
    const textInverse = useNeoBrutalismColor({}, 'text.inverse');
    const textMuted = useNeoBrutalismColor({}, 'text.muted');

    const getVariantStyles = () => {
        switch (variant) {
            case 'default':
                return {
                    backgroundColor: backgroundPrimary,
                    borderColor: isFocused ? borderAccent : borderPrimary,
                    textColor: textPrimary,
                    placeholderColor: textMuted,
                };
            case 'accent':
                return {
                    backgroundColor: accentGreen,
                    borderColor: isFocused ? borderPrimary : borderPrimary,
                    textColor: textPrimary,
                    placeholderColor: textSecondary,
                };
            case 'dark':
                return {
                    backgroundColor: primaryBlack,
                    borderColor: isFocused ? borderAccent : borderPrimary,
                    textColor: textInverse,
                    placeholderColor: textMuted,
                };
            case 'light':
                return {
                    backgroundColor: backgroundSecondary,
                    borderColor: isFocused ? borderAccent : borderSecondary,
                    textColor: textPrimary,
                    placeholderColor: textMuted,
                };
            default:
                return {
                    backgroundColor: backgroundPrimary,
                    borderColor: isFocused ? borderAccent : borderPrimary,
                    textColor: textPrimary,
                    placeholderColor: textMuted,
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
                    minHeight: 40,
                };
            case 'base':
                return {
                    paddingVertical: NeoBrutalismSpacing.base,
                    paddingHorizontal: NeoBrutalismSpacing.lg,
                    fontSize: NeoBrutalismTypography.fontSize.base,
                    minHeight: 48,
                };
            case 'lg':
                return {
                    paddingVertical: NeoBrutalismSpacing.lg,
                    paddingHorizontal: NeoBrutalismSpacing.xl,
                    fontSize: NeoBrutalismTypography.fontSize.lg,
                    minHeight: 56,
                };
            default:
                return {
                    paddingVertical: NeoBrutalismSpacing.base,
                    paddingHorizontal: NeoBrutalismSpacing.lg,
                    fontSize: NeoBrutalismTypography.fontSize.base,
                    minHeight: 48,
                };
        }
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    const containerStyles = [
        styles.container,
        style,
    ];

    const inputContainerStyles = [
        styles.inputContainer,
        {
            backgroundColor: variantStyles.backgroundColor,
            borderColor: variantStyles.borderColor,
            borderWidth: NeoBrutalismBorderWidth.thick,
            borderRadius: NeoBrutalismBorderRadius.base,
            paddingVertical: sizeStyles.paddingVertical,
            paddingHorizontal: sizeStyles.paddingHorizontal,
            minHeight: sizeStyles.minHeight,
            opacity: disabled ? 0.6 : 1,
        },
        NeoBrutalismShadows.sm,
    ];

    const textInputStyles = [
        styles.textInput,
        {
            color: variantStyles.textColor,
            fontSize: sizeStyles.fontSize,
            fontWeight: NeoBrutalismTypography.fontWeight.bold,
        },
        inputStyle,
    ];

    return (
        <View style={containerStyles}>
            {label && (
                <NeoBrutalismText variant="caption" color="primary" style={styles.label}>
                    {label}
                </NeoBrutalismText>
            )}

            <View style={inputContainerStyles}>
                <TextInput
                    style={textInputStyles}
                    placeholder={placeholder}
                    placeholderTextColor={variantStyles.placeholderColor}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    editable={!disabled}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    textAlignVertical={multiline ? 'top' : 'center'}
                />
            </View>

            {error && (
                <NeoBrutalismText variant="caption" color="accent" style={styles.error}>
                    {error}
                </NeoBrutalismText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: NeoBrutalismSpacing.base,
    },
    label: {
        marginBottom: NeoBrutalismSpacing.sm,
    },
    inputContainer: {
        // Styles applied dynamically
    },
    textInput: {
        // Styles applied dynamically
    },
    error: {
        marginTop: NeoBrutalismSpacing.sm,
    },
});
