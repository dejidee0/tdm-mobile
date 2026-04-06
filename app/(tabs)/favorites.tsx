import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSaved } from '../../context/SavedContext';

export default function FavoritesScreen() {
  const router = useRouter();
  const { savedItems, toggleSaved, fetchSavedItems } = useSaved();

  useEffect(() => {
    fetchSavedItems();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#273054" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Favorites</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      {/* Products Grid */}
      <ScrollView style={styles.container}>
        {savedItems && savedItems.length > 0 ? (
          <FlatList
            data={savedItems}
            keyExtractor={(i) => i.id || i.productId || Math.random().toString()}
            numColumns={2}
            columnWrapperStyle={{ gap: 12, paddingHorizontal: 16, marginBottom: 16 }}
            contentContainerStyle={{ paddingVertical: 16, paddingBottom: 20 }}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const product = item.product || item.item || item;
              return (
              <View style={styles.productCard}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => router.push({ pathname: '/product-details', params: { id: product.id } })}
                >
                  <Image source={typeof product.image === 'string' ? { uri: product.image } : (product.image?.[0] || product.primaryImageUrl || product.image || require('@/assets/images/placeholder.jpg'))} style={styles.productImage} />
                </TouchableOpacity>

                <View style={styles.productInfo}>
                  <ThemedText style={styles.productTitle}>{product.brandName || product.name || product.title || 'Product'}</ThemedText>
                  <ThemedText style={styles.productPrice}>{product.priceDisplay || product.price}</ThemedText>
                  <TouchableOpacity onPress={() => router.push('/ar-view')}>
                    <ThemedText style={styles.tryNowLink}>Try now →</ThemedText>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.heart} onPress={() => toggleSaved(product.id)}>
                  <Ionicons name="trash-outline" size={20} color="#e24a43" />
                </TouchableOpacity>
              </View>
            )}}
          />
        ) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ThemedText style={{ color: '#999' }}>No favorites yet — add items to see them here.</ThemedText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerBack: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: '#273054',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    padding: 12,
    gap: 4,
  },
  productTitle: {
    color: '#AAAAAA',
    fontSize: 12,
    fontWeight: '500',
  },
  productPrice: {
    fontWeight: '900',
    fontSize: 14,
    color: '#273054',
  },
  tryNowLink: {
    color: '#273054',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  heart: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
