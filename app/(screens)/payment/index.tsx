import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentScreen() {
  const router = useRouter();
  const [card, setCard] = useState('');
  const [holder, setHolder] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');
  const [focusedInput, setFocusedInput] = useState<any>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#222a44" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardRow}>
          <Image source={require('@/assets/images/products/chair1.jpg')} style={styles.thumb} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Mini sit me</Text>
            <Text style={styles.cardEstimate}>EST: 15 WORKING DAYS</Text>
          </View>
          <Text style={styles.cardPrice}>N80,000</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput value={card} onChangeText={setCard} placeholder="5627 2158 9854 8869" style={[styles.input, focusedInput === 'card' && styles.inputFocused]} placeholderTextColor="#ccc" onFocus={() => setFocusedInput('card')} onBlur={() => setFocusedInput(null)} />

          <Text style={[styles.label, { marginTop: 16 }]}>Card Holder</Text>
          <TextInput value={holder} onChangeText={setHolder} placeholder="Najeeb Abubakar" style={[styles.input, focusedInput === 'holder' && styles.inputFocused]} placeholderTextColor="#ccc" onFocus={() => setFocusedInput('holder')} onBlur={() => setFocusedInput(null)} />

          <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { marginTop: 16 }]}>Expires Date</Text>
              <TextInput value={exp} onChangeText={setExp} placeholder="12/08" style={[styles.input, focusedInput === 'exp' && styles.inputFocused]} placeholderTextColor="#ccc" onFocus={() => setFocusedInput('exp')} onBlur={() => setFocusedInput(null)} />
            </View>
            <View style={{ width: 100 }}>
              <Text style={[styles.label, { marginTop: 16 }]}>CVV</Text>
              <TextInput value={cvv} onChangeText={setCvv} placeholder="123" style={[styles.input, focusedInput === 'cvv' && styles.inputFocused]} keyboardType="number-pad" placeholderTextColor="#ccc" onFocus={() => setFocusedInput('cvv')} onBlur={() => setFocusedInput(null)} />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.payBtn} activeOpacity={0.8} onPress={() => router.replace('/order-placement/order-success')}>
          <Text style={styles.payBtnText}>Pay Now</Text>
        </TouchableOpacity>
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
  cardRow: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#fff', borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  thumb: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#f5f5f5' },
  cardInfo: { flex: 1, marginLeft: 12, gap: 4 },
  cardTitle: { fontWeight: '600', fontSize: 14, color: '#222a44' },
  cardEstimate: { fontSize: 12, color: '#999' },
  cardPrice: { fontWeight: '700', fontSize: 14, color: '#222a44' },
  formCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  label: { fontSize: 13, fontWeight: '600', color: '#222a44', marginBottom: 8 },
  input: { height: 44, backgroundColor: '#f5f5f5', borderRadius: 10, paddingHorizontal: 12, fontSize: 14, color: '#222a44', borderWidth: 1, borderColor: '#f0f0f0' },
  inputFocused: { borderColor: '#222a44', borderWidth: 2, backgroundColor: '#fff' },
  payBtn: { height: 48, borderRadius: 10, backgroundColor: '#222a44', alignItems: 'center', justifyContent: 'center', shadowColor: '#222a44', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  payBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
