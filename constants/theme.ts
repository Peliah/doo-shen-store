/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#64b5f6';

export const Colors = {
  light: {
    text: '#000000',
    background: '#f4f4f4',
    tint: '#000000',
    icon: '#000000',
    tabIconDefault: '#666666',
    tabIconSelected: '#000000',
    // Additional colors for better theming
    cardBackground: '#ffffff',
    border: '#000000',
    placeholder: '#666666',
    success: '#00ff00',
    warning: '#ffaa00',
    error: '#ff0000',
    info: '#0000ff',
    surface: '#ffffff',
    surfaceVariant: '#f4f4f4',
  },
  dark: {
    text: '#ffffff',
    background: '#1a1a1a',
    tint: '#ffffff',
    icon: '#ffffff',
    tabIconDefault: '#666666',
    tabIconSelected: '#ffffff',
    // Additional colors for better theming
    cardBackground: '#2a2a2a',
    border: '#ffffff',
    placeholder: '#666666',
    success: '#00ff00',
    warning: '#ffaa00',
    error: '#ff0000',
    info: '#0000ff',
    surface: '#2a2a2a',
    surfaceVariant: '#1a1a1a',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
