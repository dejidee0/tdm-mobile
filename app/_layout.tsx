import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { OrdersProvider } from '../context/OrdersContext';
import { ProductsProvider } from '../context/ProductsContext';
import { SavedProvider } from '../context/SavedContext';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <AppProvider>
          <ProductsProvider>
            <SavedProvider>
              <CartProvider>
                <OrdersProvider>
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
                    <Stack.Screen name="(screens)/rewards" options={{ headerShown: false }} />
                    <Stack.Screen name="(screens)/product-details" options={{ headerShown: false }} />
                    <Stack.Screen name="(screens)/ai-estimator" options={{ headerShown: false }} />
                    <Stack.Screen name="(screens)/detailed-estimate" options={{ headerShown: false }} />
                    <Stack.Screen name="(screens)/estimate-results" options={{ headerShown: false }} />
                  </Stack>
                  <StatusBar style="auto" />
                </OrdersProvider>
              </CartProvider>
            </SavedProvider>
          </ProductsProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
