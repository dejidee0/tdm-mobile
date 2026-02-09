import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const router = useRouter();
  const { items, fetchCart, loading } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  function parsePrice(v: any) {
    if (!v) return 0;
    if (typeof v === 'number') return v;
    if (typeof v === 'string') {
      const n = v.replace(/[^0-9.]/g, '');
      return parseFloat(n) || 0;
    }
    if (v.price) return parsePrice(v.price);
    return 0;
  }

  const subtotal = useMemo(() => items.reduce((s: number, it: any) => s + (parsePrice(it.price) || parsePrice(it.product?.price) || 0) * (it.quantity ?? it.qty ?? 1), 0), [items]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={28} color="#273054" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Cart</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(i: any) => i.id ?? String(i.product?.id ?? Math.random())}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={typeof item.product?.image === 'string' ? { uri: item.product.image } : item.product?.image ?? require('@/assets/images/products/chair1.jpg')} style={styles.thumb} />
              <View style={styles.itemDetails}>
                <ThemedText style={styles.itemTitle}>{item.product?.title ?? item.name ?? 'Item'}</ThemedText>
                <ThemedText style={styles.itemDelivery}>Est: {item.deliveryEstimate ?? '15 working days'}</ThemedText>
              </View>
              <ThemedText style={styles.itemPrice}>{(item.quantity ?? item.qty ?? 1) > 1 ? `N${(parseFloat(String(subtotal)) || 0).toFixed(2)}` : `N${(parsePrice(item.price) || parsePrice(item.product?.price) || 0).toFixed(2)}`}</ThemedText>
            </View>
          )}
        />

        {/* Total Row */}
        <View style={styles.totalRow}>
          <View>
            <ThemedText style={styles.totalLabel}>Subtotal:</ThemedText>
            <ThemedText style={styles.totalPrice}>N{subtotal.toFixed(2)}</ThemedText>
            <ThemedText style={styles.deliveryNote}>Delivery exclusive</ThemedText>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout')} activeOpacity={0.8}>
            <ThemedText style={styles.checkoutText}>Checkout</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerBack: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: '#273054',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'flex-start',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  thumb: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  itemDetails: {
    flex: 1,
    gap: 6,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#273054',
  },
  itemDelivery: {
    fontSize: 12,
    color: '#999',
  },
  itemPrice: {
    fontWeight: '900',
    fontSize: 14,
    color: '#273054',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    marginTop: 24,
  },
  totalLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  totalPrice: {
    fontWeight: '900',
    fontSize: 20,
    color: '#273054',
    marginBottom: 4,
  },
  deliveryNote: {
    fontSize: 11,
    color: '#999',
  },
  checkoutBtn: {
    backgroundColor: '#273054',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#273054',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
  },
});
