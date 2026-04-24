import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrders } from '../../../context/OrdersContext';

export default function OrdersScreen() {
  const router = useRouter();
  const { orders, loading, fetchMyOrders } = useOrders();

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#D4AF37" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator style={{ marginTop: 24 }} />
        ) : !orders || (Array.isArray(orders) && orders.length === 0) ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#999' }}>You have no orders yet.</Text>
          </View>
        ) : (
          <FlatList
            data={orders || []}
            keyExtractor={(i: any) => i.id?.toString() || i.orderNumber?.toString()}
            scrollEnabled={true}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
            renderItem={({ item }: { item: any }) => {
              const thumb = item.items && item.items[0] && item.items[0].product && item.items[0].product.images && item.items[0].product.images[0];
              const title = item.orderNumber ? `Order #${item.orderNumber}` : item.id;
              const status = item.status || item.orderStatus || '';
              const total = item.total || (item.orderSummary && item.orderSummary.totalAmount) || '';
              return (
                <TouchableOpacity style={styles.card} onPress={() => router.push(`/orders/${item.id || item.orderNumber}`)} activeOpacity={0.7}>
                  {thumb ? (
                    <Image source={{ uri: thumb }} style={styles.thumb} />
                  ) : (
                    <View style={[styles.thumb, { alignItems: 'center', justifyContent: 'center' }]}>
                      <Ionicons name="cart" size={28} color="#ccc" />
                    </View>
                  )}
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardEstimate}>{status}</Text>
                  </View>
                  <Text style={styles.cardPrice}>{total}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  header: { height: 60, paddingHorizontal: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#000', borderBottomWidth: 1, borderBottomColor: '#000' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#D4AF37' },
  container: { flex: 1, backgroundColor: '#000' },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#D4AF37', borderRadius: 12, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  thumb: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#f5f5f5' },
  cardInfo: { flex: 1, marginLeft: 14, gap: 4 },
  cardTitle: { fontWeight: '600', fontSize: 14, color: '#fff' },
  cardEstimate: { fontSize: 12, color: '#999' },
  cardPrice: { fontWeight: '900', fontSize: 15, color: '#fff' },
});
