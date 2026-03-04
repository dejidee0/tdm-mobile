import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiFetch } from '../../services/api';

export default function DetailedEstimate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  async function handleUnlock() {
    setLoading(true);
    try {
      // Simulate checking credits or making a payment since the exact endpoint is not specified
      const res = await apiFetch('/ai/credits/balance', { method: 'GET' });
      // We will pretend the purchase was successful to show the flow
      if (res.ok || !res.ok) { // Mocking success regardless
        setTimeout(() => {
          setLoading(false);
          setUnlocked(true);
          Alert.alert('Success', 'Detailed BOQ has been unlocked!');
        }, 1200);
      }
    } catch (e: any) {
      setLoading(false);
      Alert.alert('Error', e.message);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#273054" />
          </TouchableOpacity>
          <Text style={styles.header}>Detailed Estimate</Text>
        </View>

        <View style={styles.lockBlock}>
          <View style={styles.lockIconWrap}>
            <Ionicons name={unlocked ? 'document-text' : 'lock-closed'} size={36} color="#273054" />
          </View>
          <Text style={styles.lockTitle}>{unlocked ? 'Detailed BOQ Unlocked' : 'Unlock Detailed BOQ'}</Text>
          <Text style={styles.lockSubtitle}>Get a comprehensive breakdown of materials, labor costs, and project specifications.</Text>

          <View style={styles.previewCard}>
            <View style={styles.pdfRow}>
              <View style={styles.pdfIcon}><Text style={{fontWeight:'800', color:'#c33'}}>PDF</Text></View>
              <View style={{flex:1}}>
                <Text style={styles.pdfTitle}>{unlocked ? 'Detailed Quote.pdf' : 'Quote Preview.pdf'}</Text>
                <Text style={styles.pdfMeta}>2.4 MB • Generated 2m ago</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.previewBtn}>{unlocked ? 'DOWNLOAD' : 'PREVIEW'}</Text>
              </TouchableOpacity>
            </View>
            {!unlocked && <View style={styles.pdfBlur}> <Text style={{color:'#9aa0ae'}}>Blur applied</Text> </View>}
          </View>
        </View>

        <Text style={styles.section}>WHAT'S INCLUDED</Text>
        <View style={styles.includedRow}>
          <Ionicons name="checkmark-circle" size={24} color="#2bb86b" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.includedTitle}>Detailed Material List</Text>
            <Text style={styles.includedSub}>Exact quantities and specifications for tiles, paint, wood, and fixtures tailored to your space.</Text>
          </View>
        </View>

        <View style={styles.includedRow}>
          <Ionicons name="checkmark-circle" size={24} color="#2bb86b" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.includedTitle}>Labor Cost Breakdown</Text>
            <Text style={styles.includedSub}>Transparent labor estimates separated by trade (plumbing, electrical, carpentry).</Text>
          </View>
        </View>

        <View style={styles.includedRow}>
          <Ionicons name="checkmark-circle" size={24} color="#2bb86b" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.includedTitle}>Exportable Formats</Text>
            <Text style={styles.includedSub}>Download as PDF or Excel compatible CSV for easy sharing with contractors.</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {!unlocked && (
        <View style={styles.priceBar}>
          <View>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>₦15,000</Text>
          </View>
          <TouchableOpacity style={styles.unlockBtn} onPress={handleUnlock} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.unlockText}>Unlock Detailed Quote</Text>}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 120 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6, height: 50 },
  backBtn: { padding: 6 },
  header: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '800', color: '#273054', marginRight: 36 },
  lockBlock: { alignItems: 'center', marginTop: 18 },
  lockIconWrap: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#eef3ff', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  lockTitle: { fontSize: 20, fontWeight: '900', color: '#273054' },
  lockSubtitle: { color: '#9aa0ae', textAlign: 'center', marginTop: 8, paddingHorizontal: 12 },
  previewCard: { marginTop: 18, backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  pdfRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  pdfIcon: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#fee', alignItems: 'center', justifyContent: 'center' },
  pdfTitle: { fontWeight: '800', color: '#273054' },
  pdfMeta: { color: '#9aa0ae', fontSize: 12 },
  previewBtn: { color: '#273054', fontWeight: '800' },
  pdfBlur: { height: 90, backgroundColor: '#f5f7fb', marginTop: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  section: { marginTop: 22, color: '#273054', fontWeight: '800', marginBottom: 8 },
  includedRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginTop: 12 },
  includedTitle: { fontWeight: '800', color: '#273054' },
  includedSub: { color: '#8e98a9', marginTop: 4 },
  priceBar: { position: 'absolute', left: 16, right: 16, bottom: 16, backgroundColor: '#fff', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 6 },
  totalLabel: { color: '#9aa0ae' },
  totalPrice: { fontSize: 20, fontWeight: '900', color: '#273054' },
  unlockBtn: { backgroundColor: '#273054', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12 },
  unlockText: { color: '#fff', fontWeight: '900' },
});
