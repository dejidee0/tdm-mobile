import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../../../context/ProductsContext';
import { useSaved } from '../../../context/SavedContext';

const { width } = Dimensions.get('window');


function capitalize(s?: string) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CategoryScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const slug = (params.slug as string) || 'category';
  const { fetchProducts, products } = useProducts();
  const { isSaved, toggleSaved } = useSaved();

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!slug) return;
      await fetchProducts(`category=${encodeURIComponent(slug)}`);
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#273054" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{capitalize(slug)}</Text>
        <TouchableOpacity style={styles.filter}>
          <Ionicons name="options" size={20} color="#273054" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {products && products.length ? (
          <FlatList
            data={products}
            keyExtractor={(i) => i.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => router.push({ pathname: '/product-details', params: { id: item.id } })}>
                  <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.productImage} />
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productPrice}>{item.price ?? item.priceText ?? ''}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.heart} onPress={() => toggleSaved(item.id)}>
                  <Ionicons name={isSaved(item.id) ? "heart" : "heart-outline"} size={20} color={isSaved(item.id) ? "#e24a43" : "#273054"} />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#999' }}>No products found in this category.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 60, paddingHorizontal: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  filter: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#273054' },
  container: { flex: 1, paddingVertical: 16, backgroundColor: '#fff' },
  productCard: { backgroundColor: '#fff', width: (width - 48) / 2, borderRadius: 12, overflow: 'hidden', marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  productImage: { width: '100%', height: 140, backgroundColor: '#f5f5f5' },
  productTitle: { color: '#999', fontSize: 13, fontWeight: '500', padding: 10, paddingBottom: 4 },
  productPrice: { fontWeight: '900', fontSize: 14, color: '#273054', paddingHorizontal: 10, paddingBottom: 10 },
  heart: { position: 'absolute', right: 10, top: 10, backgroundColor: '#fff', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
});
