import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#D4AF37',
  white: '#FFFFFF',
  textHeader: '#D4AF37',
  textSubHeader: '#8e98a9',
  accent: '#D4AF37',
  inactive: '#9AA3A7',
  border: '#494845',
  green: '#38A169',
};

const SYSTEMS = [
  {
    id: '1',
    title: 'Panoramic Sliding Wall',
    description: 'Triple-glazed, thermal-break aluminum, UV-coated glass.',
    price: 2450.00,
    availability: '12 Units',
    leadTime: '4-6 Weeks',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600',
    tag: 'LUXURY',
    status: 'In Stock',
  },
  {
    id: '2',
    title: 'High-Efficiency Casement',
    description: 'uPVC multi-chamber frame, Argon-filled, dual seals.',
    price: 895.00,
    availability: '48 Units',
    leadTime: '2-3 Weeks',
    image: 'https://images.unsplash.com/photo-1541888941293-90d2387e0766?q=80&w=600',
    tag: 'STANDARD',
    status: 'Standard Shipping',
  },
  {
    id: '3',
    title: 'Essential Dual-Glaze',
    description: 'Standard vinyl frame, energy-rated glass, basic hardware.',
    price: 420.00,
    availability: '110 Units',
    leadTime: '1 Week',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600',
    tag: 'ECONOMY',
    status: 'Bulk Rate',
  },
];

export default function WindowsSelectionScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textHeader} />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {['Walls', 'Roofing', 'Windows', 'Fixtures'].map((cat, i) => (
            <TouchableOpacity key={cat} style={[styles.catTab, i === 2 && styles.activeCatTab]}>
              <Text style={[styles.catTabText, i === 2 && styles.activeCatTabText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.catalogLabel}>PREMIUM CATALOG</Text>
        <Text style={styles.title}>Select Systems</Text>

        {SYSTEMS.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.tierBadge}>
                <Text style={styles.tierBadgeText}>{item.tag}</Text>
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>

              <View style={styles.metaRow}>
                <View style={styles.metaBox}>
                  <Text style={styles.metaLabel}>AVAILABILITY</Text>
                  <Text style={styles.metaValue}>{item.availability}</Text>
                </View>
                <View style={[styles.metaBox, { marginLeft: 16 }]}>
                  <Text style={styles.metaLabel}>LEAD TIME</Text>
                  <Text style={styles.metaValue}>{item.leadTime}</Text>
                </View>
              </View>

              <View style={styles.footerRow}>
                <View style={styles.priceContainer}>
                   <Text style={styles.priceValue}>${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                   <Text style={styles.unitText}>/unit</Text>
                </View>
                <View style={styles.statusRow}>
                   <Ionicons name={item.id === '1' ? 'checkmark-circle' : 'bus-outline'} size={14} color={COLORS.green} />
                   <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addToCartBtn}>
          <Ionicons name="cart-outline" size={24} color={COLORS.white} style={{ marginRight: 10 }} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 10,
  },
  categoryScroll: {
    marginTop: 20,
  },
  catTab: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#494845',
    marginRight: 10,
  },
  activeCatTab: {
    backgroundColor: COLORS.accent,
  },
  catTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  activeCatTabText: {
    color: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 150,
  },
  catalogLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D4AF37',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textHeader,
    marginTop: 6,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#252523',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageWrapper: {
    height: 200,
    width: '100%',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  tierBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tierBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  cardContent: {
    padding: 24,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textHeader,
    letterSpacing: -0.5,
  },
  itemDesc: {
    fontSize: 15,
    color: COLORS.textSubHeader,
    marginTop: 8,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  metaBox: {
    flex: 1,
    backgroundColor: '#252523',
    borderRadius: 14,
    padding: 16,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSubHeader,
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textHeader,
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceValue: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.accent,
  },
  unitText: {
    fontSize: 14,
    color: COLORS.textSubHeader,
    marginLeft: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.green,
  },
  addToCartBtn: {
    backgroundColor: COLORS.accent,
    height: 70,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    marginTop: 20,
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 90,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
    marginTop: 4,
  },
});
