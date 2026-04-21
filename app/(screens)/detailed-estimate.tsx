import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRenovationEstimateById } from '../../services/api';

export default function DetailedEstimate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const params = useLocalSearchParams();
  const estimateId = String(params.estimateId || '');
  const [estimate, setEstimate] = useState<any>(null);

  useEffect(() => {
    async function load() {
      if (!estimateId) return;
      setLoading(true);
      try {
        const res = await getRenovationEstimateById(estimateId);
        console.log({ res });
        if (res.ok && res.data) {
          setEstimate(res.data);
        } else {
          throw new Error(res.data?.message || 'Failed to get estimate');
        }
      } catch (e: any) {
        Alert.alert('Error', e.message || 'Unable to load estimate');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [estimateId]);

  async function handleUnlock() {
    setLoading(true);
    try {
      // For now, simulate a successful unlock since no purchase endpoint is specified
      setTimeout(() => {
        setLoading(false);
        setUnlocked(true);
        Alert.alert('Success', 'Detailed BOQ has been unlocked!');
      }, 1200);
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
            <Ionicons name="chevron-back" size={22} color="#D4AF37" />
          </TouchableOpacity>
          <Text style={styles.header}>Detailed Estimate</Text>
        </View>

        <View style={styles.lockBlock}>
          <View style={styles.lockIconWrap}>
            <Ionicons name={unlocked ? 'document-text' : 'lock-closed'} size={36} color="#D4AF37" />
          </View>
          <Text style={styles.lockTitle}>{unlocked ? 'Detailed BOQ Unlocked' : 'Unlock Detailed BOQ'}</Text>
          <Text style={styles.lockSubtitle}>Get a comprehensive breakdown of materials, labor costs, and project specifications.</Text>

          <View style={styles.previewCard}>
            {estimate && unlocked ? (
              <View>
                <Text style={styles.summaryText}>{estimate.summary}</Text>

                <View style={styles.totalsRow}>
                  <View style={styles.totCol}>
                    <Text style={styles.totLabel}>Materials</Text>
                    <Text style={styles.totValue}>{estimate.currency || ''} {Number(estimate.materialsSubtotal ?? 0).toLocaleString()}</Text>
                  </View>
                  <View style={styles.totCol}>
                    <Text style={styles.totLabel}>Labor</Text>
                    <Text style={styles.totValue}>{estimate.currency || ''} {Number(estimate.laborSubtotal ?? 0).toLocaleString()}</Text>
                  </View>
                  <View style={styles.totCol}>
                    <Text style={styles.totLabel}>Contingency</Text>
                    <Text style={styles.totValue}>{estimate.currency || ''} {Number(estimate.contingencyAmount ?? estimate.contingencyPercent ?? 0).toLocaleString()}</Text>
                  </View>
                </View>

                <View style={{ height: 8 }} />

                <Text style={styles.section}>Bill of Quantities</Text>
                {Array.isArray(estimate.lineItems) && estimate.lineItems.length > 0 ? (
                  estimate.lineItems.map((li: any, idx: number) => (
                    <View key={idx} style={styles.lineItem}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.itemTitle}>{li.description || li.name || `Item ${idx+1}`}</Text>
                        <Text style={styles.itemMeta}>{li.quantity ? `${li.quantity} ${li.unit ?? ''}` : ''} {li.unitCost ? `@ ${estimate.currency || ''}${Number(li.unitCost).toLocaleString()}` : ''}</Text>
                      </View>
                      <Text style={styles.itemTotal}>{estimate.currency || ''} {Number(li.totalCost ?? li.amount ?? 0).toLocaleString()}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={{ color: '#9aa0ae' }}>No line items available.</Text>
                )}

                {Array.isArray(estimate.nextSteps) && estimate.nextSteps.length > 0 && (
                  <>
                    <View style={{ height: 10 }} />
                    <Text style={styles.section}>Next Steps</Text>
                    {estimate.nextSteps.map((s: any, i: number) => (
                      <View key={i} style={styles.nextStep}><Text style={styles.nextStepText}>• {s}</Text></View>
                    ))}
                  </>
                )}

                {Array.isArray(estimate.suggestedProducts) && estimate.suggestedProducts.length > 0 && (
                  <>
                    <View style={{ height: 10 }} />
                    <Text style={styles.section}>Suggested Products</Text>
                    {estimate.suggestedProducts.map((p: any, i: number) => (
                      <View key={i} style={styles.productRow}>
                        <Text style={styles.productTitle}>{p.name || p.title}</Text>
                        <Text style={styles.productMeta}>{estimate.currency || ''} {Number(p.price ?? p.unitPrice ?? 0).toLocaleString()}</Text>
                      </View>
                    ))}
                  </>
                )}
              </View>
            ) : (
              <View>
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
            )}
          </View>
        </View>

        <Text style={styles.section}>WHAT&rsquo;S INCLUDED</Text>
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

        <View style={styles.featureBoxes}>
          <View style={styles.featureBox}>
            <Ionicons name="shield-checkmark" size={28} color="#D4AF37" />
            <Text style={styles.featureLabel}>Secure Pay</Text>
          </View>
          <View style={styles.featureBox}>
            <Ionicons name="checkmark-circle" size={28} color="#D4AF37" />
            <Text style={styles.featureLabel}>AI Verified</Text>
          </View>
          <View style={styles.featureBox}>
            <Ionicons name="headset" size={28} color="#D4AF37" />
            <Text style={styles.featureLabel}>Support</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.priceBar}>
        <View>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>{estimate?.currency || '₦'}{Number(estimate?.totalEstimate ?? 0).toLocaleString()}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.paymentBadge}>One-time payment</Text>
        </View>
      </View>
      {!unlocked && (
        <View style={styles.unlockButtonContainer}>
          <TouchableOpacity style={styles.unlockBtnLarge} onPress={handleUnlock} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : (
              <>
                <Ionicons name="lock-closed" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.unlockTextLarge}>Unlock Detailed Quote</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  container: { padding: 20, paddingBottom: 120 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6, height: 50 },
  backBtn: { padding: 6 },
  header: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '800', color: '#D4AF37', marginRight: 36 },
  lockBlock: { alignItems: 'center', marginTop: 18 },
  lockIconWrap: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#eef3ff', alignItems: 'center', justifyContent: 'center', marginBottom: 12, position: 'relative' },
  lockTitle: { fontSize: 20, fontWeight: '900', color: '#D4AF37' },
  lockSubtitle: { color: '#9aa0ae', textAlign: 'center', marginTop: 8, paddingHorizontal: 12 },
  previewCard: { marginTop: 18, backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  pdfRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  pdfIcon: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#fee', alignItems: 'center', justifyContent: 'center' },
  pdfTitle: { fontWeight: '800', color: '#D4AF37' },
  pdfMeta: { color: '#9aa0ae', fontSize: 12 },
  previewBtn: { color: '#D4AF37', fontWeight: '800' },
  pdfBlur: { height: 90, backgroundColor: '#f5f7fb', marginTop: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  section: { marginTop: 22, color: '#D4AF37', fontWeight: '800', marginBottom: 8 },
  includedRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginTop: 12 },
  includedTitle: { fontWeight: '800', color: '#D4AF37' },
  includedSub: { color: '#8e98a9', marginTop: 4 },
  priceBar: { position: 'absolute', left: 16, right: 16, bottom: 130, backgroundColor: '#fff', borderRadius: 12, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 6 },
  totalLabel: { color: '#9aa0ae', fontSize: 13, fontWeight: '600' },
  totalPrice: { fontSize: 28, fontWeight: '900', color: '#D4AF37', marginTop: 6 },
  paymentBadge: { color: '#16a34a', fontWeight: '700', fontSize: 13 },
  unlockButtonContainer: { position: 'absolute', left: 16, right: 16, bottom: 16, height: 56 },
  unlockBtnLarge: { flex: 1, backgroundColor: '#1a2138', borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  unlockTextLarge: { color: '#fff', fontWeight: '900', fontSize: 16 },
  featureBoxes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 60 },
  featureBox: { flex: 1, alignItems: 'center', paddingVertical: 16, backgroundColor: '#f3f7fc', borderRadius: 16, marginHorizontal: 6 },
  featureLabel: { color: '#D4AF37', fontWeight: '700', marginTop: 8, fontSize: 13 },
  summaryText: { color: '#D4AF37', fontSize: 14, lineHeight: 20 },
  totalsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  totCol: { flex: 1, alignItems: 'center' },
  totLabel: { color: '#9aa0ae', fontWeight: '700' },
  totValue: { color: '#D4AF37', fontWeight: '900', marginTop: 6 },
  lineItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  itemTitle: { fontWeight: '800', color: '#D4AF37' },
  itemMeta: { color: '#8e98a9', fontSize: 12, marginTop: 6 },
  itemTotal: { fontWeight: '900', color: '#D4AF37' },
  nextStep: { paddingVertical: 6 },
  nextStepText: { color: '#D4AF37' },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  productTitle: { color: '#D4AF37', fontWeight: '800' },
  productMeta: { color: '#8e98a9' },
  downloadBtn: { backgroundColor: '#2b7a4a', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
  downloadText: { color: '#fff', fontWeight: '800' },
});
