import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const REWARDS = new Array(4).fill(0).map((_, i) => ({ id: String(i + 1), title: 'Free Delivery', points: 500 }));

function RewardItem({ title, points }: { title: string; points: number }) {
  return (
    <View style={styles.rewardRow}>
      <View style={styles.rewardIconWrap}>
        <View style={styles.rewardIconInner}>
          <ThemedText style={styles.giftEmoji}>🎁</ThemedText>
        </View>
      </View>

      <View style={styles.rewardInfo}>
        <ThemedText style={styles.rewardTitle}>{title}</ThemedText>
        <ThemedText style={styles.rewardPoints}>{points} points</ThemedText>
      </View>

      <TouchableOpacity style={styles.claimBtn} activeOpacity={0.8}>
        <ThemedText style={styles.claimText}>Claim</ThemedText>
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
            <IconSymbol name="chevron.left" size={24} color="#263a63" />
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.headerTitle}>
            Rewards
          </ThemedText>
          <View style={{ width: 36 }} />
        </View>

        <LinearGradient colors={["rgba(38, 47, 86, 1)", "rgba(83, 103, 188, 1)"]} style={styles.pointsCard} start={[0, 0]} end={[1, 1]}>
          <ThemedText style={styles.pointsLabel}>Your Points</ThemedText>
          <ThemedText type="title" style={styles.pointsAmount}>1,250</ThemedText>
          <ThemedText style={styles.pointsSub}>250 points until next reward</ThemedText>
        </LinearGradient>

        <ThemedText type="defaultSemiBold" style={styles.availableTitle}>Available Rewards</ThemedText>

        <ThemedView style={styles.listCard}>
          {REWARDS.map((r) => (
            <RewardItem key={r.id} title={r.title} points={r.points} />
          ))}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F9FB' },
  container: { padding: 16, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#263a63', fontSize: 18 },

  pointsCard: {
    height: 120,
    borderRadius: 12,
    padding: 18,
    justifyContent: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },
  pointsLabel: { color: '#fff', fontSize: 12, marginBottom: 6 },
  pointsAmount: { color: '#fff', fontSize: 28, fontWeight: '900', marginBottom: 6 },
  pointsSub: { color: '#e6e9ff', fontSize: 12 },

  availableTitle: { marginBottom: 10, color: '#111827' },
  listCard: { backgroundColor: '#fff', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 6 },

  rewardRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8, borderBottomColor: '#f1f3f4', borderBottomWidth: 1 },
  rewardIconWrap: { paddingRight: 12 },
  rewardIconInner: { width: 42, height: 42, borderRadius: 10, backgroundColor: '#ffe9ef', alignItems: 'center', justifyContent: 'center' },
  giftEmoji: { fontSize: 18 },
  rewardInfo: { flex: 1 },
  rewardTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  rewardPoints: { fontSize: 12, color: '#9aa3a7', marginTop: 2 },
  claimBtn: { backgroundColor: '#ff8b8b', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 14 },
  claimText: { color: '#fff', fontWeight: '600' },
});
