import { ThemedText } from '@/components/themed-text';
import { useRouter, useSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function PasswordResetScreen() {
  const router = useRouter();
  const { token: tokenParam } = useSearchParams();
  const { resetPassword } = useAuth();
  const [token, setToken] = useState<string | undefined>((tokenParam as string) ?? undefined);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
              Enter the token you received and choose a new password.
            </ThemedText>

            <TextInput
              placeholder="Reset token (from email)"
              value={token}
              onChangeText={setToken}
              style={styles.input}
              autoCapitalize="none"
            />

            <TextInput
              placeholder="New password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.primary}
              onPress={async () => {
                if (!token) return Alert.alert('Missing token', 'Please provide the reset token');
                if (!password) return Alert.alert('Missing password', 'Please enter a new password');
                if (password !== confirmPassword) return Alert.alert('Password mismatch', 'Passwords do not match');
                setLoading(true);
                try {
                  await resetPassword({ token: String(token), password });
                  Alert.alert('Success', 'Password has been reset');
                  router.replace('/(auth)/login');
                } catch (e) {
                  console.warn(e);
                  Alert.alert('Reset failed', e?.message ?? String(e));
                } finally {
                  setLoading(false);
                }
              }}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.primaryText}>Reset Password</ThemedText>}
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 12 }}
              onPress={() => router.push('/(auth)/login')}
            >
              <ThemedText>Back to Login</ThemedText>
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
