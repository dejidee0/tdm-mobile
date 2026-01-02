import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const PRODUCTS = [
  { id: '1', title: 'Sverom chair', price: 'N65,000', image: require('@/assets/images/products/chair1.jpg') },
  { id: '2', title: 'Sverom chair', price: 'N65,000', image: require('@/assets/images/products/chair2.jpg') },
  { id: '3', title: 'Sverom chair', price: 'N65,000', image: require('@/assets/images/products/chair3.jpg') },
  { id: '4', title: 'Sverom chair', price: 'N65,000', image: require('@/assets/images/products/chair4.png') },
];

export default function FavoritesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FB' }}>
      <View style={styles.headerWrap}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={20} color="#263a63" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Favorites</ThemedText>
        <View></View>
      </View>

      <ThemedView style={styles.container}>
        <FlatList
          data={PRODUCTS}
          keyExtractor={(i) => i.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-evenly' }}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />
              <TouchableOpacity style={styles.heart}><ThemedText>♡</ThemedText></TouchableOpacity>
              <ThemedText style={styles.productTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.productPrice}>{item.price}</ThemedText>
            </View>
          )}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrap: { height: 80, paddingHorizontal: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' },
  back: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  filter: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#263a63' },
  container: { marginTop: 10, paddingVertical: 18, paddingBottom: 28, minHeight: 520 },
  productCard: { backgroundColor: '#fff', width: (width - 56) / 2, borderRadius: 12, padding: 10, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8 },
  productImage: { width: '100%', height: 120, borderRadius: 8, marginBottom: 8 },
  heart: { position: 'absolute', right: 12, top: 12, backgroundColor: '#fff', width: 34, height: 34, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  productTitle: { color: '#9aa3a7', fontSize: 13 },
  productPrice: { fontWeight: '700', marginTop: 6 },
});
