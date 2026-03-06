import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../../context/ProductsContext';
import { useSaved } from '../../context/SavedContext';

export default function HomeScreen() {
  const router = useRouter();
  const [searchFocused, setSearchFocused] = useState(false);
  const { fetchProducts, fetchFeatured, products: ctxProducts, featured: ctxFeatured } = useProducts();
  const { isSaved, toggleSaved } = useSaved();
  const [productsData, setProductsData] = useState<any[]>([]);
  const [latestData, setLatestData] = useState<any[]>([]);
  const { fetchCategories, categories: ctxCategories } = useProducts();
  const cats = (ctxCategories && ctxCategories.length) ? ctxCategories : [];

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const headerScale = useRef(new Animated.Value(0.8)).current;
  const searchBarAnim = useRef(new Animated.Value(0)).current;
  const categoryAnims = useRef(Array(20).fill(0).map(() => new Animated.Value(0))).current;
  const productAnims = useRef(Array(20).fill(0).map(() => new Animated.Value(0))).current;
  const bannerAnim = useRef(new Animated.Value(0)).current;
  const trendingAnims = useRef(Array(20).fill(0).map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // fetch live products & featured
    (async () => {
      try {
        const p = await fetchProducts();
        if (p && Array.isArray(p)) setProductsData(p);
      } catch {}
      try {
        const f = await fetchFeatured();
        if (f && Array.isArray(f)) setLatestData(f);
      } catch {}
      try {
        await fetchCategories();
      } catch {}
    })();

    // Sequence all animations
    Animated.sequence([
      // Header animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(headerScale, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      // Search bar animation
      Animated.spring(searchBarAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),

      // Card slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Stagger category animations
    const categoryAnimations = categoryAnims.map((anim, index) =>
      Animated.spring(anim, {
        toValue: 1,
        delay: 600 + index * 80,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    );
    Animated.parallel(categoryAnimations).start();

    // Stagger product animations
    const productAnimations = productAnims.map((anim, index) =>
      Animated.spring(anim, {
        toValue: 1,
        delay: 1000 + index * 100,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      })
    );
    Animated.parallel(productAnimations).start();

    // Banner animation
    Animated.spring(bannerAnim, {
      toValue: 1,
      delay: 1600,
      tension: 40,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Trending animations
    const trendingAnimations = trendingAnims.map((anim, index) =>
      Animated.spring(anim, {
        toValue: 1,
        delay: 2000 + index * 100,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      })
    );
    Animated.parallel(trendingAnimations).start();
  }, []);

  function openCategory(id: string) {
    router.push({
      pathname: '/categories/[slug]',
      params: { slug: String(id) },
    });
  }

  const searchBarScale = searchBarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  const searchBarOpacity = searchBarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <ImageBackground source={require('@/assets/images/homehero.png')} style={styles.header} imageStyle={styles.headerImage}>
          <LinearGradient
            colors={['#273054B0', '#414D7982']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ scale: headerScale }],
            }}
          >
            <ThemedText type="title" style={styles.headerTitle}>Spaces Built Smarter</ThemedText>
            <ThemedText style={styles.headerSubtitle}>Discover premium furniture & decor</ThemedText>
          </Animated.View>

          <Animated.View
            style={[
              styles.searchRow,
              {
                opacity: searchBarOpacity,
                transform: [{ scale: searchBarScale }],
              },
            ]}
          >
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              placeholder="Search items..."
              style={[styles.searchInput, searchFocused && styles.searchInputFocused]}
              placeholderTextColor="#999"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </Animated.View>
        </ImageBackground>

        {/* Main Content Card */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Categories Section (hide if empty) */}
          {cats && cats.length > 0 && (
            <View style={styles.categoriesSection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
              >
                {cats.map((c, idx) => {
                  const anim = categoryAnims[idx % categoryAnims.length];
                  const categoryScale = anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  });

                  return (
                    <TouchableOpacity key={c.id || c.slug || String(idx)} onPress={() => openCategory(c.id || c.slug || c.name)} activeOpacity={0.7}>
                      <Animated.View
                        style={{
                          opacity: anim,
                          transform: [{ scale: categoryScale }],
                        }}
                      >
                        <View style={[styles.categoryItem, idx === 0 && styles.categoryItemActive]}>
                          {c.icon ? (
                            <Image source={typeof c.icon === 'string' ? { uri: c.icon } : c.icon} style={styles.categoryIcon} />
                          ) : c.imageUrl ? (
                            <Image source={{ uri: c.imageUrl }} style={styles.categoryIcon} />
                          ) : (
                            <View style={{ width: 32, height: 32 }} />
                          )}
                        </View>
                        <ThemedText style={[styles.catText, idx === 0 && styles.catTextActive]}>{c.title || c.name}</ThemedText>
                      </Animated.View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* Latest Release Section */}
          {productsData && productsData.length > 0 && (
            <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Latest Release</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.seeAllLink}>See all →</ThemedText>
              </TouchableOpacity>
            </View>

            <FlatList
              data={productsData}
              keyExtractor={(item: any) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 12, paddingHorizontal: 16, marginBottom: 16 }}
              scrollEnabled={false}
              renderItem={({ item, index }: { item: any; index: number }) => {
                const anim = productAnims[index % productAnims.length];
                const productScale = anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                });

                const productTranslateY = anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                });

                return (
                      <Animated.View
                    style={[
                      styles.productCard,
                      {
                        opacity: anim,
                        transform: [{ scale: productScale }, { translateY: productTranslateY }],
                      },
                    ]}
                  >
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => router.push({ pathname: '/product-details', params: { id: item.id } })}
                    >
                      <Image source={typeof item.image === 'string' ? item.image[0] || item.primaryImageUrl : item.image[0] || item.primaryImageUrl} style={styles.productImage} />
                    </TouchableOpacity>

                    <View style={styles.productInfo}>
                      <ThemedText style={styles.productTitle}>{item.brandName}</ThemedText>
                      <ThemedText style={styles.productPrice}>{item.price}</ThemedText>
                      <TouchableOpacity onPress={() => router.push('/ar-view')}>
                        <ThemedText style={styles.tryNowLink}>Try now →</ThemedText>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.heart} onPress={() => toggleSaved(item.id)}>
                      <Ionicons name={isSaved(item.id) ? "heart" : "heart-outline"} size={22} color={isSaved(item.id) ? "#e24a43" : "#273054"} />
                    </TouchableOpacity>
                  </Animated.View>
                );
              }}
            />
            </View>
          )}

          {/* Banner Section */}
          <Animated.View
            style={[
              styles.bannerContainer,
              {
                opacity: bannerAnim,
                transform: [
                  {
                    scale: bannerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
              },
            ]}
          >
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
          </Animated.View>

          <Animated.View
            style={[
              styles.bannerContainer,
              {
                opacity: bannerAnim,
                transform: [
                  {
                    scale: bannerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={['#7F8ECB', '#6977B0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.banner}
            >
              <View style={styles.bannerContent}>
                <ThemedText style={styles.bannerTitle}>AI Estimator Tool</ThemedText>
                <ThemedText style={styles.bannerSubtitle}>Get instant renovation costs with our AI-powered scanner</ThemedText>

                <TouchableOpacity style={styles.bannerButton} onPress={() => router.push('/ai-estimator')}>
                  <ThemedText>Try Now</ThemedText>
                </TouchableOpacity>
              </View>
              <Image source={require('@/assets/images/divider.png')} style={styles.bannerImage} />
            </LinearGradient>
          </Animated.View>

          {/* Second Latest Release */}
          {latestData && latestData.length > 0 && (
            <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Trending Now</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.seeAllLink}>See all →</ThemedText>
              </TouchableOpacity>
            </View>

            <FlatList
              data={latestData}
              keyExtractor={(item: any) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 12, paddingHorizontal: 16, marginBottom: 16 }}
              scrollEnabled={false}
              renderItem={({ item, index }: { item: any; index: number }) => {
                const anim = trendingAnims[index % trendingAnims.length];
                const trendingScale = anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                });

                const trendingTranslateY = anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                });

                return (
                  <Animated.View
                    style={[
                      styles.productCard,
                      {
                        opacity: trendingAnims[index],
                        transform: [{ scale: trendingScale }, { translateY: trendingTranslateY }],
                      },
                    ]}
                  >
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => router.push({ pathname: '/product-details', params: { id: item.id } })}
                    >
                      <Image source={item.image} style={styles.productImage} />
                    </TouchableOpacity>

                    <View style={styles.productInfo}>
                      <ThemedText style={styles.productTitle}>{item.brandName}</ThemedText>
                      <ThemedText style={styles.productPrice}>{item.priceDisplay}</ThemedText>
                      <TouchableOpacity onPress={() => router.push('/ar-view')}>
                        <ThemedText style={styles.tryNowLink}>Try now →</ThemedText>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.heart} onPress={() => toggleSaved(item.id)}>
                      <Ionicons name={isSaved(item.id) ? "heart" : "heart-outline"} size={22} color={isSaved(item.id) ? "#e24a43" : "#273054"} />
                    </TouchableOpacity>
                  </Animated.View>
                );
              }}
            />
            </View>
          )}
        </Animated.View>
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
    backgroundColor: '#273054B0',
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
    color: '#273054',
  },
  searchInputFocused: {
    color: '#273054',
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
    marginTop: 35,
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
    backgroundColor: '#273054',
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
    color: '#273054',
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
    color: '#AAAAAA',
    fontSize: 12,
  },
  productPrice: {
    fontWeight: '900',
    fontSize: 14,
    color: '#121212',
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
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
    width: 90,
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
