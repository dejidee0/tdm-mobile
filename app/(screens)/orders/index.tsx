import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ORDERS = [
  { id: '1', title: 'Mini sit me', price: 'N80,000', image: require('@/assets/images/products/chair1.jpg') },
  { id: '2', title: 'Mini sit me', price: 'N80,000', image: require('@/assets/images/products/chair1.jpg') },
  { id: '3', title: 'Mini sit me', price: 'N80,000', image: require('@/assets/images/products/chair1.jpg') },
];

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#222a44" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <FlatList
          data={ORDERS}
          keyExtractor={(i) => i.id}
          scrollEnabled={true}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => router.push(`/orders/${item.id}`)} activeOpacity={0.7}>
              <Image source={item.image} style={styles.thumb} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardEstimate}>EST: 15 WORKING DAYS</Text>
              </View>
              <Text style={styles.cardPrice}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 60, paddingHorizontal: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#222a44' },
  container: { flex: 1, backgroundColor: '#fff' },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#fff', borderRadius: 12, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  thumb: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#f5f5f5' },
  cardInfo: { flex: 1, marginLeft: 14, gap: 4 },
  cardTitle: { fontWeight: '600', fontSize: 14, color: '#222a44' },
  cardEstimate: { fontSize: 12, color: '#999' },
  cardPrice: { fontWeight: '700', fontSize: 15, color: '#222a44' },
});
