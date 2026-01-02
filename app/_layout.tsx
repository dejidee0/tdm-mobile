import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding-screen" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/categories/[slug]" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/orders/index" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/orders/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/my-details" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/delivery-address/index" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/delivery-address/add" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/notifications" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/contact-us" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/checkout/index" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/payment/index" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/order-placement/order-success" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
