import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
  secondaryBg: '#252523',
};

const ROOFING_ITEMS = [
  {
    id: '1',
    title: 'Asphalt Shingles',
    description: 'Premium architectural laminate with high wind resistance.',
    price: 4250.00,
    time: '3-5 days',
    area: '2,500 sq ft',
    image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=400&auto=format&fit=crop',
    tag: 'LUXURY',
  },
  {
    id: '2',
    title: 'Waterproof Membrane',
    description: 'High-density polyethylene barrier for flat roof systems.',
    price: 1180.00,
    time: 'Next Day',
    area: '12 rolls',
    image: 'https://images.unsplash.com/photo-1541888941293-90d2387e0766?q=80&w=400&auto=format&fit=crop',
    tag: 'STANDARD',
    isNextDay: true,
  },
];

export default function RoofingSelectionScreen() {
  const router = useRouter();
  const [quantities, setQuantities] = useState<any>({ '1': 1, '2': 0 });

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev: any) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textHeader} />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {['Flooring', 'Walls', 'Roofing', 'Windows'].map((cat, i) => (
            <TouchableOpacity key={cat} style={[styles.catTab, i === 2 && styles.activeCatTab]}>
              <Text style={[styles.catTabText, i === 2 && styles.activeCatTabText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Select Components</Text>
          <View style={styles.stockBadge}>
            <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
            <Text style={styles.stockBadgeText}>IN STOCK</Text>
          </View>
        </View>

        {ROOFING_ITEMS.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.imageWrapper}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemBadge}>
                  <Text style={styles.itemBadgeText}>{item.tag}</Text>
                </View>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <View style={styles.itemMetaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="calendar-outline" size={14} color={COLORS.textSubHeader} />
                    <Text style={styles.metaText}>{item.time}</Text>
                  </View>
                  <View style={[styles.metaItem, { marginLeft: 16 }]}>
                    <Ionicons name="apps-outline" size={14} color={COLORS.textSubHeader} />
                    <Text style={styles.metaText}>{item.area}</Text>
                  </View>
                </View>
                {item.isNextDay && (
                  <View style={styles.nextDayRow}>
                    <Ionicons name="flash" size={14} color="#38A169" />
                    <Text style={styles.nextDayText}>Next Day</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.cardBottom}>
              <Text style={styles.price}>${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
              <View style={styles.stepper}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.stepperBtn}>
                  <Ionicons name="remove" size={16} color={COLORS.accent} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantities[item.id]}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={[styles.stepperBtn, { backgroundColor: COLORS.accent }]}>
                  <Ionicons name="add" size={16} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>ESTIMATED TOTAL</Text>
          <Text style={styles.totalValue}>$7,670.00</Text>
        </View>

        <TouchableOpacity style={styles.addToCartBtn}>
          <Ionicons name="cart-outline" size={24} color={COLORS.white} style={{ marginRight: 12 }} />
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000000',
  },
  categoryScroll: {
    marginTop: 16,
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  stockBadge: {
    backgroundColor: COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  stockBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#252523',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTop: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageWrapper: {
    width: 110,
    height: 110,
    borderRadius: 16,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  itemBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  itemDesc: {
    fontSize: 14,
    color: COLORS.textSubHeader,
    marginTop: 4,
    lineHeight: 20,
  },
  itemMetaRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: COLORS.textSubHeader,
    marginLeft: 6,
    fontWeight: '500',
  },
  nextDayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  nextDayText: {
    color: '#38A169',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 20,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.accent,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#494845',
    borderRadius: 12,
    padding: 4,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  quantity: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textHeader,
    marginHorizontal: 16,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textSubHeader,
    letterSpacing: 1,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textHeader,
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
    elevation: 10,
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
