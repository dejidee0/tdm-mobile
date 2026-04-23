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

      {/* Bottom Left Vectors */}
      <View>
        <Image source={require('../assets/images/splashbg/vector1.png')} style={styles.vector1} />
        <Image source={require('../assets/images/splashbg/vector2.png')} style={styles.vector2} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', height: '100%', position: 'relative' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 140, height: 140 },
  vector1: {
    position: 'absolute',
    bottom: -5,
    left: -50,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  vector2: {
    position: 'absolute',
    bottom: -10,
    left: 60,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
