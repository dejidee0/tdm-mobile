import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator, Alert, Image, ImageBackground, ScrollView, StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<any>(null);
  const { register } = useAuth();

  async function handleCreate() {
    if (!acceptedTerms) {
      return;
    }

    setLoading(true);
    try {
      if (!email || !password) {
        Alert.alert('Missing fields', 'Please provide email and password');
        return;
      }
      const response = await register({ firstName, lastName, email, phoneNumber, password, confirmPassword });
      console.log('Registration successful', response);
      router.replace('/(auth)/login');
    } catch (e: any) {
      console.warn(e.message);
      Alert.alert('Registration failed', e.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>

        <View style={styles.headerSection}>
          <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
          <ThemedText style={styles.subtitle}>Enter your details for a new account</ThemedText>
        </View>

        <View style={styles.formContent}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>First Name</ThemedText>
            <TextInput
              placeholder="John"
              value={firstName}
              onChangeText={setFirstName}
              style={[styles.input, focusedInput === 'firstName' && styles.inputFocused]}
              placeholderTextColor="#999"
              autoCapitalize="words"
              editable={!loading}
              onFocus={() => setFocusedInput('firstName')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Last Name</ThemedText>
            <TextInput
              placeholder="Doe"
              value={lastName}
              onChangeText={setLastName}
              style={[styles.input, focusedInput === 'lastName' && styles.inputFocused]}
              placeholderTextColor="#999"
              autoCapitalize="words"
              editable={!loading}
              onFocus={() => setFocusedInput('lastName')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Email Address</ThemedText>
            <TextInput
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              editable={!loading}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
            <TextInput
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={[styles.input, focusedInput === 'phoneNumber' && styles.inputFocused]}
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="number-pad"
              autoCorrect={false}
              editable={!loading}
              onFocus={() => setFocusedInput('phoneNumber')}
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
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#273054" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Confirm Password</ThemedText>
            <View style={[styles.passwordInputWrapper, focusedInput === 'confirmPassword' && styles.inputFocused]}>
              <TextInput
                placeholder="Confirm your password"
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
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={22} color="#273054" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAcceptedTerms((t) => !t)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <ThemedText style={styles.termsText}>I accept the Terms of Service & Privacy Policy</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreate}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <ThemedText style={styles.createButtonText}>Create Account</ThemedText>
            )}
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity onPress={() => router.push('/(auth)/login')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <View style={styles.loginContainer}>
              <ThemedText style={styles.loginText}>Already have an account? </ThemedText>
              <ThemedText style={styles.loginLink}>Login Here</ThemedText>
            </View>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
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
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#273054',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
    lineHeight: 20,
  },
  formContent: {
    gap: 18,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#273054',
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
    color: '#273054',
  },
  inputFocused: {
    borderColor: '#273054',
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
    color: '#273054',
  },
  passwordIconButton: {
    position: 'absolute',
    right: 14,
    padding: 8,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#d0d0d0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#e24a43',
    borderColor: '#e24a43',
  },
  termsText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    flex: 1,
  },
  createButton: {
    backgroundColor: '#273054',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#273054',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#e8e8e8',
    marginVertical: 4,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  loginText: {
    color: '#999',
    fontSize: 13,
  },
  loginLink: {
    color: '#e24a43',
    fontWeight: '900',
    fontSize: 13,
  },
});
