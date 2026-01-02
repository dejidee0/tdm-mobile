import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FB' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <IconSymbol name="chevron.left" size={20} color="#263a63" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Cart</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ThemedView style={styles.container}>
        <View style={styles.card}>
          <Image source={require('@/assets/images/products/chair1.jpg')} style={styles.thumb} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <ThemedText type="defaultSemiBold">Mini sit me</ThemedText>
            <ThemedText style={{ color: '#9aa3a7', marginTop: 6, fontSize: 12 }}>EST: 15 WORKING DAYS</ThemedText>
          </View>
          <ThemedText style={{ fontWeight: '700' }}>N75,000</ThemedText>
        </View>

        <View style={styles.totalRow}>
          <View>
            <ThemedText style={{ color: '#9aa3a7' }}>Total:</ThemedText>
            <ThemedText type="defaultSemiBold" style={{ fontSize: 20 }}>N75,000</ThemedText>
            <ThemedText style={{ color: '#9aa3a7', fontSize: 12 }}>DELIVERY EXCLUSIVE</ThemedText>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout')} activeOpacity={0.9}>
            <ThemedText style={{ color: '#fff', fontWeight: '500' }}>Checkout</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { height: 80, paddingHorizontal: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', color: '#263a63' },
  container: { padding: 14 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 24 },
  thumb: { width: 90, height: 90, borderRadius: 8, backgroundColor: '#f2f4f6' },
  totalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 6 },
  checkoutBtn: { backgroundColor: '#263a63', height: 56, borderRadius: 12, paddingHorizontal: 28, alignItems: 'center', justifyContent: 'center' },
});
