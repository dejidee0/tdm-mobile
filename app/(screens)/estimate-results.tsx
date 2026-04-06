import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiFetch, getRenovationEstimates } from '../../services/api';

export default function EstimateResults() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [estimates, setEstimates] = useState<any[]>([]);

  // Example parameters fallback
  const estimateRange = String(params.range || '$45k - $62k');
  const timeline = String(params.timeline || '6-8 Weeks');
  const complexity = String(params.complexity || 'Medium');

  async function fetchEstimates() {
    setLoading(true);
    try {
      const res = await getRenovationEstimates();
      if (res.ok && res.data) {
        const data = res.data.estimates || [];
        setEstimates(data);
      } else {
        throw new Error(res.data?.message || 'Failed to fetch estimates');
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Could not load estimates');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEstimates();
  }, []);

  async function handleSaveProject() {
    setSaving(true);
    try {
      // Hit the AI projects creation endpoint
      const res = await apiFetch('/ai/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New AI Estimate',
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

        <Text style={styles.section}>Your Estimates</Text>

        {loading ? (
          <View style={styles.centerPlaceholder}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : estimates.length === 0 ? (
          <View style={styles.emptyStateWrap}>
            <Text style={styles.emptyTitle}>No estimates yet</Text>
            <Text style={styles.emptySub}>Create a new project to generate an AI-powered estimate.</Text>
            <TouchableOpacity style={styles.startButtonPrimary} onPress={() => router.push('/(screens)/ai-estimator') }>
              <Text style={styles.startButtonText}>Create Estimate</Text>
            </TouchableOpacity>
          </View>
        ) : (
          estimates.map((est: any) => {
            const id = est.estimateId || est.id;
            const created = new Date(est.createdAtUtc || est.createdAt || Date.now());
            const total = Number(est.totalEstimate ?? est.totalEstimate ?? 0);
            const currency = est.currency || '';
            return (
              <TouchableOpacity
                key={id}
                style={styles.estimateCard}
                onPress={() => router.push({ pathname: '/(screens)/detailed-estimate', params: { estimateId: id } })}
                activeOpacity={0.9}
              >
                <View style={styles.cardRow}>
                  <View style={styles.cardBody}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <View style={styles.cardHeaderLeft}>
                        <Text style={styles.cardProjectName}>{est.projectName || 'Unnamed Project'}</Text>
                        <Text style={styles.cardDate}>{created.toLocaleDateString()}</Text>
                      </View>
                      <Text style={{ color: '#FFF' }}>{currency} {total.toLocaleString()}</Text>
                    </View>

                    <View style={styles.chipsRow}>
                      <View style={styles.chip}><Ionicons name="home-outline" size={12} color="#cfe0ff" /><Text style={styles.chipText}>{est.roomType || '—'}</Text></View>
                      <View style={styles.chip}><Ionicons name="pricetag-outline" size={12} color="#cfe0ff" /><Text style={styles.chipText}>{id.split('-')[0]}</Text></View>
                    </View>

                    <View style={styles.cardFooterRight}>
                      <Text style={styles.viewDetailsText}>View Detailed BOQ</Text>
                      <Ionicons name="chevron-forward" size={16} color="#dfeaff" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
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
  small: { color: '#cfe0ff', fontWeight: '700', marginBottom: 8, fontSize: 12 },
  range: { color: '#fff', fontSize: 28, fontWeight: '900' },
  note: { color: '#dfeaff', marginTop: 6 },
  divider: { height: 1, backgroundColor: '#2f4fa8', marginVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  col: {},
  muted: { color: '#cfe0ff', fontWeight: '700' },
  bold: { color: '#fff', fontWeight: '900', marginTop: 6 },
  section: { marginTop: 22, color: '#273054', fontWeight: '800', marginBottom: 8 },
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
  levelCardSelected: { borderRadius: 12, borderWidth: 2, borderColor: '#22346f', overflow: 'hidden', marginBottom: 12 },
  levelCardLocked: { borderRadius: 12, overflow: 'hidden', marginBottom: 12, position: 'relative' },
  levelImage: { width: '100%', height: 140, backgroundColor: '#eee' },
  levelContent: { padding: 14, backgroundColor: '#fff' },
  levelContentLocked: { padding: 14, backgroundColor: '#fff', opacity: 0.9 },
  badge: { position: 'absolute', left: 12, top: 12, backgroundColor: '#fff', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12, fontWeight: '700' },
  levelTitle: { fontSize: 20, fontWeight: '900', color: '#273054' },
  levelPrice: { position: 'absolute', right: 16, top: 16, color: '#1f3b82', fontWeight: '900', fontSize: 18 },
  levelText: { color: '#8e98a9' },
  check: { color: '#2b7a4a', marginTop: 6 },
  lockOverlay: { position: 'absolute', left: '32%', top: '36%', backgroundColor: 'rgba(0,0,0,0.6)', padding: 10, borderRadius: 20 },
  lockText: { color: '#fff', fontWeight: '700' },
  footer: { position: 'absolute', left: 16, right: 16, bottom: 16, flexDirection: 'row', gap: 12 },
  outlineBtn: { flex: 1, height: 50, borderRadius: 12, borderWidth: 1.5, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  outlineText: { color: '#273054', fontWeight: '700' },
  primaryBtn: { flex: 2, height: 50, borderRadius: 12, backgroundColor: '#273054', alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#fff', fontWeight: '900' },
});
