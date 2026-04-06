import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
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
};

export default function EditDeliveryDetailsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="close" size={28} color={COLORS.textHeader} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Delivery Details</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>SELECT ADDRESS</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>2 SAVED</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addressCard}>
          <View style={styles.radioSelected}>
            <View style={styles.radioInner} />
          </View>
          <View style={styles.addressInfo}>
            <View style={styles.addressTypeHeader}>
              <Ionicons name="home-outline" size={18} color={COLORS.textHeader} />
               <Text style={styles.addressName}>Home</Text>
            </View>
            <Text style={styles.addressText}>1248 Oakwood Avenue, Apt 4B, Los Angeles, CA 90012</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.addressCard, styles.addressCardInactive]}>
          <View style={styles.radioUnselected} />
          <View style={styles.addressInfo}>
            <View style={styles.addressTypeHeader}>
              <Ionicons name="briefcase-outline" size={18} color={COLORS.textHeader} />
               <Text style={styles.addressName}>Office</Text>
            </View>
            <Text style={styles.addressText}>Silicon Tower, 12th Floor, 500 Tech Plaza, San Jose, CA 95110</Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>ADD NEW ADDRESS</Text>
        <View style={styles.newAddressForm}>
          <Text style={styles.inputLabel}>STREET ADDRESS</Text>
          <TextInput placeholder="e.g. 123 Main St" style={styles.inputField} />
          
          <View style={styles.inputRow}>
            <View style={{ flex: 1.2 }}>
              <Text style={styles.inputLabel}>CITY</Text>
              <TextInput placeholder="City" style={styles.inputField} />
            </View>
            <View style={{ width: 16 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>STATE</Text>
              <View style={styles.selectField}>
                <Text style={styles.selectText}>Select</Text>
                <Ionicons name="chevron-down" size={18} color={COLORS.textHeader} />
              </View>
            </View>
          </View>

          <Text style={styles.inputLabel}>ZIP CODE</Text>
          <TextInput placeholder="00000" style={styles.inputField} keyboardType="number-pad" />
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>DELIVERY INSTRUCTIONS</Text>
        <View style={styles.instructionsWrapper}>
          <TextInput
            defaultValue="Gate code is 4451. Please leave at front door."
            multiline
            style={styles.instructionsInput}
          />
          <Text style={styles.charCount}>39 / 200</Text>
        </View>

        <View style={styles.infoNote}>
           <Ionicons name="information-circle-outline" size={18} color={COLORS.textSubHeader} />
           <Text style={styles.infoNoteText}>These instructions will be visible to your driver.</Text>
        </View>

        <View style={styles.mapContainer}>
           <Image 
             source="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600" 
             style={styles.mapImage}
           />
           <View style={styles.trackingBadge}>
             <Ionicons name="location" size={16} color={COLORS.accent} />
             <Text style={styles.trackingBadgeText}>LIVE LOCATION TRACKING ENABLED</Text>
           </View>
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
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: COLORS.white,
    borderBottomWidth:1,
    borderBottomColor: '#F0F4F8',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2D3748',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 150,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4A5568',
    letterSpacing: 0.5,
  },
  countBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  countBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
  },
  addressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  addressCardInactive: {
    borderColor: 'transparent',
    backgroundColor: '#F0F2F5',
  },
  radioSelected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.accent,
  },
  radioUnselected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E0',
  },
  addressInfo: {
    flex: 1,
    marginLeft: 16,
  },
  addressTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  addressName: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.textSubHeader,
    lineHeight: 20,
  },
  newAddressForm: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textHeader,
    marginBottom: 10,
  },
  inputField: {
    backgroundColor: '#EDF2F7',
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
  },
  selectField: {
    backgroundColor: '#EDF2F7',
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 15,
    color: COLORS.textSubHeader,
  },
  instructionsWrapper: {
    backgroundColor: '#EDF2F7',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    minHeight: 140,
  },
  instructionsInput: {
    fontSize: 15,
    color: COLORS.textHeader,
    lineHeight: 22,
    flex: 1,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 11,
    color: COLORS.textSubHeader,
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  infoNoteText: {
    fontSize: 13,
    color: COLORS.textSubHeader,
  },
  mapContainer: {
    marginTop: 32,
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 24,
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  trackingBadge: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  trackingBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textHeader,
    marginLeft: 10,
    letterSpacing: 0.5,
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
    color: COLORS.inactive,
  },
});
