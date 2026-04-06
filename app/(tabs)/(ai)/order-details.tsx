import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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

export default function OrderDetailsScreen() {
  const { user } = useAuth();
  const steps = [
    { title: 'On the way', desc: 'Departed from Regional Facility • 10:45 AM', completed: true, active: true },
    { title: 'Packaging', desc: 'Quality check completed • Oct 25, 02:30 PM', completed: true },
    { title: 'Processing', desc: 'Order confirmed by TBM Admin • Oct 24, 11:15 AM', completed: true },
    { title: 'Delivered', desc: 'Signature required upon arrival', completed: false, greyed: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={COLORS.textHeader} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.textHeader} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.orderNumberRow}>
          <View>
            <Text style={styles.orderLabel}>ORDER CONFIRMED</Text>
            <Text style={styles.orderNumber}>#ORD-9821</Text>
            <Text style={styles.orderDate}>Placed on Oct 24, 2023</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>IN TRANSIT</Text>
          </View>
        </View>

        <View style={styles.arrivalCard}>
           <View style={styles.truckIconBg}>
             <Ionicons name="bus-outline" size={24} color={COLORS.accent} />
           </View>
           <View style={{marginLeft: 16}}>
             <Text style={styles.arrivalLabel}>Estimated Arrival</Text>
             <Text style={styles.arrivalDate}>Arriving by Friday, Oct 27</Text>
           </View>
        </View>

        <Text style={styles.sectionTitle}>TRACKING HISTORY</Text>
        <View style={styles.timeline}>
          {steps.map((step, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.timelineMarker}>
                 <View style={[
                   styles.dot, 
                   step.completed ? styles.dotCompleted : styles.dotPending,
                   step.greyed && { backgroundColor: '#E2E8F0' }
                 ]} />
                 {i < steps.length - 1 && <View style={[styles.line, step.completed && styles.lineCompleted]} />}
              </View>
              <View style={styles.stepContent}>
                 <Text style={[styles.stepTitle, step.greyed && { color: COLORS.inactive }]}>{step.title}</Text>
                 <Text style={[styles.stepDesc, step.greyed && { color: COLORS.inactive }]}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.shippingCard}>
          <View style={styles.cardHeader}>
             <Ionicons name="location-outline" size={20} color={COLORS.accent} />
             <Text style={styles.cardHeaderTitle}>Shipping Details</Text>
          </View>
          <Text style={styles.shippingName}>{user?.name || 'Guest'}</Text>
          <Text style={styles.shippingAddress}>
            2480 Heritage Oak Dr{"\n"}
            Suite 400, Floor 2{"\n"}
            Los Angeles, CA 90064
          </Text>
          <Text style={styles.shippingMethod}>Standard Freight Delivery</Text>
        </View>

        <Text style={styles.sectionTitle}>ITEMS (2)</Text>
        <View style={styles.itemRow}>
          <Image source="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=100" style={styles.itemThumb} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>Italian Carrara Marble Tile</Text>
            <Text style={styles.itemMeta}>Box of 10 • 12&quot; x 24&quot;</Text>
            <Text style={styles.itemQty}>Qty: 4</Text>
          </View>
          <Text style={styles.itemPrice}>$596.00</Text>
        </View>

        <View style={[styles.itemRow, { marginTop: 16 }]}>
          <Image source="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=100" style={styles.itemThumb} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>Modern Matte Black Kitchen Faucet</Text>
            <Text style={styles.itemMeta}>Series 7 • Eco-Flow Tech</Text>
            <Text style={styles.itemQty}>Qty: 1</Text>
          </View>
          <Text style={styles.itemPrice}>$285.00</Text>
        </View>

        <View style={styles.summaryCard}>
           <View style={styles.summaryRow}>
             <Text style={styles.summaryLabel}>Subtotal</Text>
             <Text style={styles.summaryValue}>$881.00</Text>
           </View>
           <View style={styles.summaryRow}>
             <Text style={styles.summaryLabel}>Shipping</Text>
             <Text style={[styles.summaryValue, { color: COLORS.green }]}>FREE</Text>
           </View>
           <View style={styles.summaryRow}>
             <Text style={styles.summaryLabel}>Estimated Taxes</Text>
             <Text style={styles.summaryValue}>$74.88</Text>
           </View>
           <View style={styles.summaryDivider} />
           <View style={styles.totalAmountRow}>
             <Text style={styles.totalAmountLabel}>Total Amount</Text>
             <Text style={styles.totalAmountValue}>$955.88</Text>
           </View>
        </View>

        <View style={styles.actionRow}>
           <TouchableOpacity style={styles.invoiceBtn}>
             <Ionicons name="download-outline" size={20} color={COLORS.accent} style={{marginRight: 8}} />
             <Text style={styles.invoiceBtnText}>Invoice</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.supportBtn}>
             <Ionicons name="headset-outline" size={20} color={COLORS.white} style={{marginRight: 8}} />
             <Text style={styles.supportBtnText}>Support</Text>
           </TouchableOpacity>
        </View>
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
          <Ionicons name="person" size={24} color={COLORS.accent} />
          <Text style={[styles.tabLabel, { color: COLORS.accent }]}>Profile</Text>
          <View style={styles.activeDot} />
        </TouchableOpacity>
      </View>
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
    color: '#2D3748',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 150,
  },
  orderNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  orderLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#3182CE',
    letterSpacing: 0.5,
  },
  orderNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textHeader,
    marginTop: 4,
  },
  orderDate: {
    fontSize: 14,
    color: COLORS.textSubHeader,
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  arrivalCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  truckIconBg: {
    backgroundColor: '#EDF2F7',
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrivalLabel: {
    fontSize: 12,
    color: COLORS.textSubHeader,
  },
  arrivalDate: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textHeader,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4A5568',
    marginBottom: 20,
    letterSpacing: 1,
  },
  timeline: {
    marginBottom: 32,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 60,
  },
  timelineMarker: {
    width: 20,
    alignItems: 'center',
    marginRight: 16,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 2,
  },
  dotCompleted: {
    backgroundColor: COLORS.primary,
  },
  dotPending: {
    backgroundColor: '#E2E8F0',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  lineCompleted: {
    backgroundColor: COLORS.primary,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 20,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  stepDesc: {
    fontSize: 13,
    color: COLORS.textSubHeader,
    marginTop: 4,
    lineHeight: 18,
  },
  shippingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F0F4F8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  shippingName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  shippingAddress: {
    fontSize: 14,
    color: COLORS.textSubHeader,
    marginTop: 6,
    lineHeight: 20,
  },
  shippingMethod: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
    marginTop: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemThumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textHeader,
  },
  itemMeta: {
    fontSize: 12,
    color: COLORS.textSubHeader,
    marginTop: 2,
  },
  itemQty: {
    fontSize: 13,
    color: COLORS.textHeader,
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  summaryCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 24,
    padding: 24,
    marginTop: 32,
    marginBottom: 40,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSubHeader,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textHeader,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  totalAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmountLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  totalAmountValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.accent,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  invoiceBtn: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoiceBtnText: {
    color: COLORS.accent,
    fontWeight: 'bold',
    fontSize: 16,
  },
  supportBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
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
