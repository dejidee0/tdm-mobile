import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../../context/CartContext';
import { useOrders } from '../../../context/OrdersContext';

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
const COLORS = {
  primary: '#D4AF37',
  white: '#FFFFFF',
  textHeader: '#D4AF37',
  textSubHeader: '#9aa3b0',
  accent: '#D4AF37',
  inactive: '#9AA3A7',
  border: '#494845',
  green: '#38A169',
};

export default function CheckoutScreen() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const { cart, items } = useCart();
  const { createOrder } = useOrders();

  const subtotal = cart?.subTotal ?? items?.reduce((s: number, it: any) => s + (parsePrice((it.unitPrice ?? it.price) as any) * (it.quantity ?? 1)), 0) ?? 0;
  const shipping = 5000;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    const payload = {
      shippingFullName: 'Demo User',
      shippingPhone: '+23480000000',
      shippingAddress: '123 AI Generator Lane',
      shippingCity: 'Lagos',
      shippingState: 'Lagos',
      shippingNotes: '',
      customerNotes: '',
      promoCode: '',
      shippingCost: shipping,
      tax: 0,
      discount: 0
    };

    try {
      const res = await createOrder(payload);
      if (res?.ok) {
        const orderId = res.data?.id ?? res.data?.data?.id ?? res.data;
        if (orderId && typeof orderId === 'string') {
          router.push({ pathname: '/payment', params: { orderId } });
        } else {
          router.push('/payment');
        }
      } else {
        alert('Checkout failed!');
      }
    } catch {
      alert('Error during checkout.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textHeader} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <Text style={styles.stepText}>Step 2 of 3</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>DELIVERY INFORMATION</Text>
        <View style={styles.addressCard}>
          <View style={styles.addressIconWrapper}>
            <Ionicons name="home-outline" size={24} color={COLORS.accent} />
          </View>
          <View style={styles.addressDetails}>
            <Text style={styles.addressName}>Home Address</Text>
            <Text style={styles.addressText}>123 Lone Star Way,{"\n"}Austin, TX 78701</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="pencil" size={20} color={COLORS.accent} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>DELIVERY NOTE</Text>
        <View style={styles.noteInputWrapper}>
          <TextInput
            placeholder="Gate code, doorbell instructions, or where to leave the package..."
            placeholderTextColor={COLORS.inactive}
            multiline
            style={styles.noteInput}
            numberOfLines={3}
          />
        </View>

        <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
        <View style={styles.paymentSelector}>
          <TouchableOpacity 
            onPress={() => setPaymentMethod('CARD')}
            style={[styles.paymentTab, paymentMethod === 'CARD' && styles.activePaymentTab]}
          >
            <Ionicons name="card-outline" size={24} color={paymentMethod === 'CARD' ? COLORS.accent : COLORS.inactive} />
            <Text style={[styles.paymentTabText, paymentMethod === 'CARD' && styles.activePaymentTabText]}>CARD</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setPaymentMethod('PAYPAL')}
            style={[styles.paymentTab, paymentMethod === 'PAYPAL' && styles.activePaymentTab]}
          >
            <Ionicons name="logo-paypal" size={24} color={paymentMethod === 'PAYPAL' ? COLORS.accent : COLORS.inactive} />
            <Text style={[styles.paymentTabText, paymentMethod === 'PAYPAL' && styles.activePaymentTabText]}>PAYPAL</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setPaymentMethod('FINANCE')}
            style={[styles.paymentTab, paymentMethod === 'FINANCE' && styles.activePaymentTab]}
          >
            <Ionicons name="cash-outline" size={24} color={paymentMethod === 'FINANCE' ? COLORS.accent : COLORS.inactive} />
            <Text style={[styles.paymentTabText, paymentMethod === 'FINANCE' && styles.activePaymentTabText]}>FINANCE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardForm}>
          <Text style={styles.inputLabel}>CARDHOLDER NAME</Text>
          <TextInput
            defaultValue="ALEXANDER STERLING"
            style={styles.inputField}
          />

          <Text style={styles.inputLabel}>CARD NUMBER</Text>
          <View style={styles.cardNumberWrapper}>
            <TextInput
              defaultValue="**** **** **** 4242"
              style={[styles.inputField, { flex: 1 }]}
              secureTextEntry
            />
            <View style={styles.cardTypeIcon} />
          </View>

          <View style={styles.inputRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>EXPIRY DATE</Text>
              <TextInput
                placeholder="MM / YY"
                style={styles.inputField}
              />
            </View>
            <View style={{ width: 24 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>CVC</Text>
              <TextInput
                placeholder="***"
                style={styles.inputField}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity style={styles.checkboxRow}>
             <View style={styles.checkbox}>
               <Ionicons name="checkmark" size={14} color={COLORS.white} />
             </View>
             <Text style={styles.checkboxText}>Billing address same as shipping address</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>ORDER SUMMARY</Text>
        {items?.map((item: any, idx: number) => {
          const uPrice = parsePrice(item.unitPrice ?? item.price ?? item.product?.price);
          return (
            <View key={item.id ?? idx} style={[styles.summaryItem, { marginTop: idx > 0 ? 12 : 0 }]}>
              <Image source={typeof item.product?.image === 'string' ? { uri: item.product.image } : item.product?.image ?? require('@/assets/images/products/chair1.jpg')} style={styles.summaryThumb} />
              <View style={{flex: 1, marginLeft: 16}}>
                <Text style={styles.summaryItemTitle}>{item.productName || item.product?.name}</Text>
                <Text style={styles.summaryItemMeta}>Qty: {item.quantity ?? 1} • N{uPrice.toLocaleString()}</Text>
              </View>
            </View>
          );
        })}

        <View style={styles.costBreakdown}>
           <View style={styles.costRow}>
             <Text style={styles.costLabel}>Subtotal</Text>
             <Text style={styles.costValue}>N{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
           </View>
           <View style={styles.costRow}>
             <Text style={styles.costLabel}>Shipping</Text>
             <Text style={styles.costValue}>N{shipping.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
           </View>
           <View style={styles.costRow}>
             <Text style={styles.costLabel}>Estimated Tax</Text>
             <Text style={styles.costValue}>N0.00</Text>
           </View>
           <View style={styles.finalTotalRow}>
             <Text style={styles.totalLabel}>Total</Text>
             <Text style={styles.totalValue}>N{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
           </View>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={handleCheckout}>
          <Ionicons name="lock-closed" size={20} color={COLORS.white} style={{marginRight: 10}} />
          <Text style={styles.confirmBtnText}>Confirm & Pay</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Tab Bar Mockup */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color={COLORS.inactive} />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="cart-outline" size={24} color={COLORS.inactive} />
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="heart-outline" size={24} color={COLORS.inactive} />
          <Text style={styles.tabLabel}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color={COLORS.inactive} />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: '#000000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textHeader,
  },
  stepText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.accent,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 150,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textSubHeader,
    marginBottom: 16,
    marginTop: 24,
    letterSpacing: 0.5,
  },
  addressCard: {
    backgroundColor: '#252523',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addressIconWrapper: {
    backgroundColor: '#494845',
    width: 60,
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressDetails: {
    flex: 1,
    marginLeft: 16,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.textSubHeader,
    marginTop: 4,
    lineHeight: 20,
  },
  noteInputWrapper: {
    backgroundColor: '#494845',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
  },
  noteInput: {
    fontSize: 14,
    color: COLORS.textHeader,
    textAlignVertical: 'top',
  },
  paymentSelector: {
    flexDirection: 'row',
    backgroundColor: '#494845',
    borderRadius: 14,
    padding: 6,
    gap: 6,
  },
  paymentTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  activePaymentTab: {
    backgroundColor: '#252523',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentTabText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.inactive,
  },
  activePaymentTabText: {
    color: COLORS.accent,
  },
  cardForm: {
    backgroundColor: '#252523',
    borderRadius: 24,
    padding: 24,
    marginTop: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textHeader,
    marginBottom: 10,
  },
  inputField: {
    backgroundColor: '#494845',
    height: 56,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 20,
    color: COLORS.white,
  },
  cardNumberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTypeIcon: {
    width: 40,
    height: 24,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginRight: 16,
  },
  inputRow: {
    flexDirection: 'row',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.accent,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxText: {
    fontSize: 14,
    color: COLORS.textSubHeader,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryThumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  summaryItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textHeader,
  },
  summaryItemMeta: {
    fontSize: 13,
    color: COLORS.textSubHeader,
    marginTop: 2,
  },
  costBreakdown: {
    marginTop: 32,
    marginBottom: 32,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  costLabel: {
    fontSize: 15,
    color: COLORS.textSubHeader,
  },
  costValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textHeader,
  },
  finalTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  totalLabel: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.accent,
  },
  confirmBtn: {
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
  },
  confirmBtnText: {
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
});
