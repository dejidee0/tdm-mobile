import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const REWARDS = new Array(4).fill(0).map((_, i) => ({ id: String(i + 1), title: 'Free Delivery', points: 500 }));

function RewardItem({ title, points }: { title: string; points: number }) {
  return (
    <View style={styles.rewardRow}>
      <View style={styles.rewardIconWrap}>
        <View style={styles.rewardIconInner}>
          <Ionicons name="gift" size={22} color="#e24a43" />
        </View>
      </View>

      <View style={styles.rewardInfo}>
        <Text style={styles.rewardTitle}>{title}</Text>
        <Text style={styles.rewardPoints}>{points} points</Text>
      </View>

      <TouchableOpacity style={styles.claimBtn} activeOpacity={0.8}>
        <Text style={styles.claimText}>Claim</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function RewardsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#273054" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rewards</Text>
          <View style={{ width: 40 }} />
        </View>

        <LinearGradient colors={['#273054', '#5367bc']} style={styles.pointsCard} start={[0, 0]} end={[1, 1]}>
          <Text style={styles.pointsLabel}>Your Points</Text>
          <Text style={styles.pointsAmount}>1,250</Text>
          <Text style={styles.pointsSub}>250 points until next reward</Text>
        </LinearGradient>

        <Text style={styles.availableTitle}>Available Rewards</Text>

        <View style={styles.listCard}>
          {REWARDS.map((r) => (
            <RewardItem key={r.id} title={r.title} points={r.points} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#273054' },
  pointsCard: { height: 140, borderRadius: 14, padding: 20, justifyContent: 'center', marginBottom: 24, overflow: 'hidden', shadowColor: '#273054', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  pointsLabel: { color: '#fff', fontSize: 12, fontWeight: '500', marginBottom: 8 },
  pointsAmount: { color: '#fff', fontSize: 32, fontWeight: '800', marginBottom: 8 },
  pointsSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  availableTitle: { fontWeight: '900', fontSize: 16, color: '#273054', marginBottom: 12 },
  listCard: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  rewardRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 14, borderBottomColor: '#f5f5f5', borderBottomWidth: 1 },
  rewardIconWrap: { marginRight: 12 },
  rewardIconInner: { width: 44, height: 44, borderRadius: 10, backgroundColor: '#ffe6e3', alignItems: 'center', justifyContent: 'center' },
  rewardInfo: { flex: 1, gap: 3 },
  rewardTitle: { fontSize: 15, fontWeight: '600', color: '#273054' },
  rewardPoints: { fontSize: 12, color: '#999' },
  claimBtn: { backgroundColor: '#e24a43', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  claimText: { color: '#fff', fontWeight: '600', fontSize: 13 },
});
