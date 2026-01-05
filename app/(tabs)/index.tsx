import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const categories = [
  { id: 'popular', title: 'Popular', image: require('@/assets/images/icons/popular.png') },
  { id: 'chair', title: 'Chair', image: require('@/assets/images/icons/chair.png') },
  { id: 'workstation', title: 'Workstation', image: require('@/assets/images/icons/table.png') },
  { id: 'living', title: 'Living room', image: require('@/assets/images/icons/livingroom.png') },
  { id: 'bed', title: 'Bedroom', image: require('@/assets/images/icons/bedroom.png') },
  { id: 'lamp', title: 'Lamp', image: require('@/assets/images/icons/lamp.png') },
];

const products = [
  {
    id: '1',
    title: 'Sverom chair',
    price: 'N65,000',
    image: require('@/assets/images/products/chair1.jpg'),
  },
  {
    id: '2',
    title: 'Sverom chair',
    price: 'N65,000',
    image: require('@/assets/images/products/chair2.jpg'),
  },
  {
    id: '3',
    title: 'Sverom chair',
    price: 'N65,000',
    image: require('@/assets/images/products/chair3.jpg'),
  },
  {
    id: '4',
    title: 'Sverom chair',
    price: 'N65,000',
    image: require('@/assets/images/products/chair4.png'),
  },
];

const latestRelease = [
  {
    id: '1',
    title: 'Sverom chair',
    price: 'N65,000',
    image: require('@/assets/images/products/latest-release/release1.jpg'),
  },
  {
    id: '2',
    title: 'Sverom chair',
    price: 'N65,000',
    image: require('@/assets/images/products/latest-release/release2.jpg'),
  },
];

export default function HomeScreen() {
  const router = useRouter();

  function openCategory(id: string) {
    router.push({
      pathname: '/categories/[id]',
      params: { id: String(id) },
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground source={require('@/assets/images/homehero.png')} style={styles.header} imageStyle={{ opacity: 0.8 }}>
          <ThemedText type="title" style={styles.headerTitle}>Spaces Built Smarter</ThemedText>

          <View style={styles.searchRow}>
            <TextInput placeholder="Search Item" style={styles.searchInput} />
          </View>
        </ImageBackground>

        <ThemedView style={styles.card}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={{ paddingHorizontal: 14 }}>
            {categories.map((c, idx) => (
              <TouchableOpacity key={c.id} style={styles.categoryWrapper} onPress={() => openCategory(c.id)}>
                <View style={[styles.categoryItem, idx === 0 && styles.categoryItemActive]}>
                  <Image source={c.image} style={styles.catIcon} />
                </View>
                <ThemedText style={styles.catText}>{c.title}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Latest Release</ThemedText>
            <TouchableOpacity>
              <ThemedText style={{ color: '#263a63' }}>See all →</ThemedText>
            </TouchableOpacity>
          </View>

          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-evenly' }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => router.push({ pathname: '/product-details', params: { id: item.id } })}
                >
                  <Image source={item.image} style={styles.productImage} />
                  <ThemedText style={styles.productTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.productPrice}>{item.price}</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.heart}>
                  <Ionicons name="heart-outline" size={20} color="#263a63" />
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.banner}>
            <View style={{ flex: 1 }}>
              <ThemedText type="subtitle" style={{ color: '#fff' }}>Virtual Reality Showroom</ThemedText>
              <ThemedText style={{ color: '#fff', marginTop: 6, fontSize: 10, lineHeight: 14 }}>Allows you to view our showrooms containing our latest furniture collections</ThemedText>
            </View>
            <Image source={require('@/assets/images/vr.png')} style={styles.bannerImage} />
          </View>

          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Latest Release</ThemedText>
            <TouchableOpacity>
              <ThemedText style={{ color: '#263a63' }}>See all →</ThemedText>
            </TouchableOpacity>
          </View>

          <FlatList
            data={latestRelease}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-evenly' }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={item.image} style={styles.productImage} />
                <TouchableOpacity style={styles.heart}>
                  <Ionicons name="heart-outline" size={20} color="#263a63" />
                </TouchableOpacity>
                <ThemedText style={styles.productTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.productPrice}>{item.price}</ThemedText>
              </View>
            )}
          />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F9FB' },
  container: { paddingBottom: 40 },
  header: { height: 220, paddingHorizontal: 20, paddingTop: 24, justifyContent: 'center' },
  headerTitle: { color: '#fff', textAlign: 'center', fontSize: 22, fontWeight: '700', marginBottom: 14 },
  searchRow: { alignItems: 'center' },
  searchInput: { backgroundColor: '#fff', width: '92%', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, elevation: 2 },
  card: { marginTop: -36, borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: '#fff', paddingVertical: 18, paddingBottom: 28, minHeight: 520 },
  categoryScroll: { marginTop: 6, height: 92 },
  categoryWrapper: { alignItems: 'center', marginRight: 12, width: 72 },
  categoryItem: { width: 72, height: 72, borderRadius: 18, backgroundColor: '#f2f4f6', marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  categoryItemActive: { backgroundColor: '#222a44' },
  catIcon: { width: 25, height: 25, marginBottom: 6 },
  catText: { fontSize: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, marginTop: 12, marginBottom: 8 },
  productCard: { backgroundColor: '#fff', width: (width - 56) / 2, borderRadius: 12, padding: 10, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8 },
  productImage: { width: '100%', height: 100, borderRadius: 8, marginBottom: 8 },
  heart: { position: 'absolute', right: 12, top: 12, backgroundColor: '#fff', width: 34, height: 34, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  productTitle: { color: '#9aa3a7', fontSize: 13 },
  productPrice: { fontWeight: '700', marginTop: 6 },
  banner: { flexDirection: 'row', alignItems: 'center', marginTop: 12, marginHorizontal: 14, padding: 14, borderRadius: 12, backgroundColor: '#6f7fbf', marginBottom: 20 },
  bannerImage: { width: 120, height: 72, marginRight: 12, opacity: 0.9 },
});
