import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<any>(null);

  const { verifyEmail, resendVerification } = useAuth();

  async function handleVerify() {
    setLoading(true);
    try {
      if (!code) {
        Alert.alert('Missing code', 'Please provide the verification code');
        return;
      }
      await verifyEmail({ token: code });
      router.replace('/(tabs)')
    } catch (e: any) {
      console.warn(e);
      Alert.alert('Verification failed', e?.message ?? String(e));
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
          <ThemedText type="title" style={styles.title}>Verify Email</ThemedText>
          <ThemedText style={styles.subtitle}>Enter the code sent to your email</ThemedText>
        </View>

        <View style={styles.formContent}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Verification Code</ThemedText>
            <TextInput
              placeholder="000000"
              value={code}
              onChangeText={setCode}
              style={[styles.input, focusedInput === 'code' && styles.inputFocused]}
              placeholderTextColor="#999"
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              maxLength={6}
              onFocus={() => setFocusedInput('code')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} activeOpacity={0.8} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <ThemedText style={styles.verifyButtonText}>Verify Email</ThemedText>
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
    gap: 20,
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
    letterSpacing: 4,
    textAlign: 'center',
  },
  inputFocused: {
    borderColor: '#273054',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  verifyButton: {
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
  verifyButtonText: {
    color: '#fff',
    fontWeight: '900',
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
    fontWeight: '900',
    fontSize: 13,
  },
});
