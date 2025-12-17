import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      router.replace('/(tabs)');
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
          <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
          <ThemedText style={{ marginTop: 8, marginBottom: 18, color: '#000' }}>Login to your TBM account</ThemedText>

          <TextInput placeholder="Enter Email Address" value={email} onChangeText={setEmail} style={styles.input} />

          <View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={[styles.input, { flex: 1 }]}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
              />

              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                style={styles.iconButton}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')} style={{ alignSelf: 'flex-end', marginTop: 8 }}>
            <ThemedText style={{ color: '#000' }}>Forgot Password?</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primary} onPress={handleLogin} activeOpacity={0.85} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.primaryText}>Login</ThemedText>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(auth)/register')} style={{ alignSelf: 'center', marginTop: 18 }}>
            <ThemedText style={{ color: '#000' }}>Don&rsquo;t have an account? <ThemedText style={{ color: '#e24a43' }}>Create Account Here</ThemedText></ThemedText>
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
  title: { fontSize: 34, color: '#222a44' },
  inputWrapper: {
    position: "relative",
    width: "100%",
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    paddingRight: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  iconButton: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: [{ translateY: -15 }],
    padding: 6,
  },
  primary: { backgroundColor: '#222a44', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  primaryText: { color: '#fff', fontWeight: '700' },
});
