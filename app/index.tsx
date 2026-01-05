import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const access = await AsyncStorage.getItem('@app_access_token');
        if (access) {
          router.replace('/(tabs)');
          return;
        }
      } catch {
        // ignore
      }
      router.replace('/onboarding-screen');
    })();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8', height: '100%' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 140, height: 140 },
});
