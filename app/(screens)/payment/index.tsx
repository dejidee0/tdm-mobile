import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentScreen() {
  const router = useRouter();
  const [card, setCard] = useState('');
  const [holder, setHolder] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FB' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <IconSymbol name="chevron.left" size={20} color="#263a63" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Payment</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ThemedView style={styles.container}>
        <View style={styles.cardRow}>
          <Image source={require('@/assets/images/products/chair1.jpg')} style={styles.thumb} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <ThemedText type="defaultSemiBold">Mini sit me</ThemedText>
            <ThemedText style={{ color: '#9aa3a7', marginTop: 6, fontSize: 12 }}>EST: 15 WORKING DAYS</ThemedText>
          </View>
          <ThemedText style={{ fontWeight: '700' }}>N80,000</ThemedText>
        </View>

        <View style={styles.formCard}>
          <ThemedText style={{ marginBottom: 12 }}>Card number</ThemedText>
          <TextInput value={card} onChangeText={setCard} placeholder="5627 2158 9854 8869" style={styles.input} />

          <ThemedText style={{ marginTop: 12 }}>Card Holder</ThemedText>
          <TextInput value={holder} onChangeText={setHolder} placeholder="Najeeb Abubakar" style={styles.input} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <ThemedText style={{ marginTop: 12 }}>Expires Date</ThemedText>
              <TextInput value={exp} onChangeText={setExp} placeholder="12/08" style={styles.input} />
            </View>
            <View style={{ width: 120 }}>
              <ThemedText style={{ marginTop: 12 }}>CVV</ThemedText>
              <TextInput value={cvv} onChangeText={setCvv} placeholder="123" style={styles.input} keyboardType="number-pad" />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.payBtn} activeOpacity={0.9} onPress={() => router.replace('/order-placement/order-success')}>
          <ThemedText style={{ color: '#fff', fontWeight: '700' }}>Pay Now</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { height: 80, paddingHorizontal: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '700', color: '#263a63' },
  container: { padding: 14 },
  cardRow: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 18 },
  thumb: { width: 90, height: 90, borderRadius: 8, backgroundColor: '#f2f4f6' },
  formCard: { backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 18 },
  input: { height: 40, borderBottomWidth: 1, borderBottomColor: '#e6eaec', marginTop: 6 },
  payBtn: { height: 56, borderRadius: 12, backgroundColor: '#263a63', alignItems: 'center', justifyContent: 'center' },
});
