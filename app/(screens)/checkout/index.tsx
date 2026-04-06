import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../../context/CartContext';
import { useOrders } from '../../../context/OrdersContext';

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

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

export default function CheckoutScreen() {
  const router = useRouter();
  const [focusedInput, setFocusedInput] = useState<any>(null);
  const { items, fetchCart, cart } = useCart();
  const { createOrder } = useOrders();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);
  const [selectedState, setSelectedState] = useState('Lagos');
  const [showStateModal, setShowStateModal] = useState(false);
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
  }, [isFocused, selectedAddressId]);

  

  const subtotal = useMemo(() => {
    if (cart && (cart.subTotal !== undefined && cart.subTotal !== null)) return cart.subTotal;
    return items.reduce((s: number, it: any) => s + ((parsePrice(it.unitPrice ?? it.price) || parsePrice(it.product?.price) || 0) * (it.quantity ?? it.qty ?? 1)), 0);
  }, [cart, items]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#273054" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.selectBox}>
          <Text style={styles.label}>Select Delivery State</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowStateModal(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.dropdownText}>{selectedState} - N5000</Text>
            <Ionicons name="chevron-down" size={18} color="#ccc" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>Delivery Details</Text>
        <View style={styles.formBox}>
          <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} style={[styles.input, focusedInput === 'fullName' && styles.inputFocused]} placeholderTextColor="#ccc" onFocus={() => setFocusedInput('fullName')} onBlur={() => setFocusedInput(null)} />
          <TextInput placeholder="Email Address" value={email} onChangeText={setEmail} style={[styles.input, focusedInput === 'email' && styles.inputFocused]} placeholderTextColor="#ccc" keyboardType="email-address" onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} />
          <TextInput placeholder="Phone Number" value={phone} onChangeText={setPhone} style={[styles.input, focusedInput === 'phone' && styles.inputFocused]} placeholderTextColor="#ccc" keyboardType="phone-pad" onFocus={() => setFocusedInput('phone')} onBlur={() => setFocusedInput(null)} />
          <TextInput placeholder="City" value={city} onChangeText={setCity} style={[styles.input, focusedInput === 'city' && styles.inputFocused]} placeholderTextColor="#ccc" onFocus={() => setFocusedInput('city')} onBlur={() => setFocusedInput(null)} />
          <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={[styles.input, { minHeight: 80 }, focusedInput === 'address' && styles.inputFocused]} placeholderTextColor="#ccc" multiline onFocus={() => setFocusedInput('address')} onBlur={() => setFocusedInput(null)} />
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setSaveAddress(!saveAddress)} activeOpacity={0.7}>
            <View style={[styles.checkbox, saveAddress && { backgroundColor: '#e24a43' }]} />
            <Text style={styles.checkboxLabel}>Save Address</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={[styles.label, { marginBottom: 12 }]}>Delivery Address</Text>
          {addresses.length ? (
            <FlatList
              data={addresses}
              keyExtractor={(a) => a.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  setSelectedAddressId(item.id);
                  setFullName(item.name || '');
                  setPhone(item.phone || '');
                  setCity(item.city || '');
                  setAddress(item.address || '');
                }} style={{ padding: 10, borderRadius: 8, backgroundColor: selectedAddressId === item.id ? '#F0F4FF' : '#fff', marginBottom: 8, borderWidth: 1, borderColor: '#f0f0f0' }}>
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
              // const selected = addresses.find((a) => a.id === selectedAddressId) ?? null;
              // Build payload matching CreateOrderDto from Swagger
              const payload: any = {
                shippingFullName: fullName,
                shippingPhone: phone,
                shippingAddress: address,
                shippingCity: city,
                shippingState: selectedState,
                shippingNotes: '',
                customerNotes: '',
                promoCode: '',
                shippingCost: 5000,
                tax: 0,
                discount: 0
              };

              console.log({ payload });

              try {
                console.log('[Checkout] Creating order with payload:', JSON.stringify(payload, null, 2));
                const res = await createOrder(payload);
                console.log('[Checkout] Order creation response:', res);
                if (res?.ok) {
                  const orderId = res.data?.id ?? res.data?.data?.id ?? res.data;
                  if (orderId && typeof orderId === 'string') {
                    router.push({ pathname: '/payment', params: { orderId } });
                  } else {
                    router.push('/payment');
                  }
                } else {
                  console.error('[Checkout] Order creation failed:', res);
                  Alert.alert('Order Creation Failed', `Status: ${res?.status}\nError: ${res?.data?.title || res?.data?.message || JSON.stringify(res?.data)}`);
                }
              } catch (e: any) {
                console.error('[Checkout] Order creation error:', e);
                Alert.alert('Error', `Order creation threw an error: ${e?.message || JSON.stringify(e)}`);
              }
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.payBtnText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal 
        visible={showStateModal} 
        animationType="slide" 
        transparent={true}
        onRequestClose={() => setShowStateModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowStateModal(false)}
        >
          <View 
            style={styles.modalContent} 
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State</Text>
              <TouchableOpacity onPress={() => setShowStateModal(false)}>
                <Ionicons name="close" size={24} color="#273054" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={NIGERIAN_STATES}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.stateRow, selectedState === item && styles.stateRowSelected]}
                  onPress={() => {
                    setSelectedState(item);
                    setShowStateModal(false);
                  }}
                >
                  <Text style={[styles.stateText, selectedState === item && styles.stateTextSelected]}>
                    {item}
                  </Text>
                  {selectedState === item && <Ionicons name="checkmark-circle" size={20} color="#e24a43" />}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%', paddingBottom: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalTitle: { fontSize: 16, fontWeight: '600', color: '#273054' },
  stateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  stateRowSelected: { backgroundColor: '#FFF5F5' },
  stateText: { fontSize: 15, color: '#333' },
  stateTextSelected: { fontWeight: '600', color: '#e24a43' },
});
