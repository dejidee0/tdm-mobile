import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeliveryAddressScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#273054" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Address</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardName}>Najeeb Abubakar</Text>
            <Text style={styles.cardAddress}>Third Ave, Lekki phase 1, Lagos, Nigeria</Text>
            <Text style={styles.cardPhone}>+234 7060 868580</Text>
          </View>
          <TouchableOpacity style={styles.editIcon} onPress={() => router.push('/delivery-address/add')}>
            <Ionicons name="pencil" size={18} color="#273054" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/delivery-address/add')} activeOpacity={0.8}>
          <Ionicons name="add" size={20} color="#273054" />
          <Text style={styles.addBtnText}>Add New Address</Text>
        </TouchableOpacity>
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
  card: { padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 20, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  cardName: { fontWeight: '600', fontSize: 15, color: '#273054', marginBottom: 6 },
  cardAddress: { color: '#999', fontSize: 13, lineHeight: 18, marginBottom: 8 },
  cardPhone: { color: '#999', fontSize: 13 },
  editIcon: { marginLeft: 'auto', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: 8 },
  addBtn: { backgroundColor: '#fff', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, borderWidth: 1.5, borderColor: '#f0f0f0' },
  addBtnText: { color: '#273054', fontWeight: '600', fontSize: 15 },
});
