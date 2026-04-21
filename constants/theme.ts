/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Core
    text: '#FFFFFF',
    background: '#000000',
    // Primary tint / button color (gold)
    tint: '#D4AF37',
    // Icons and secondary elements (grey)
    icon: '#494845',
    tabIconDefault: '#494845',
    tabIconSelected: '#D4AF37',
    // App-specific semantic tokens
    primary: '#D4AF37',
    card: '#252523',
    input: '#494845',
    white: '#FFFFFF',
    black: '#000000',
  },
  dark: {
    // Keep dark scheme consistent with requested palette
    text: '#FFFFFF',
    background: '#000000',
    tint: '#D4AF37',
    icon: '#494845',
    tabIconDefault: '#494845',
    tabIconSelected: '#D4AF37',
    primary: '#D4AF37',
    card: '#252523',
    input: '#494845',
    white: '#FFFFFF',
    black: '#000000',
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
