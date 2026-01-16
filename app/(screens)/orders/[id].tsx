import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = (params.id as string) || '1';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#222a44" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Image source={require('@/assets/images/products/chair1.jpg')} style={styles.thumb} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Mini sit me</Text>
            <Text style={styles.cardEstimate}>EST: 15 WORKING DAYS</Text>
          </View>
          <Text style={styles.cardPrice}>N80,000</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Tracking details will be available in your email</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 60, paddingHorizontal: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#222a44' },
  container: { padding: 20, paddingBottom: 40 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  thumb: { width: 90, height: 90, borderRadius: 10, backgroundColor: '#f5f5f5' },
  cardInfo: { flex: 1, marginLeft: 14, gap: 4 },
  cardTitle: { fontWeight: '600', fontSize: 15, color: '#222a44' },
  cardEstimate: { fontSize: 12, color: '#999' },
  cardPrice: { fontWeight: '700', fontSize: 15, color: '#222a44' },
  infoCard: { padding: 18, backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  infoText: { color: '#999', textAlign: 'center', fontSize: 14, lineHeight: 20 },
});
