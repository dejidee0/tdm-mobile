import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="password-reset" options={{ headerShown: false }} />
    </Stack>
  );
}
