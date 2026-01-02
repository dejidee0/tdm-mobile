import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeliveryAddressScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FB' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <IconSymbol name="chevron.left" size={20} color="#263a63" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Delivery Address</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ThemedView style={styles.container}>
        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginLeft: 12 }}>
              <ThemedText type="defaultSemiBold">Najeeb Abubakar</ThemedText>
              <ThemedText style={{ color: '#9aa3a7', marginTop: 6, maxWidth: 260 }}>Third Ave, Lekki phase 1, Lagos, Nigeria</ThemedText>
              <ThemedText style={{ color: '#9aa3a7', marginTop: 6 }}>+234 7060 868580</ThemedText>
            </View>
            <TouchableOpacity style={styles.editIcon} onPress={() => router.push('/delivery-address/add')}>
              <Ionicons name="pencil" size={18} color="#263a63" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/delivery-address/add') } activeOpacity={0.8}>
          <ThemedText style={{ color: '#263a63' }}>Add new address</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { height: 80, paddingHorizontal: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '700', color: '#263a63' },
  container: { padding: 18, paddingTop: 28 },
  card: { padding: 18, backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, marginBottom: 24 },
  cardAvatar: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#f2f4f6' },
  editIcon: { position: 'absolute', right: 14, top: 14 },
  addBtn: { backgroundColor: '#f2f4f6', height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
