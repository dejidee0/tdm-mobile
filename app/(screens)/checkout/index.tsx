import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrdersContext';

export default function CheckoutScreen() {
  const router = useRouter();
  const [focusedInput, setFocusedInput] = useState<any>(null);
  const { items, fetchCart } = useCart();
  const { createOrder } = useOrders();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('@app_addresses');
        const list = raw ? JSON.parse(raw) : [];
        setAddresses(list);
        if (list.length && !selectedAddressId) setSelectedAddressId(list[0].id);
      } catch {
        setAddresses([]);
      }
    })();
  }, [isFocused]);

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

  const subtotal = useMemo(() => items.reduce((s: number, it: any) => s + (parsePrice(it.price) || parsePrice(it.product?.price) || 0) * (it.quantity ?? it.qty ?? 1), items), [items]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#273054" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.selectBox}>
          <Text style={styles.label}>Select Delivery State</Text>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText}>Lagos - N5000</Text>
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </View>
        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>Delivery Details</Text>
        <View style={styles.formBox}>
          <TextInput placeholder="Full Name" style={[styles.input, focusedInput === 'fullName' && styles.inputFocused]} placeholderTextColor="#ccc" onFocus={() => setFocusedInput('fullName')} onBlur={() => setFocusedInput(null)} />
          <TextInput placeholder="Email Address" style={[styles.input, focusedInput === 'email' && styles.inputFocused]} placeholderTextColor="#ccc" keyboardType="email-address" onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} />
          <TextInput placeholder="Phone Number" style={[styles.input, focusedInput === 'phone' && styles.inputFocused]} placeholderTextColor="#ccc" keyboardType="phone-pad" onFocus={() => setFocusedInput('phone')} onBlur={() => setFocusedInput(null)} />
          <TextInput placeholder="Address" style={[styles.input, { minHeight: 80 }, focusedInput === 'address' && styles.inputFocused]} placeholderTextColor="#ccc" multiline onFocus={() => setFocusedInput('address')} onBlur={() => setFocusedInput(null)} />
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox} />
            <Text style={styles.checkboxLabel}>Save Address</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={[styles.label, { marginBottom: 12 }]}>Delivery Address</Text>
          {addresses.length ? (
            <FlatList
              data={addresses}
              keyExtractor={(a) => a.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedAddressId(item.id)} style={{ padding: 10, borderRadius: 8, backgroundColor: selectedAddressId === item.id ? '#F0F4FF' : '#fff', marginBottom: 8, borderWidth: 1, borderColor: '#f0f0f0' }}>
                  <Text style={{ fontWeight: '600', color: '#273054' }}>{item.name}</Text>
                  <Text style={{ color: '#999' }}>{item.address}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <TouchableOpacity style={{ marginBottom: 12 }} onPress={() => router.push('/delivery-address/add')}>
              <Text style={{ color: '#273054', fontWeight: '600' }}>Add a delivery address</Text>
            </TouchableOpacity>
          )}

          <Text style={[styles.label, { marginTop: 12 }]}>Delivery Details</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>N{subtotal.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, { marginTop: 12 }]}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>N5,000</Text>
          </View>
          <View style={[styles.summaryRow, { marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#f0f0f0' }]}>
            <Text style={styles.summaryTotal}>Total</Text>
            <Text style={styles.summaryTotal}>N{(subtotal + 5000).toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.payBtn}
            onPress={async () => {
              // create minimal order payload
              const selected = addresses.find((a) => a.id === selectedAddressId) ?? null;
              const payload = {
                items: items?.map((it: any) => ({ productId: it.product?.id ?? it.productId, quantity: it.quantity ?? it.qty ?? 1 })),
                shipping: { state: 'Lagos', amount: 5000, address: selected },
                payment: { method: 'card' },
              };
              try {
                const res = await createOrder(payload);
                if (res?.ok) {
                  router.push('/order-placement/order-success');
                } else {
                  // fallback to payment screen if order creation needs payment step
                  router.push('/payment');
                }
              } catch {
                router.push('/payment');
              }
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.payBtnText}>Pay Now</Text>
          </TouchableOpacity>
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
  selectBox: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#273054', marginBottom: 8 },
  dropdown: { height: 48, borderRadius: 10, backgroundColor: '#f5f5f5', paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#f0f0f0' },
  dropdownText: { color: '#273054', fontWeight: '500' },
  formBox: { marginTop: 8, gap: 10 },
  input: { height: 48, backgroundColor: '#f5f5f5', borderRadius: 10, paddingHorizontal: 14, fontSize: 14, color: '#273054', borderWidth: 1, borderColor: '#f0f0f0' },
  inputFocused: { borderColor: '#273054', borderWidth: 2, backgroundColor: '#fff' },
  checkboxRow: { marginTop: 14, flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: '#e24a43', backgroundColor: '#fff' },
  checkboxLabel: { marginLeft: 10, fontSize: 14, color: '#273054', fontWeight: '500' },
  summaryCard: { marginTop: 40, backgroundColor: '#fff', padding: 18, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { fontSize: 14, color: '#999' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#273054' },
  summaryTotal: { fontSize: 16, fontWeight: '900', color: '#273054' },
  payBtn: { marginTop: 20, height: 48, borderRadius: 10, backgroundColor: '#273054', alignItems: 'center', justifyContent: 'center', shadowColor: '#273054', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  payBtnText: { color: '#fff', fontWeight: '900', fontSize: 15 },
});
