import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = (params.id as string) || '1';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FB' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <IconSymbol name="chevron.left" size={20} color="#263a63" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>My Order</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ThemedView style={styles.container}>
        <View style={styles.card}>
          <Image source={require('@/assets/images/products/chair1.jpg')} style={styles.thumb} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <ThemedText type="defaultSemiBold">Mini sit me</ThemedText>
            <ThemedText style={{ color: '#9aa3a7', marginTop: 6 }}>EST: 15 WORKING DAYS</ThemedText>
          </View>
          <ThemedText style={{ fontWeight: '700' }}>N80,000</ThemedText>
        </View>

        <View style={{ padding: 18 }}>
          <ThemedText style={{ color: '#9aa3a7', textAlign: 'center', marginTop: 24 }}>Tracking details will be available in your email</ThemedText>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { height: 80, paddingHorizontal: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '700', color: '#263a63' },
  container: { padding: 14 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 12 },
  thumb: { width: 90, height: 90, borderRadius: 8, backgroundColor: '#f2f4f6' },
});
