import { ThemedText } from '@/components/themed-text';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<any>(null);
  const { login } = useAuth();

  async function handleLogin() {
    setLoading(true);
    try {
      if (!email || !password) {
        Alert.alert('Missing fields', 'Please provide email and password');
        return;
      }

      await login({ email, password });
      router.replace('/(tabs)');
    } catch (e: any) {
      console.warn(e);
      Alert.alert('Login failed', e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>

        <View style={styles.headerSection}>
          <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
          <ThemedText style={styles.subtitle}>Login to your account</ThemedText>
        </View>

        <View style={styles.formContent}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Email Address</ThemedText>
            <TextInput
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Password</ThemedText>
            <View style={[styles.passwordInputWrapper, focusedInput === 'password' && styles.inputFocused]}>
              <TextInput
                placeholder="Enter your password"
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
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#D4AF37" />
                </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <ThemedText style={styles.forgotPasswordText}>Forgot Password?</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <ThemedText style={styles.loginButtonText}>Login</ThemedText>
            )}
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity onPress={() => router.push('/(auth)/register')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <View style={styles.signUpContainer}>
              <ThemedText style={styles.signUpText}>Don&rsquo;t have an account? </ThemedText>
              <ThemedText style={styles.signUpLink}>Create Account Here</ThemedText>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#252523',
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  headerSection: {
    marginBottom: 36,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D4AF37',
    marginBottom: 8,
    width: '100%',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
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
    color: '#D4AF37',
    marginLeft: 2,
  },
  input: {
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#494845',
    borderRadius: 12,
    backgroundColor: '#494845',
    fontSize: 15,
    color: '#FFFFFF',
  },
  inputFocused: {
    borderColor: '#D4AF37',
    borderWidth: 2,
    backgroundColor: '#494845',
  },
  passwordInputWrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#494845',
    borderRadius: 12,
    backgroundColor: '#494845',
  },
  passwordInput: {
    height: 52,
    paddingHorizontal: 16,
    paddingRight: 48,
    fontSize: 15,
    color: '#FFFFFF',
  },
  passwordIconButton: {
    position: 'absolute',
    right: 14,
    padding: 8,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  loginButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#494845',
    marginVertical: 4,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  signUpLink: {
    color: '#e24a43',
    fontWeight: '900',
    fontSize: 13,
  },
});
