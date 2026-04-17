import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiFetch, createRenovationEstimate } from '../../services/api';

export default function EstimateResults() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [estimate, setEstimate] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('economy');

  // Example parameters fallback
  const estimateRange = String(params.range || '$45k - $62k');
  const timeline = String(params.timeline || '6-8 Weeks');
  const complexity = String(params.complexity || 'Medium');
  const routeEstimateId = String(params.estimateId || '');

  async function fetchEstimateById(id: string) {
    setLoading(true);
    try {
      const res = await apiFetch(`/estimates/${encodeURIComponent(id)}`);
      console.log({ res: res.data });
      if (res.ok && res.data) {
        setEstimate(res.data);
      } else {
        throw new Error(res.data?.message || 'Failed to fetch estimate');
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Could not load estimate');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      // If route provided estimateId, fetch it directly
      if (routeEstimateId) {
        await fetchEstimateById(routeEstimateId);
        return;
      }

      // Otherwise create an estimate (AI) and then fetch from /estimates/{id}
      setCreating(true);
      try {
        const payload = {
          budgetRange: estimateRange,
          timeline,
          complexity,
        };
        const res = await createRenovationEstimate(payload);
        if (res.ok && res.data && res.data.estimateId) {
          const newId = String(res.data.estimateId);
          await fetchEstimateById(newId);
        } else {
          throw new Error(res.data?.message || 'Failed to create estimate');
        }
      } catch (e: any) {
        Alert.alert('Error', e.message || 'Unable to generate estimate');
      } finally {
        setCreating(false);
      }
    }

    init();
  }, [routeEstimateId]);

  async function handleSaveProject() {
    setSaving(true);
    try {
      const res = await apiFetch('/ai/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: estimate?.projectName || 'New AI Estimate',
          budgetRange: estimateRange,
          timeline,
          complexity,
        }),
      });
      if (res.ok) {
        Alert.alert('Saved!', 'Project has been saved successfully.');
      } else {
        throw new Error(res.data?.message || 'Failed to save project');
      }
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#273054" />
          </TouchableOpacity>
          <Text style={styles.header}>Estimate Results</Text>
        </View>

        <Text style={styles.section}>Estimate Summary</Text>

        {loading || creating ? (
          <View style={styles.centerPlaceholder}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : !estimate ? (
          <View style={styles.emptyStateWrap}>
            <Text style={styles.emptyTitle}>No estimate available</Text>
            <Text style={styles.emptySub}>Try creating an estimate from the estimator screen.</Text>
            <TouchableOpacity style={styles.startButtonPrimary} onPress={() => router.push('/(screens)/ai-estimator') }>
              <Text style={styles.startButtonText}>Create Estimate</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.topCard}>
              <Text style={styles.small}>AI ANALYSIS COMPLETE</Text>
              <Text style={styles.range}>{estimate.budgetRange || estimateRange}</Text>
              <Text style={styles.note}>Estimated Total Budget Range</Text>

              <View style={styles.divider} />
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.muted}>Timeline</Text>
                  <Text style={styles.bold}>{estimate.timeline || timeline}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.muted, { textAlign: 'right' }]}>Complexity</Text>
                  <Text style={[styles.bold, { textAlign: 'right' }]}>{estimate.complexity || complexity}</Text>
                </View>
              </View>
            </View>

            <View style={{ height: 18 }} />

            <View style={styles.sectionRow}>
              <Text style={[styles.section, { marginTop: 0 }]}>Finish Levels</Text>
              <View style={styles.pill}><Text style={{ color: '#5b637a' }}>{(estimate.options || []).length || 3} Options</Text></View>
            </View>

            {(estimate.options || sampleOptions()).map((opt: any) => {
              const isSelected = selectedLevel === (opt.key || opt.id || opt.name.toLowerCase());
              const locked = !!opt.locked && !isSelected;
              return (
                <View key={opt.key || opt.id || opt.name} style={[styles.levelCard, isSelected ? styles.levelCardSelected : styles.levelCardLocked]}>
                  <View style={styles.levelImage} />
                  {isSelected && <View style={styles.badgeWrap}><Text style={styles.badgeText}>Selected</Text></View>}
                  {locked && (
                    <TouchableOpacity style={styles.lockOverlay} onPress={() => Alert.alert('Locked', 'Unlock this estimate to view details')}>
                      <Ionicons name="lock-closed" size={16} color="#fff" />
                      <Text style={styles.lockText}> Unlock Estimate</Text>
                    </TouchableOpacity>
                  )}

                  <View style={styles.levelContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.levelTitle}>{opt.name}</Text>
                      <Text style={styles.levelPrice}>{estimate.currency || '$'}{Number(opt.price || opt.amount || 0).toLocaleString()}</Text>
                    </View>
                    <Text style={styles.levelText}>{opt.subtitle}</Text>

                    <View style={{ height: 12 }} />
                    {(opt.features || []).map((f: string, i: number) => (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <Ionicons name="checkmark-circle" size={18} color={isSelected ? '#2bb86b' : '#c5cbd6'} />
                        <Text style={{ color: '#55606b' }}>{f}</Text>
                      </View>
                    ))}
                    {!isSelected && !locked && (
                      <TouchableOpacity style={styles.selectBtn} onPress={() => setSelectedLevel(opt.key || opt.id || opt.name.toLowerCase())}>
                        <Text style={styles.selectBtnText}>Select</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.outlineBtn} onPress={() => router.back()} disabled={saving}>
          <Text style={styles.outlineText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleSaveProject} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>Save to Projects</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 120 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6, height: 50 },
  backBtn: { padding: 6 },
  header: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '800', color: '#273054', marginRight: 36 },
  card: { backgroundColor: '#243b8a', borderRadius: 14, padding: 20, marginTop: 10, shadowColor: '#243b8a', shadowOpacity: 0.12, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 6 },
  section: { marginTop: 22, color: '#273054', fontWeight: '800', marginBottom: 8 },
  topCard: { backgroundColor: '#243b8a', borderRadius: 14, padding: 20, shadowColor: '#243b8a', shadowOpacity: 0.12, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 6 },
  small: { color: '#cfe0ff', fontWeight: '700', marginBottom: 8, fontSize: 12 },
  range: { color: '#fff', fontSize: 28, fontWeight: '900' },
  note: { color: '#dfeaff', marginTop: 6 },
  divider: { height: 1, backgroundColor: '#2f4fa8', marginVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  muted: { color: '#cfe0ff', fontWeight: '700' },
  bold: { color: '#fff', fontWeight: '900', marginTop: 6 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
  pill: { backgroundColor: '#f3f5f8', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  levelCard: { borderRadius: 16, overflow: 'hidden', marginBottom: 20, borderWidth: 2, borderColor: '#e6e9ef' },
  levelCardSelected: { borderColor: '#243b8a' },
  levelCardLocked: { opacity: 0.9 },
  levelImage: { width: '100%', height: 140, backgroundColor: '#eee' },
  levelContent: { padding: 14, backgroundColor: '#fff' },
  badgeWrap: { position: 'absolute', left: 14, top: 110 },
  badgeText: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, fontWeight: '700', color: '#243b8a' },
  levelTitle: { fontSize: 20, fontWeight: '900', color: '#273054' },
  levelPrice: { color: '#1f3b82', fontWeight: '900', fontSize: 18 },
  levelText: { color: '#8e98a9' },
  selectBtn: { marginTop: 10, backgroundColor: '#273054', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, alignSelf: 'flex-start' },
  selectBtnText: { color: '#fff', fontWeight: '900' },
  estimateCard: {
    backgroundColor: '#243b8a',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(207,224,255,0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardProjectName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  cardDate: {
    fontSize: 12,
    color: '#b5cff0',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  priceBadge: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  cardDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2f4fa8',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#dfeaff',
    fontWeight: '700',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.3,
  },
  centerPlaceholder: { padding: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: '#243b8a', borderRadius: 12, marginBottom: 16 },
  emptyStateWrap: { alignItems: 'center', padding: 24 },
  emptyTitle: { fontSize: 20, fontWeight: '900', color: '#273054', marginBottom: 8 },
  emptySub: { color: '#7B809A', textAlign: 'center', marginBottom: 12 },
  startButtonPrimary: { backgroundColor: '#273054', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  startButtonText: { color: '#fff', fontWeight: '800' },
  cardRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  priceCurrency: { color: '#cfe0ff', fontWeight: '800', fontSize: 11, letterSpacing: 0.5, marginBottom: 2 },
  priceAmount: { color: '#fff', fontWeight: '900', fontSize: 20, marginTop: 6, letterSpacing: -0.5 },
  cardBody: { flex: 1, justifyContent: 'space-between' },
  cardHeaderLeft: { marginBottom: 10 },
  chipsRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(79,157,255,0.08)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(207,224,255,0.25)' },
  chipText: { color: '#dfeaff', fontSize: 13, fontWeight: '700' },
  cardFooterRight: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(207,224,255,0.1)' },
  check: { color: '#2b7a4a', marginTop: 6 },
  lockOverlay: { position: 'absolute', left: '32%', top: '36%', backgroundColor: 'rgba(0,0,0,0.6)', padding: 10, borderRadius: 20 },
  lockText: { color: '#fff', fontWeight: '700' },
  footer: { position: 'absolute', left: 16, right: 16, bottom: 16, flexDirection: 'row', gap: 12 },
  outlineBtn: { flex: 1, height: 50, borderRadius: 12, borderWidth: 1.5, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  outlineText: { color: '#273054', fontWeight: '700' },
  primaryBtn: { flex: 2, height: 50, borderRadius: 12, backgroundColor: '#273054', alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#fff', fontWeight: '900' },
});

function sampleOptions() {
  return [
    { key: 'economy', name: 'Economy', subtitle: 'Standard materials & finishes', price: 45000, features: ['Laminate countertops', 'Standard appliances', 'Vinyl flooring'] },
    { key: 'premium', name: 'Premium', subtitle: 'Higher quality materials', price: 65000, locked: true, features: ['Quartz countertops', 'Upgraded appliances', 'Engineered hardwood'] },
    { key: 'luxury', name: 'Luxury', subtitle: 'Top-tier finishes', price: 95000, locked: true, features: ['Marble countertops', 'High-end appliances', 'Solid hardwood'] },
  ];
}
