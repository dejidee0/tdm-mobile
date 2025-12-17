import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSend() {
    setLoading(true);
    try {
      router.push('/(auth)/password-reset');
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.bg} imageStyle={styles.bgImage}>
      <SafeAreaView style={styles.container}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

        <View style={styles.content}>
          <ThemedText type="title" style={styles.title}>Forgot Password</ThemedText>
          <ThemedText style={{ marginTop: 8, marginBottom: 18, color: "#000" }}>Login to your minifurs account</ThemedText>

          <TextInput placeholder="Enter Email Address" value={email} onChangeText={setEmail} style={styles.input} />

          <TouchableOpacity style={styles.primary} onPress={handleSend} activeOpacity={0.85} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.primaryText}>Send to Email</ThemedText>}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#fff' },
  bgImage: { opacity: 0.06, resizeMode: 'cover' },
  container: { flex: 1, backgroundColor: '#fff' },
  logo: { width: 70, height: 70, margin: 16 },
  content: { paddingHorizontal: 20, paddingTop: 6 },
  title: { fontSize: 34, color: "#222a44" },
  input: { borderWidth: 1, borderColor: '#dfe7e6', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 14, marginTop: 12 },
  primary: { backgroundColor: '#222a44', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  primaryText: { color: '#fff', fontWeight: '700' },
});
