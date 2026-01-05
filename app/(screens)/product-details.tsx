import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetails() {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'description' | 'reviews'>('description');

  function dec() {
    setQty((s) => Math.max(1, s - 1));
  }
  function inc() {
    setQty((s) => s + 1);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.mediaWrap}>
          <Image source={require('@/assets/images/products/chair1.jpg')} style={styles.media} />
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentCard}>
          <ThemedText type="defaultSemiBold" style={styles.title}>Mini sit me</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.price}>N75,000</ThemedText>

          <View style={styles.rowSpacing}>
            <View style={styles.colorRow}>
              <View style={[styles.swatch, { backgroundColor: '#8aa77a' }]} />
              <View style={[styles.swatch, { backgroundColor: '#2b2b2b' }]} />
              <View style={[styles.swatch, { backgroundColor: '#0f4a6b' }]} />
            </View>

            <View style={styles.qtyRow}>
              <TouchableOpacity style={styles.qtyBtn} onPress={dec}><ThemedText>-</ThemedText></TouchableOpacity>
              <ThemedText style={styles.qtyText}>{qty}</ThemedText>
              <TouchableOpacity style={styles.qtyBtn} onPress={inc}><ThemedText>+</ThemedText></TouchableOpacity>
            </View>
          </View>

          <View style={styles.tabsRow}>
            <TouchableOpacity style={[styles.tabBtn, tab === 'description' && styles.tabActive]} onPress={() => setTab('description')}>
              <ThemedText style={[styles.tabText, tab === 'description' && styles.tabTextActive]}>Description</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabBtn, tab === 'reviews' && styles.tabActive]} onPress={() => setTab('reviews')}>
              <ThemedText style={[styles.tabText, tab === 'reviews' && styles.tabTextActive]}>Reviews</ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur velit at massa vehicula, quis fringilla urna gravida.
          </ThemedText>

          <View style={styles.infoRow}>
            <View style={{ display: 'flex', gap: 4, flexDirection: 'row' }}>
              <ThemedText style={styles.infoLabel}>Availability:</ThemedText>
              <ThemedText style={styles.infoValue}>In stock · Limited units available</ThemedText>
            </View>
            <View style={{ display: 'flex', gap: 4, flexDirection: 'row' }}>
              <ThemedText style={styles.infoLabel}>Delivery:</ThemedText>
              <ThemedText style={styles.infoValue}>15 days after payment confirmation</ThemedText>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.outlineBtn}>
          <ThemedText style={styles.outlineText}>Add to cart</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn}>
          <ThemedText style={styles.primaryText}>Set in your space</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F9FB' },
  container: { paddingBottom: 40 },
  mediaWrap: { height: 300, backgroundColor: '#f3f5f6' },
  media: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', top: 16, left: 12, width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },

  contentCard: { marginTop: -24, borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: '#fff', padding: 18, minHeight: 320 },
  title: { fontSize: 18, color: '#111827', marginBottom: 8 },
  price: { fontSize: 16, color: '#263a63', fontWeight: '700', marginBottom: 12 },

  rowSpacing: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  colorRow: { flexDirection: 'row', alignItems: 'center' },
  swatch: { width: 20, height: 20, borderRadius: 10, marginRight: 8 },

  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 34, height: 34, borderRadius: 8, borderWidth: 1, borderColor: '#e6e9ef', alignItems: 'center', justifyContent: 'center', marginHorizontal: 6 },
  qtyText: { fontSize: 16, fontWeight: '600', minWidth: 24, textAlign: 'center' },

  tabsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tabBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, backgroundColor: '#f3f5f6', marginRight: 8 },
  tabActive: { backgroundColor: '#e3e7ff' },
  tabText: { color: '#9aa3a7' },
  tabTextActive: { color: '#263a63', fontWeight: '700' },

  description: { color: '#9aa3a7', lineHeight: 20, marginBottom: 18 },

  infoRow: { borderTopWidth: 1, borderTopColor: '#f1f3f4', paddingTop: 12, flexDirection: 'column', justifyContent: 'space-between' },
  infoLabel: { color: '#263a63', fontWeight: '700', marginBottom: 4 },
  infoValue: { color: '#9aa3a7', fontSize: 13 },

  bottomSpacer: { height: 80 },

  footer: { position: 'absolute', left: 16, right: 16, bottom: 18, flexDirection: 'row', alignItems: 'center' },
  outlineBtn: { flex: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#e6e9ef', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  outlineText: { color: '#111827', fontWeight: '600' },
  primaryBtn: { flex: 2, height: 48, borderRadius: 12, backgroundColor: '#263a63', alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
});
