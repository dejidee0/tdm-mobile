import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiFetch } from '../../services/api';

export default function EstimateResults() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [saving, setSaving] = useState(false);

  // Example parameters that could have been mapped
  const estimateRange = String(params.range || '$45k - $62k');
  const timeline = String(params.timeline || '6-8 Weeks');
  const complexity = String(params.complexity || 'Medium');

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

        <View style={styles.card}>
          <Text style={styles.small}>AI ANALYSIS COMPLETE</Text>
          <Text style={styles.range}>{estimateRange}</Text>
          <Text style={styles.note}>Estimated Total Budget Range</Text>
          <View style={styles.divider} />
          <View style={styles.row}> 
            <View style={styles.col}>
              <Text style={styles.muted}>Timeline</Text>
              <Text style={styles.bold}>{timeline}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.muted}>Complexity</Text>
              <Text style={styles.bold}>{complexity}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.section}>Finish Levels</Text>

        <View style={styles.levelCardSelected}>
          <Image source={require('@/assets/images/placeholder.jpg')} style={styles.levelImage} />
          <View style={styles.levelContent}>
            <Text style={styles.badge}>Selected</Text>
            <Text style={styles.levelTitle}>Economy</Text>
            <Text style={styles.levelPrice}>$45,000</Text>
            <View style={{ height: 8 }} />
            <Text style={styles.levelText}>Standard materials & finishes</Text>
            <View style={{ height: 8 }} />
            <Text style={styles.check}>• Laminate countertops</Text>
            <Text style={styles.check}>• Standard appliances</Text>
            <Text style={styles.check}>• Vinyl flooring</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.levelCardLocked} activeOpacity={0.8} onPress={() => router.push('/(screens)/detailed-estimate')}>
          <Image source={require('@/assets/images/placeholder.jpg')} style={[styles.levelImage, { opacity: 0.4 }]} />
          <View style={styles.lockOverlay}>
            <Text style={styles.lockText}>Unlock Estimate</Text>
          </View>
          <View style={styles.levelContentLocked}>
            <Text style={styles.levelTitle}>Premium</Text>
            <Text style={[styles.levelText, { color: '#9aa0ae' }]}>High-end durable materials</Text>
          </View>
        </TouchableOpacity>

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
