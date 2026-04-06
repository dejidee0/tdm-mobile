import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  green: '#38A169',
};



function parsePrice(v: any) {
  if (!v) return 0;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const n = v.replace(/[^0-9.]/g, '');
    return parseFloat(n) || 0;
  }
  if (v.price) return parsePrice(v.price);
  return 0;
}

export default function CartScreen() {
  const router = useRouter();
  const { cart, items, fetchCart, removeItem, updateItem } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQty = async (item: any, delta: number) => {
    const id = item.id ?? item.itemId ?? item.cartItemId ?? item.product?.id;
    if (!id) return;
    const newQty = Math.max(1, (item.quantity ?? 1) + delta);
    await updateItem(String(id), { quantity: newQty });
  };

  const removeCartItem = async (item: any) => {
    const id = item.id ?? item.itemId ?? item.cartItemId ?? item.product?.id;
    if (!id) return;
    await removeItem(String(id));
  };

  const subtotal = cart?.subTotal ?? items?.reduce((s: number, it: any) => s + (parsePrice((it.unitPrice ?? it.price) as any) * (it.quantity ?? 1)), 0) ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textHeader} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.itemCountBadge}>
          <Text style={styles.itemCountText}>{items?.length ?? 0} ITEMS</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {items && items.length > 0 ? items.map((item: any, i: number) => {
          const uPrice = parsePrice(item.unitPrice ?? item.price ?? item.product?.price);
          return (
          <View key={item.id ?? i} style={styles.cartCard}>
            <Image source={typeof item.product?.image === 'string' ? { uri: item.product.image } : item.product?.image ?? require('@/assets/images/products/chair1.jpg')} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <View style={styles.itemTopRow}>
                <Text style={styles.itemTitle} numberOfLines={2}>{item.productName || item.product?.name}</Text>
                <TouchableOpacity onPress={() => removeCartItem(item)}>
                  <Ionicons name="trash-outline" size={20} color={COLORS.textSubHeader} />
                </TouchableOpacity>
              </View>
              <Text style={styles.itemSku}>Est: {item.deliveryEstimate ?? '15 working days'}</Text>
              
              <View style={styles.itemBottomRow}>
                <View style={styles.qtyStepper}>
                  <TouchableOpacity onPress={() => updateQty(item, -1)} style={styles.stepperBtn}>
                    <Ionicons name="remove" size={16} color={COLORS.accent} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity ?? 1}</Text>
                  <TouchableOpacity onPress={() => updateQty(item, 1)} style={styles.stepperBtn}>
                    <Ionicons name="add" size={16} color={COLORS.accent} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemPrice}>N{uPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
              </View>
            </View>
          </View>
        )}) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: COLORS.textSubHeader }}>Your cart is empty.</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Promotions</Text>
        <View style={styles.promoRow}>
          <TextInput
            placeholder="Enter promo code"
            style={styles.promoInput}
            placeholderTextColor={COLORS.inactive}
          />
          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>N{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={[styles.summaryValue, { color: COLORS.green }]}>Will be calculated at checkout</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax Estimate</Text>
            <Text style={styles.summaryValue}>N0.00</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>N{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </View>
        </View>

        <View style={styles.recommendHeader}>
          <Text style={styles.recommendTitle}>You might also like</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendScroll}>
          <View style={styles.recommendCard}>
            <Image
              source="https://images.unsplash.com/photo-1541888941293-90d2387e0766?q=80&w=300&auto=format&fit=crop"
              style={styles.recommendImage}
            />
            <Text style={styles.recommendItemTitle}>Premium White Grout</Text>
            <Text style={styles.recommendItemDesc}>High-durability</Text>
            <View style={styles.recommendFooter}>
              <Text style={styles.recommendPrice}>$24.99</Text>
              <TouchableOpacity style={styles.miniCartBtn}>
                <Ionicons name="cart-outline" size={18} color={COLORS.accent} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.recommendCard}>
            <Image
              source="https://images.unsplash.com/photo-1518709368805-4e9042af9f23?q=80&w=300&auto=format&fit=crop"
              style={styles.recommendImage}
            />
            <Text style={styles.recommendItemTitle}>Tile Spacers (500ct)</Text>
            <Text style={styles.recommendItemDesc}>Professional Grade</Text>
            <View style={styles.recommendFooter}>
              <Text style={styles.recommendPrice}>$12.50</Text>
              <TouchableOpacity style={styles.miniCartBtn}>
                <Ionicons name="cart-outline" size={18} color={COLORS.accent} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerInfo}>
          <View>
            <Text style={styles.footerTotalLabel}>ESTIMATED TOTAL</Text>
            <Text style={styles.footerTotalValue}>N{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.priceMatch}>
             <Ionicons name="shield-checkmark-outline" size={14} color={COLORS.green} />
             <Text style={styles.priceMatchText}>PRICE MATCH GUARANTEE</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.checkoutBtn}
          onPress={() => router.push('/(ai)/checkout')}
        >
          <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textHeader,
  },
  itemCountBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  itemCountText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 150,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textHeader,
    flex: 1,
    marginRight: 8,
  },
  itemSku: {
    fontSize: 12,
    color: COLORS.textSubHeader,
    marginTop: 4,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  qtyStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    padding: 4,
  },
  stepperBtn: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 12,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textHeader,
    marginTop: 24,
    marginBottom: 16,
  },
  promoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  applyBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 24,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
  },
  applyBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  summaryCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 24,
    padding: 24,
    marginBottom: 40,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textHeader,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: COLORS.textSubHeader,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textHeader,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.accent,
  },
  recommendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  recommendTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.accent,
  },
  recommendScroll: {
    marginBottom: 40,
  },
  recommendCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 12,
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  recommendImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  recommendItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textHeader,
  },
  recommendItemDesc: {
    fontSize: 11,
    color: COLORS.textSubHeader,
    marginTop: 2,
  },
  recommendFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  recommendPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.accent,
  },
  miniCartBtn: {
    backgroundColor: '#F0F4F8',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  footerTotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textSubHeader,
  },
  footerTotalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  priceMatch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  priceMatchText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.green,
  },
  checkoutBtn: {
    backgroundColor: COLORS.accent,
    height: 70,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontSize: 18,
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
