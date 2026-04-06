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
  primary: '#1A2138',
  white: '#FFFFFF',
  textHeader: '#11181C',
  textSubHeader: '#7B818C',
  accent: '#263A63',
  inactive: '#9AA3A7',
  border: '#E2E8F0',
};

const SECTIONS = [
  {
    title: 'Gypsum & Framing',
    count: '8 ITEMS',
    items: [
      {
        id: '1',
        title: 'Fire-Rated Gypsum',
        description: "5/8\" Type X Fireshield. High-performance core with moisture resistance for commercial partitions.",
        quantity: '12,450 sq ft',
        leadTime: '3-5 Days',
        image: 'https://images.unsplash.com/photo-1541888941293-90d2387e0766?q=80&w=400&auto=format&fit=crop',
        tags: ['IN STOCK', 'PREMIUM'],
      },
      {
        id: '2',
        title: 'Light-Gauge Steel Studs',
        description: "25 Gauge structural framing. Corrosion-resistant coating for interior non-load bearing walls.",
        quantity: '5,200 units',
        leadTime: 'Next Day',
        image: 'https://images.unsplash.com/photo-1518709368805-4e9042af9f23?q=80&w=400&auto=format&fit=crop',
        tags: ['LOW STOCK', 'ECONOMY'],
      },
    ]
  },
  {
    title: 'Acoustic & Insulation',
    count: '4 ITEMS',
    items: [
      {
        id: '3',
        title: 'Designer Acoustic Felt',
        description: "High-density PET felt panels. NRC rating 0.85. Available in 24 bespoke colors.",
        price: '$12.50 /sq ft',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop',
        tags: ['LUXURY'],
        isAction: 'Select Options',
      },
    ]
  }
];

export default function MaterialsCatalogScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textHeader} />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {['Flooring', 'Walls', 'Roofing', 'Windows'].map((cat, i) => (
            <TouchableOpacity key={cat} style={[styles.catTab, i === 1 && styles.activeCatTab]}>
              <Text style={[styles.catTabText, i === 1 && styles.activeCatTabText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {SECTIONS.map((section, sIndex) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionCount}>{section.count}</Text>
            </View>

            {section.items.map((item: any) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.imageWrapper}>
                  <Image source={item.image} style={styles.itemImage} contentFit="cover" />
                  <View style={styles.tagRow}>
                    {item.tags.map((tag: any) => (
                      <View key={tag} style={[styles.tag, tag === 'IN STOCK' ? styles.tagWhite : styles.tagDark]}>
                        <Text style={[styles.tagText, tag === 'IN STOCK' ? styles.tagTextDark : styles.tagTextWhite]}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.cardContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <TouchableOpacity>
                      <Ionicons name="heart-outline" size={22} color={COLORS.accent} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemDesc}>{item.description}</Text>

                  {item.quantity ? (
                    <View style={styles.metaRow}>
                      <View style={styles.metaBox}>
                        <Text style={styles.metaLabel}>QUANTITY</Text>
                        <Text style={styles.metaValue}>{item.quantity}</Text>
                      </View>
                      <View style={styles.metaBox}>
                        <Text style={styles.metaLabel}>LEAD TIME</Text>
                        <Text style={styles.metaValue}>{item.leadTime}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.priceRow}>
                      <Text style={styles.priceLabel}>Starting at</Text>
                      <Text style={styles.priceValue}>{item.price}</Text>
                    </View>
                  )}

                  <View style={styles.footerRow}>
                    {item.isAction ? (
                      <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionBtnText}>{item.isAction}</Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity>
                          <Text style={styles.viewDetailsText}>View Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cartIconBtn}>
                          <Ionicons name="cart-outline" size={20} color={COLORS.accent} />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.footerAddToCartBtn}>
          <Ionicons name="cart-outline" size={24} color={COLORS.white} style={{ marginRight: 12 }} />
          <Text style={styles.footerAddToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingBottom: 20,
  },
  categoryScroll: {
    marginTop: 20,
  },
  catTab: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#EDF2F7',
    marginRight: 10,
  },
  activeCatTab: {
    backgroundColor: COLORS.accent,
  },
  catTabText: {
    color: '#4A5568',
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
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F4F8',
  },
  imageWrapper: {
    height: 180,
    width: '100%',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  tagRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagWhite: {
    backgroundColor: COLORS.white,
  },
  tagDark: {
    backgroundColor: COLORS.accent,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '900',
  },
  tagTextDark: {
    color: COLORS.accent,
  },
  tagTextWhite: {
    color: COLORS.white,
  },
  cardContent: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.textHeader,
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
    gap: 12,
  },
  metaBox: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 16,
    borderRadius: 14,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSubHeader,
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textHeader,
    marginTop: 4,
  },
  priceRow: {
    marginTop: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textSubHeader,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textHeader,
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  viewDetailsText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.accent,
    textDecorationLine: 'underline',
  },
  cartIconBtn: {
    backgroundColor: '#F0F4F8',
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: COLORS.accent,
    width: '100%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  footerAddToCartBtn: {
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
  footerAddToCartText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: 90,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
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
