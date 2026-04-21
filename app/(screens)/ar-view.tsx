import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ARView() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
        >
            <Ionicons name="chevron-back" size={24} color="#D4AF37" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image source={require('@/assets/images/icons/vr.png')} style={styles.vrIcon} />
        </View>

        <Text style={styles.title}>AR View Coming Soon</Text>
        <Text style={styles.subtitle}>
          We are currently working on bringing the best augmented reality experience so you can preview furniture directly in your space!
        </Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.back()}>
          <Text style={styles.primaryText}>Back to Product</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    height: 60,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
      backgroundColor: '#252523',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
      backgroundColor: '#252523',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  vrIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    tintColor: '#D4AF37',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
      color: '#D4AF37',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
      color: '#FFFFFF',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  primaryBtn: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryText: {
      color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
