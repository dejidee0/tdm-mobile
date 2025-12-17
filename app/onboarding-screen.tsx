import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.bg} imageStyle={styles.bgImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image source={require('../assets/images/onboard.png')} style={styles.onboard} />

          <View>
            <ThemedText type="title" style={styles.title}>Visualize Your Space With AI</ThemedText>
            <ThemedText type="default" style={styles.subtitle}>Transform your room, try new styles, and see materials before you buy.</ThemedText>

            <TouchableOpacity style={styles.primary} onPress={() => router.push('/(auth)/login')} activeOpacity={0.85}>
              <ThemedText style={styles.primaryText}>Login</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ghost} onPress={() => router.push('/(auth)/register')} activeOpacity={0.85}>
              <ThemedText style={styles.ghostText}>Create Account</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {/* continue as guest */}}>
              <ThemedText type="link" style={{ textAlign: 'center', marginTop: 10, color: '#000' }}>Continue as Guest</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <ThemedText style={{ color: '#000', marginBottom: 10, textAlign: 'center', fontSize: 12 }}>
          By tapping Continue or Create Account, you agree to our{' '}
          <ThemedText type="link" style={{ color: '#000', fontWeight: 'bold', fontSize: 12 }}>
            Terms of Service and Privacy Policy
          </ThemedText>
        </ThemedText>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#fff' },
  bgImage: { opacity: 0.06, resizeMode: 'cover' },
  container: { flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', gap: 20, paddingHorizontal: 20 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 24 },
  onboard: { width: 400, height: 300 },
  title: { marginTop: 30, fontSize: 28, lineHeight: 36, color: '#000' },
  subtitle: { marginTop: 12, color: '#707070' },
  primary: { backgroundColor: '#222a44', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginTop: 24, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8 },
  primaryText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  ghost: { backgroundColor: '#eef0f2', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  ghostText: { color: '#263a63', fontSize: 16, fontWeight: '700' },
});
