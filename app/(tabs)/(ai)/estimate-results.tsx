import { getRenovationEstimates } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  primary: '#1A2138',
  accent: '#263A63',
  textSub: '#7B809A',
  bg: '#F7FAFC',
  white: '#FFFFFF',
  border: '#EDF2F7',
  success: '#2BB86B',
};

export default function EstimateResultsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [estimates, setEstimates] = useState<any[]>([]);

  const fetchEstimates = React.useCallback(async () => {
    setLoading(true);
    try {
      console.log('[EstimateResults] Fetching all estimates...');
      const res = await getRenovationEstimates();
      console.log('[EstimateResults] Response:', JSON.stringify(res, null, 2));

      if (res.ok && res.data) {
        // Handle both Array directly or { data: Array }
        const data = Array.isArray(res.data) ? res.data : (res.data.items || res.data.data || []);
        setEstimates(data);
      } else {
        throw new Error(res.data?.message || 'Failed to fetch estimates');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEstimates();
  }, [fetchEstimates]);

  const renderEstimateItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.estimateCard}
      onPress={() => router.push({
        pathname: '/(ai)/detailed-estimate',
        params: { estimateId: item.id }
      })}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardProjectName}>{item.projectName || 'Unnamed Project'}</Text>
          <Text style={styles.cardDate}>{new Date(item.createdAt || Date.now()).toLocaleDateString()}</Text>
        </View>
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>₦{item.totalCost?.toLocaleString() || '---'}</Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="home-outline" size={14} color={COLORS.textSub} />
          <Text style={styles.detailText}>{item.roomType}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="resize-outline" size={14} color={COLORS.textSub} />
          <Text style={styles.detailText}>{item.lengthMeters}x{item.widthMeters}m</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="construct-outline" size={14} color={COLORS.textSub} />
          <Text style={styles.detailText}>{item.finishLevel}</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.viewDetailsText}>View Detailed BOQ</Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.accent} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Estimates</Text>
        <TouchableOpacity onPress={fetchEstimates} disabled={loading}>
          <Ionicons name="refresh" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {loading && estimates.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={estimates}
          renderItem={renderEstimateItem}
          keyExtractor={(item) => item.id?.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Ionicons name="calculator-outline" size={64} color={COLORS.border} />
              </View>
              <Text style={styles.emptyTitle}>No Estimates Yet</Text>
              <Text style={styles.emptySub}>Start a new project to see AI-powered cost estimates here.</Text>
              <TouchableOpacity 
                style={styles.startButton}
                onPress={() => router.push('/(ai)/estimator')}
              >
                <Text style={styles.startButtonText}>Create New Estimate</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 24,
  },
  estimateCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardProjectName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: COLORS.textSub,
    fontWeight: '600',
  },
  priceBadge: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.accent,
  },
  cardDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: COLORS.textSub,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.accent,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
  },
  emptySub: {
    fontSize: 15,
    color: COLORS.textSub,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 40,
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 20,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
