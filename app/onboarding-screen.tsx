import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image source={require('../assets/images/onboard.png')} style={styles.onboard} />

          <View style={styles.textSection}>
            <ThemedText type="title" style={styles.title}>Visualize Your Space With AI</ThemedText>
            <ThemedText style={styles.subtitle}>Transform your room, try new styles, and see materials before you buy.</ThemedText>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/(auth)/login')} activeOpacity={0.8}>
            <ThemedText style={styles.loginButtonText}>Login</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/(auth)/register')} activeOpacity={0.8}>
            <ThemedText style={styles.registerButtonText}>Create Account</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {/* continue as guest */}} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <ThemedText style={styles.guestText}>Continue as Guest</ThemedText>
          </TouchableOpacity>

          <View style={styles.footerText}>
            <ThemedText style={styles.disclaimerText}>
              By tapping Continue or Create Account, you agree {'\n'} to our{' '}
              <ThemedText style={styles.disclaimerLink}>Terms & Privacy Policy</ThemedText>
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  onboard: {
    width: '100%',
    height: 320,
    resizeMode: 'contain',
  },
  textSection: {
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D4AF37',
    textAlign: 'center',
    lineHeight: 26.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26.5,
  },
  buttonSection: {
    gap: 12,
    paddingVertical: 20,
  },
  loginButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  registerButton: {
    backgroundColor: '#494845',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#494845',
  },
  registerButtonText: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: '900',
  },
  guestText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 8,
    textDecorationLine: 'underline',
  },
  footerText: {
    marginTop: 8,
    paddingVertical: 12,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 16,
  },
  disclaimerLink: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '900',
  },
});
