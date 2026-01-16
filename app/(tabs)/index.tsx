import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: 'popular', title: 'Popular', icon: require('@/assets/images/icons/popular.png') },
  { id: 'chair', title: 'Chair', icon: require('@/assets/images/icons/chair.png') },
  { id: 'workstation', title: 'Workstation', icon: require('@/assets/images/icons/table.png') },
  { id: 'living', title: 'Living room', icon: require('@/assets/images/icons/livingroom.png') },
  { id: 'bed', title: 'Bedroom', icon: require('@/assets/images/icons/bedroom.png') },
  { id: 'lamp', title: 'Lamp', icon: require('@/assets/images/icons/lamp.png') },
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
  const [searchFocused, setSearchFocused] = React.useState(false);

  function openCategory(id: string) {
    router.push({
      pathname: '/categories/[id]',
      params: { id: String(id) },
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <ImageBackground source={require('@/assets/images/homehero.png')} style={styles.header} imageStyle={styles.headerImage}>
          <ThemedText type="title" style={styles.headerTitle}>Spaces Built Smarter</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Discover premium furniture & decor</ThemedText>

          <View style={styles.searchRow}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              placeholder="Search items..."
              style={[styles.searchInput, searchFocused && styles.searchInputFocused]}
              placeholderTextColor="#999"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </View>
        </ImageBackground>

        {/* Main Content Card */}
        <View style={styles.card}>
          {/* Categories Section */}
          <View style={styles.categoriesSection}>
            <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            >
              {categories.map((c, idx) => (
                <TouchableOpacity key={c.id} onPress={() => openCategory(c.id)} activeOpacity={0.7}>
                  <View style={[styles.categoryItem, idx === 0 && styles.categoryItemActive]}>
                    <Image
                      source={c.icon}
                      style={styles.categoryIcon}
                    />
                  </View>
                  <ThemedText style={[styles.catText, idx === 0 && styles.catTextActive]}>{c.title}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Latest Release Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Latest Release</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.seeAllLink}>See all →</ThemedText>
              </TouchableOpacity>
            </View>

            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 12, paddingHorizontal: 16, marginBottom: 16 }}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.productCard}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => router.push({ pathname: '/product-details', params: { id: item.id } })}
                  >
                    <Image source={item.image} style={styles.productImage} />
                  </TouchableOpacity>

                  <View style={styles.productInfo}>
                    <ThemedText style={styles.productTitle}>{item.title}</ThemedText>
                    <ThemedText style={styles.productPrice}>{item.price}</ThemedText>
                  </View>

                  <TouchableOpacity style={styles.heart}>
                    <Ionicons name="heart-outline" size={22} color="#222a44" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          {/* Banner Section */}
          <View style={styles.bannerContainer}>
            <LinearGradient
              colors={['#7F8ECB', '#6977B0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.banner}
            >
              <View style={styles.bannerContent}>
                <ThemedText style={styles.bannerTitle}>Virtual Reality Showroom</ThemedText>
                <ThemedText style={styles.bannerSubtitle}>View our latest furniture collections in VR</ThemedText>
              </View>
              <Image source={require('@/assets/images/vr.png')} style={styles.bannerImage} />
            </LinearGradient>
          </View>

          {/* Second Latest Release */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Trending Now</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.seeAllLink}>See all →</ThemedText>
              </TouchableOpacity>
            </View>

            <FlatList
              data={latestRelease}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 12, paddingHorizontal: 16, marginBottom: 16 }}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.productCard}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => router.push({ pathname: '/product-details', params: { id: item.id } })}
                  >
                    <Image source={item.image} style={styles.productImage} />
                  </TouchableOpacity>

                  <View style={styles.productInfo}>
                    <ThemedText style={styles.productTitle}>{item.title}</ThemedText>
                    <ThemedText style={styles.productPrice}>{item.price}</ThemedText>
                  </View>

                  <TouchableOpacity style={styles.heart}>
                    <Ionicons name="heart-outline" size={22} color="#222a44" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#222a44',
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 330,
  },
  headerImage: {
    opacity: 0.8,
    resizeMode: 'cover',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 6,
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 24,
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    width: '100%',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#222a44',
  },
  searchInputFocused: {
    color: '#222a44',
  },
  card: {
    marginTop: -30,
    paddingTop: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  categoryScroll: {
    height: 100,
  },
  categoryWrapper: {
    alignItems: 'center',
    width: 72,
  },
  categoryItem: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryItemActive: {
    backgroundColor: '#222a44',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  catText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    textAlign: 'center',
    width: 72,
  },
  catTextActive: {
    color: '#222a44',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  seeAllLink: {
    color: '#273054',
    fontSize: 12,
    fontWeight: '600',
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
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  productPrice: {
    fontWeight: '700',
    fontSize: 14,
    color: '#222a44',
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
  bannerContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 16,
    gap: 12,
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    gap: 8,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
  },
  bannerButton: {
    backgroundColor: '#e24a43',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  bannerButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bannerImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
});
