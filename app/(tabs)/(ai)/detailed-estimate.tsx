import { getRenovationEstimateById } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#1A2138',
  accent: '#263A63',
  textSub: '#7B809A',
  bg: '#F7FAFC',
  white: '#FFFFFF',
  border: '#EDF2F7',
  success: '#2BB86B',
  warning: '#F59E0B',
};

export default function DetailedEstimateScreen() {
  const router = useRouter();
  const { estimateId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [estimate, setEstimate] = useState<any>(null);
  const [unlocked, setUnlocked] = useState(false);

  const fetchEstimate = React.useCallback(async () => {
    setLoading(true);
    try {
      console.log(`[DetailedEstimate] Fetching estimate: ${estimateId}`);
      const res = await getRenovationEstimateById(estimateId as string);
      console.log(`[DetailedEstimate] Response:`, JSON.stringify(res, null, 2));
      
      if (res.ok && res.data) {
        setEstimate(res.data);
      } else {
        throw new Error(res.data?.message || 'Failed to fetch estimate details');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
      router.back();
    } finally {
      setLoading(false);
    }
  }, [estimateId, router]);

  useEffect(() => {
    if (estimateId) {
      fetchEstimate();
    }
  }, [estimateId, fetchEstimate]);

  const handleUnlock = () => {
    setLoading(true);
    // Standard simulation of payment/unlock flow as per detailed documentation request
    setTimeout(() => {
      setUnlocked(true);
      setLoading(false);
      Alert.alert('Success', 'Detailed BOQ has been unlocked!');
    }, 1500);
  };

  if (loading && !estimate) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Estimate Details</Text>
        <TouchableOpacity onPress={fetchEstimate}>
          <Ionicons name="refresh" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Project Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.projectLabel}>PROJECT</Text>
          <Text style={styles.projectName}>{estimate?.projectName || 'Renovation Project'}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{estimate?.roomType || 'Living Room'}</Text>
              <Text style={styles.statLabel}>ROOM TYPE</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {estimate?.lengthMeters}x{estimate?.widthMeters}m
              </Text>
              <Text style={styles.statLabel}>DIMENSIONS</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{estimate?.finishLevel}</Text>
              <Text style={styles.statLabel}>FINISH</Text>
            </View>
          </View>
        </View>

        {/* Total Cost Summary */}
        <View style={styles.costCard}>
          <Text style={styles.costLabel}>Estimated Total Price</Text>
          <Text style={styles.costValue}>₦{estimate?.totalCost?.toLocaleString() || '---'}</Text>
          <View style={styles.contingencyBadge}>
            <Text style={styles.contingencyText}>Incl. {estimate?.contingencyPercent}% Contingency Buffer</Text>
          </View>
        </View>

        {/* Lock Section */}
        {!unlocked ? (
          <View style={styles.lockBlock}>
            <View style={styles.lockIconWrap}>
              <Ionicons name="lock-closed" size={36} color={COLORS.primary} />
            </View>
            <Text style={styles.lockTitle}>Unlock Detailed BOQ</Text>
            <Text style={styles.lockSubtitle}>Get a comprehensive breakdown of materials, labor costs, and project specifications.</Text>

            <TouchableOpacity style={styles.unlockButton} onPress={handleUnlock} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.unlockButtonText}>Unlock for ₦15,000</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.unlockedContent}>
            <Text style={styles.sectionTitle}>DETAILED BREAKDOWN</Text>
            
            {/* Sample Item Categories */}
            {['Materials', 'Labor', 'Fittings', 'Logistics'].map((cat, idx) => (
              <View key={idx} style={styles.breakdownItem}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>{cat}</Text>
                  <Text style={styles.categoryPrice}>₦{(Math.random() * 500000).toFixed(0).toLocaleString()}</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemName}>High Performance Tiles</Text>
                  <Text style={styles.itemQty}>42 sqm</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemName}>Premium Emulsion Paint</Text>
                  <Text style={styles.itemQty}>12 buckets</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.downloadButton}>
              <Ionicons name="download-outline" size={20} color={COLORS.white} />
              <Text style={styles.downloadText}>Download Full PDF Report</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom Bar for Incomplete State */}
      {!unlocked && (
        <View style={styles.bottomBar}>
          <Text style={styles.bottomHint}>Want to proceed with ordering materials?</Text>
          <TouchableOpacity style={styles.contactBtn} onPress={() => router.push('/(screens)/contact-us')}>
            <Text style={styles.contactBtnText}>Talk to an Expert</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: COLORS.bg,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  scrollContent: {
    padding: 24,
  },
  overviewCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  projectLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1,
  },
  projectName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    marginTop: 8,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  costCard: {
    backgroundColor: '#EBF4FF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 32,
  },
  costLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: 8,
  },
  costValue: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
  },
  contingencyBadge: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  contingencyText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accent,
  },
  lockBlock: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: COLORS.bg,
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
  },
  lockIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  lockTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
  },
  lockSubtitle: {
    fontSize: 14,
    color: COLORS.textSub,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  unlockButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  unlockButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  unlockedContent: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 16,
  },
  breakdownItem: {
    backgroundColor: COLORS.bg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  categoryPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: COLORS.textSub,
  },
  itemQty: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  downloadButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 18,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  downloadText: {
    color: COLORS.white,
    fontWeight: '700',
    marginLeft: 10,
  },
  bottomBar: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  bottomHint: {
    color: COLORS.textSub,
    fontSize: 13,
    marginBottom: 12,
  },
  contactBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  contactBtnText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSub,
    marginTop: 4,
    letterSpacing: 0.5,
  }
});
