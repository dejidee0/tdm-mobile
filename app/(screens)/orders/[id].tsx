import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useOrders } from '../../context/OrdersContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = (params.id as string) || '1';
  const { getOrder } = useOrders();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const o = await getOrder(id);
        setOrder(o);
      } catch {
        // ignore
      }
    })();
  }, [id]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#273054" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Image source={typeof order?.product?.image === 'string' ? { uri: order.product.image } : order?.product?.image ?? require('@/assets/images/products/chair1.jpg')} style={styles.thumb} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{order?.product?.title ?? order?.title ?? 'Order item'}</Text>
            <Text style={styles.cardEstimate}>{order?.status ?? 'EST: 15 WORKING DAYS'}</Text>
          </View>
          <Text style={styles.cardPrice}>{order?.total ?? order?.price ?? ''}</Text>
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
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#273054' },
  container: { padding: 20, paddingBottom: 40 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  thumb: { width: 90, height: 90, borderRadius: 10, backgroundColor: '#f5f5f5' },
  cardInfo: { flex: 1, marginLeft: 14, gap: 4 },
  cardTitle: { fontWeight: '600', fontSize: 15, color: '#273054' },
  cardEstimate: { fontSize: 12, color: '#999' },
  cardPrice: { fontWeight: '900', fontSize: 15, color: '#273054' },
  infoCard: { padding: 18, backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  infoText: { color: '#999', textAlign: 'center', fontSize: 14, lineHeight: 20 },
});
