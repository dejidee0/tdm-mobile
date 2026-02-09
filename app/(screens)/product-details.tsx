import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../context/ProductsContext';

export default function ProductDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = (params.id as string) || undefined;
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'description' | 'reviews'>('description');
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { fetchProduct } = useProducts();

  function dec() {
    setQty((s) => Math.max(1, s - 1));
  }
  function inc() {
    setQty((s) => s + 1);
  }
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const p = await fetchProduct(id);
        if (mounted) setProduct(p);
      } catch {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.mediaWrap}>
          <Image source={require('@/assets/images/products/chair1.jpg')} style={styles.media} />
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartBtn}>
            <Ionicons name="heart-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.title}>Mini sit me</Text>
          <Text style={styles.price}>N75,000</Text>

          <View style={styles.rowSpacing}>
            <View style={styles.colorRow}>
              <View style={[styles.swatch, { backgroundColor: '#8aa77a' }]} />
              <View style={[styles.swatch, { backgroundColor: '#2b2b2b' }]} />
              <View style={[styles.swatch, { backgroundColor: '#0f4a6b' }]} />
            </View>

            <View style={styles.qtyRow}>
              <TouchableOpacity style={styles.qtyBtn} onPress={dec}>
                <Ionicons name="remove" size={18} color="#273054" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={inc}>
                <Ionicons name="add" size={18} color="#273054" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tabsRow}>
            <TouchableOpacity style={[styles.tabBtn, tab === 'description' && styles.tabActive]} onPress={() => setTab('description')}>
              <Text style={[styles.tabText, tab === 'description' && styles.tabTextActive]}>Description</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabBtn, tab === 'reviews' && styles.tabActive]} onPress={() => setTab('reviews')}>
              <Text style={[styles.tabText, tab === 'reviews' && styles.tabTextActive]}>Reviews</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur velit at massa vehicula, quis fringilla urna gravida.
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoPair}>
              <Text style={styles.infoLabel}>Availability:</Text>
              <Text style={styles.infoValue}>In stock · Limited units available</Text>
            </View>
            <View style={styles.infoPair}>
              <Text style={styles.infoLabel}>Delivery:</Text>
              <Text style={styles.infoValue}>15 days after payment confirmation</Text>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.outlineBtn}>
          <Text style={styles.outlineText}>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push('/(screens)/ar-view')}
        >
          <Image source={require('@/assets/images/icons/vr.png')} style={{ width: 20, height: 20 }} />
          <Text style={styles.primaryText}>Set in your space</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { paddingBottom: 80 },
  mediaWrap: { height: 300, backgroundColor: '#f5f5f5', position: 'relative' },
  media: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', top: 14, left: 14, width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  heartBtn: { position: 'absolute', top: 14, right: 14, width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  contentCard: { marginTop: -20, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#fff', padding: 20, minHeight: 320 },
  title: { fontSize: 18, fontWeight: '900', color: '#273054', marginBottom: 8 },
  price: { fontSize: 20, fontWeight: '900', color: '#273054', marginBottom: 16 },
  rowSpacing: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  colorRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  swatch: { width: 24, height: 24, borderRadius: 12 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 4 },
  qtyBtn: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: 16, fontWeight: '600', minWidth: 30, textAlign: 'center', color: '#273054' },
  tabsRow: { flexDirection: 'row', gap: 8, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', paddingBottom: 12 },
  tabBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  tabActive: { backgroundColor: '#ACB9ED' },
  tabText: { color: '#999', fontSize: 14, fontWeight: '500' },
  tabTextActive: { color: '#273054', fontWeight: '900' },
  description: { color: '#999', lineHeight: 20, marginBottom: 20, fontSize: 14 },
  infoRow: { borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 16, gap: 16 },
  infoPair: { gap: 4 },
  infoLabel: { color: '#273054', fontWeight: '600', fontSize: 13 },
  infoValue: { color: '#999', fontSize: 13 },
  bottomSpacer: { height: 20 },
  footer: { position: 'absolute', left: 16, right: 16, bottom: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  outlineBtn: { flex: 1, height: 48, borderRadius: 10, borderWidth: 1.5, borderColor: '#273054', backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  outlineText: { color: '#273054', fontWeight: '600', fontSize: 14 },
  primaryBtn: { display: 'flex', flexDirection: 'row', flex: 1, gap: 4, height: 48, borderRadius: 10, backgroundColor: '#273054', alignItems: 'center', justifyContent: 'center', shadowColor: '#273054', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
