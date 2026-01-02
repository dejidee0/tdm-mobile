import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ORDERS = [
  { id: '1', title: 'Mini sit me', price: 'N80,000', image: require('@/assets/images/products/chair1.jpg') },
  { id: '2', title: 'Mini sit me', price: 'N80,000', image: require('@/assets/images/products/chair1.jpg') },
  { id: '3', title: 'Mini sit me', price: 'N80,000', image: require('@/assets/images/products/chair1.jpg') },
];

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FB' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <IconSymbol name="chevron.left" size={20} color="#263a63" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>My Order</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ThemedView style={styles.container}>
        <FlatList
          data={ORDERS}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => router.push(`/orders/${item.id}`)}>
              <Image source={item.image} style={styles.thumb} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                <ThemedText style={{ color: '#9aa3a7', marginTop: 6, fontSize: 12 }}>EST: 15 WORKING DAYS</ThemedText>
              </View>
              <ThemedText style={{ fontWeight: '700' }}>{item.price}</ThemedText>
            </TouchableOpacity>
          )}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { height: 80, paddingHorizontal: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '700', color: '#263a63' },
  container: { padding: 14 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 12 },
  thumb: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#f2f4f6' },
});
