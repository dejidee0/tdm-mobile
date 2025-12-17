import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PasswordResetScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/bg.jpg')}
      style={styles.bg}
      imageStyle={styles.bgImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.centerBox}>
          <Image
            source={require('../../assets/images/password-reset-illustration.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <View style={styles.content}>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Please check your email to reset password
            </ThemedText>

            <TouchableOpacity
              style={styles.primary}
              onPress={() => router.push('/(auth)/login')}
              activeOpacity={0.85}
            >
              <ThemedText style={styles.primaryText}>Back to Login</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#fff' },
  bgImage: { opacity: 0.06, resizeMode: 'cover' },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },

  illustration: {
    width: 240,
    height: 240,
    opacity: 0.95,
    marginBottom: 18,
  },

  content: {
    width: '100%',
    alignItems: 'center',
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 18,
    color: '#000',
    paddingHorizontal: 8,
  },

  primary: {
    backgroundColor: '#222a44',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginTop: 4,
  },

  primaryText: { color: '#fff', fontWeight: '700' },
});
