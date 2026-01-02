import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckoutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FB' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <IconSymbol name="chevron.left" size={20} color="#263a63" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Checkout</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ThemedView style={styles.container}>
        <View style={styles.selectBox}>
          <ThemedText style={{ color: '#263a63' }}>Select delivery state</ThemedText>
          <View style={styles.dropdown}>
            <ThemedText>Lagos - N5000</ThemedText>
            <IconSymbol name="chevron.right" size={18} color="#9aa3a7" />
          </View>
        </View>

        <ThemedText style={{ marginTop: 14, marginBottom: 8 }}>Delivery Details</ThemedText>
        <View style={styles.formBox}>
          <View style={styles.input} />
          <View style={styles.input} />
          <View style={styles.input} />
          <View style={styles.input} />
          <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.radio} />
            <ThemedText style={{ marginLeft: 8 }}>Save Address</ThemedText>
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <View style={styles.summaryCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <ThemedText>Subtotal</ThemedText>
              <ThemedText>N75,000</ThemedText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <ThemedText>Shipping</ThemedText>
              <ThemedText>N5,000</ThemedText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
              <ThemedText type="defaultSemiBold">Total</ThemedText>
              <ThemedText type="defaultSemiBold">N80,000</ThemedText>
            </View>

            <TouchableOpacity style={styles.payBtn} onPress={() => router.push('/payment')} activeOpacity={0.9}>
              <ThemedText style={{ color: '#fff', fontWeight: '700' }}>Pay Now</ThemedText>
            </TouchableOpacity>
          </View>
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
  selectBox: { marginBottom: 12 },
  dropdown: { height: 56, borderRadius: 12, backgroundColor: '#fff', marginTop: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#e6eaec' },
  formBox: { marginTop: 6 },
  input: { height: 48, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#e6eaec' },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: '#9aa3a7' },
  summaryCard: { marginTop: 18, backgroundColor: '#fff', padding: 18, borderRadius: 12 },
  payBtn: { marginTop: 18, height: 56, borderRadius: 12, backgroundColor: '#263a63', alignItems: 'center', justifyContent: 'center' },
});
