import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeliveryAddressScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('@app_addresses');
        const list = raw ? JSON.parse(raw) : [];
        setAddresses(list);
        try {
          if (list && list.length) console.log('[DeliveryAddress] first saved address', list[0]);
        } catch {}
      } catch {
        setAddresses([]);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#D4AF37" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Address</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {addresses.length ? (
          addresses.map((a) => (
            <View key={a.id} style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>{a.name}</Text>
                <Text style={styles.cardAddress}>{a.address}</Text>
                <Text style={styles.cardPhone}>{a.phone}</Text>
              </View>
              <TouchableOpacity style={styles.editIcon} onPress={() => router.push('/delivery-address/add')}>
                <Ionicons name="pencil" size={18} color="#D4AF37" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={{ color: '#999', marginBottom: 12 }}>No saved addresses</Text>
        )}

        <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/delivery-address/add')} activeOpacity={0.8}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addBtnText}>Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000000' },
  header: { height: 60, paddingHorizontal: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#000000', borderBottomWidth: 0, borderBottomColor: 'transparent' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#D4AF37' },
  container: { padding: 20, paddingBottom: 40 },
  card: { padding: 16, backgroundColor: '#252523', borderRadius: 12, marginBottom: 20, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  cardName: { fontWeight: '600', fontSize: 15, color: '#D4AF37', marginBottom: 6 },
  cardAddress: { color: '#FFFFFF', fontSize: 13, lineHeight: 18, marginBottom: 8 },
  cardPhone: { color: '#FFFFFF', fontSize: 13 },
  editIcon: { marginLeft: 'auto', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: '#494845', borderRadius: 8 },
  addBtn: { backgroundColor: '#D4AF37', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, borderWidth: 0 },
  addBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
});
