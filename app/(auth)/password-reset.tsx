import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function PasswordResetScreen() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<any>(null);

  return (
    <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>

        <View style={styles.headerSection}>
          <ThemedText type="title" style={styles.title}>Reset Password</ThemedText>
          <ThemedText style={styles.subtitle}>Enter your reset token and new password</ThemedText>
        </View>

        <View style={styles.formContent}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Reset Token</ThemedText>
            <TextInput
              placeholder="Enter token from email"
              value={token}
              onChangeText={setToken}
              style={[styles.input, focusedInput === 'token' && styles.inputFocused]}
              placeholderTextColor="#999"
              autoCapitalize="none"
              editable={!loading}
              onFocus={() => setFocusedInput('token')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>New Password</ThemedText>
            <View style={[styles.passwordInputWrapper, focusedInput === 'password' && styles.inputFocused]}>
              <TextInput
                placeholder="Enter new password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                editable={!loading}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                style={styles.passwordIconButton}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#222a44" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Confirm Password</ThemedText>
            <View style={[styles.passwordInputWrapper, focusedInput === 'confirmPassword' && styles.inputFocused]}>
              <TextInput
                placeholder="Confirm new password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.passwordInput}
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                editable={!loading}
                onFocus={() => setFocusedInput('confirmPassword')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword((s) => !s)}
                style={styles.passwordIconButton}
                accessibilityRole="button"
                accessibilityLabel={showConfirmPassword ? "Hide password" : "Show password"}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={22} color="#222a44" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={async () => {
              if (!token) return Alert.alert('Missing token', 'Please provide the reset token');
              if (!password) return Alert.alert('Missing password', 'Please enter a new password');
              if (password !== confirmPassword) return Alert.alert('Password mismatch', 'Passwords do not match');
              setLoading(true);
              try {
                await resetPassword({ token: String(token), password });
                Alert.alert('Success', 'Your password has been reset successfully', [
                  {
                    text: 'OK',
                    onPress: () => {
                      router.replace('/(auth)/login');
                    },
                  },
                ], { cancelable: false });
              } catch (e: any) {
                console.warn(e);
                Alert.alert('Reset failed', e?.message ?? String(e));
              } finally {
                setLoading(false);
              }
            }}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <ThemedText style={styles.resetButtonText}>Reset Password</ThemedText>
            )}
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity onPress={() => router.push('/(auth)/login')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <View style={styles.backContainer}>
              <ThemedText style={styles.backText}>Back to </ThemedText>
              <ThemedText style={styles.backLink}>Login</ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    alignSelf: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 70,
    height: 70,
  },
  headerSection: {
    marginBottom: 36,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222a44',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
    lineHeight: 20,
  },
  formContent: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222a44',
    marginLeft: 2,
  },
  input: {
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    fontSize: 15,
    color: '#222a44',
  },
  inputFocused: {
    borderColor: '#222a44',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  passwordInputWrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
    borderRadius: 12,
    backgroundColor: '#fafafa',
  },
  passwordInput: {
    height: 52,
    paddingHorizontal: 16,
    paddingRight: 48,
    fontSize: 15,
    color: '#222a44',
  },
  passwordIconButton: {
    position: 'absolute',
    right: 14,
    padding: 8,
  },
  resetButton: {
    backgroundColor: '#222a44',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#222a44',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#e8e8e8',
    marginVertical: 4,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  backText: {
    color: '#999',
    fontSize: 13,
  },
  backLink: {
    color: '#e24a43',
    fontWeight: '700',
    fontSize: 13,
  },
});
