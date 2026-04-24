import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export default function AILayout() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={guestStyles.guestSection}>
        <View style={guestStyles.guestCenter}>
          <Image source={require('@/assets/images/icons/id.png')} style={guestStyles.guestIcon} />
          <Text style={guestStyles.guestTitle}>You are not logged in</Text>
          <TouchableOpacity style={guestStyles.loginBtn} onPress={() => router.push('/(auth)/login')}>
            <Text style={guestStyles.loginBtnText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="estimator" />
      <Stack.Screen name="detailed-estimate" />
      <Stack.Screen name="estimate-results" />
      <Stack.Screen name="visualizer" />
      <Stack.Screen name="catalog" />
      <Stack.Screen name="designs" />
      <Stack.Screen name="roofing" />
      <Stack.Screen name="fixtures" />
      <Stack.Screen name="windows" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="delivery-details" />
      <Stack.Screen name="order-details" />
    </Stack>
  );
}

const guestStyles = StyleSheet.create({
  guestSection: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#000000',
  },
  guestCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  guestIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    opacity: 0.8,
    tintColor: '#D4AF37',
  },
  guestTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#D4AF37',
    marginBottom: 8,
  },
  guestSubTitle: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  loginBtn: {
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});
