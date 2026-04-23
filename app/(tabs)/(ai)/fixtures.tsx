import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
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
  red: '#E53E3E',
};

export default function FixturesCatalogScreen() {
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
            <TouchableOpacity key={cat} style={[styles.catTab, i === 3 && styles.activeCatTab]}>
              <Text style={[styles.catTabText, i === 3 && styles.activeCatTabText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>TOTAL ITEMS</Text>
          </View>
          <View style={styles.statBox}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={[styles.statValue, { color: COLORS.green }]}>3.2w</Text>
            </View>
            <Text style={styles.statLabel}>LEAD AVG</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>On {"\n"}Track</Text>
            <Text style={styles.statLabel}>BUDGET</Text>
          </View>
        </View>

        {/* Product Cards */}
        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image 
              source="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400" 
              style={styles.itemImage}
              contentFit="cover"
            />
            <View style={styles.tierTag}>
              <Text style={styles.tierTagText}>LUXURY TIER</Text>
            </View>
            <View style={styles.transitBadge}>
              <Ionicons name="bus-outline" size={14} color={COLORS.green} />
              <Text style={styles.transitBadgeText}>In Transit</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.titleRow}>
              <Text style={styles.itemTitle}>Brushed Gold Faucet</Text>
              <View style={styles.countTag}>
                <Text style={styles.countTagText}>x12</Text>
              </View>
            </View>
            <Text style={styles.itemDesc}>
              Minimalist deck-mounted faucet with PVD finish and ceramic valves.
            </Text>
            <View style={styles.footerRow}>
               <View style={styles.leadRow}>
                 <Ionicons name="time-outline" size={16} color={COLORS.textSubHeader} />
                 <Text style={styles.leadText}>Lead Time: <Text style={{fontWeight: '700'}}>4 weeks</Text></Text>
               </View>
               <TouchableOpacity style={styles.cartBtn}>
                 <Ionicons name="cart-outline" size={20} color={COLORS.accent} />
               </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image 
              source="https://images.unsplash.com/photo-1543167664-400296ef5371?q=80&w=400" 
              style={styles.itemImage}
              contentFit="cover"
            />
            <View style={styles.tierTag}>
              <Text style={styles.tierTagText}>PREMIER TIER</Text>
            </View>
            <View style={[styles.transitBadge, { backgroundColor: '#FED7D7' }]}>
              <Ionicons name="warning-outline" size={14} color={COLORS.red} />
              <Text style={[styles.transitBadgeText, { color: COLORS.red }]}>Action Required</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.titleRow}>
              <Text style={styles.itemTitle}>Smart Light Hub</Text>
              <View style={styles.countTag}>
                <Text style={styles.countTagText}>x8</Text>
              </View>
            </View>
            <Text style={styles.itemDesc}>
              Multi-zone dimming controls with wireless mesh connectivity.
            </Text>
            <View style={styles.footerRow}>
               <View style={styles.leadRow}>
                 <Ionicons name="time-outline" size={16} color={COLORS.textSubHeader} />
                 <Text style={styles.leadText}>Lead Time: <Text style={{fontWeight: '700'}}>1 week</Text></Text>
               </View>
               <TouchableOpacity style={styles.cartBtn}>
                 <Ionicons name="cart-outline" size={20} color={COLORS.accent} />
               </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Add New Fixture Card */}
        <TouchableOpacity style={styles.addCard}>
          <LinearGradient colors={['#2D3748', '#1A202C']} style={styles.addGradient}>
            <View style={styles.addIconCircle}>
              <Ionicons name="add" size={28} color={COLORS.white} />
            </View>
            <Text style={styles.addCardTitle}>Add New {"\n"}Fixture</Text>
            <View style={styles.configureBtn}>
               <Text style={styles.configureBtnText}>CONFIGURE</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerCartBtn}>
          <Ionicons name="cart-outline" size={24} color={COLORS.white} style={{marginRight: 10}} />
          <Text style={styles.footerCartBtnText}>Add to Cart</Text>
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
    backgroundColor: '#000000',
    paddingTop: 10,
    paddingBottom: 20,
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
    backgroundColor: COLORS.primary,
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
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#252523',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.accent,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textSubHeader,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#252523',
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageWrapper: {
    height: 180,
    width: '100%',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  tierTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#252523',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tierTagText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.textHeader,
  },
  transitBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#252523',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  transitBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.green,
  },
  cardContent: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  countTag: {
    backgroundColor: '#494845',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  countTagText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.accent,
  },
  itemDesc: {
    fontSize: 14,
    color: COLORS.textSubHeader,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  leadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  leadText: {
    fontSize: 14,
    color: COLORS.textSubHeader,
  },
  cartBtn: {
    backgroundColor: '#494845',
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCard: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 180,
    marginBottom: 40,
  },
  addGradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  addIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  addCardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 30,
  },
  configureBtn: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#252523',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  configureBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.accent,
  },
  footerCartBtn: {
    backgroundColor: COLORS.primary,
    height: 70,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  footerCartBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
    marginTop: 4,
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
});
