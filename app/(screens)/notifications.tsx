import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Notification = { id: string; title: string; body: string; time: string; unread?: boolean; kind?: 'success' | 'reward' | 'info' | 'account' };

const NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Order Delivered', body: 'Your Order #1234 has been delivered successfully', time: '5 min ago', unread: true, kind: 'success' },
  { id: '2', title: 'New Reward Unlocked!', body: 'You earned 20% off voucher. Use it on your next order', time: '2 hours ago', unread: true, kind: 'reward' },
  { id: '3', title: 'Weekend Special', body: 'Get 25% on all orders this weekend', time: '1 day ago', kind: 'info' },
  { id: '4', title: 'Order Confirmed', body: 'Your order #123 is being processed', time: '2 days ago', kind: 'info' },
  { id: '5', title: 'Account Updated', body: 'Your delivery address has been updated', time: '5 min ago', kind: 'account' },
];

function IconBox({ kind }: { kind?: Notification['kind'] }) {
  const map: any = {
    success: { bg: '#e6faf0', fg: '#2f9a67', name: 'truck-check' },
    reward: { bg: '#ffeceb', fg: '#f05b4a', name: 'gift' },
    info: { bg: '#eef7ef', fg: '#27ae60', name: 'tag' },
    account: { bg: '#f0e9ff', fg: '#6b46c1', name: 'account' },
  };
  const cfg = kind ? map[kind] : map.info;
  return (
    <View style={[styles.iconBox, { backgroundColor: cfg.bg }]}>
      <MaterialCommunityIcons name={cfg.name} size={22} color={cfg.fg} />
    </View>
  );
}

function NotificationCard({ n }: { n: Notification }) {
  return (
    <View style={[styles.card, n.unread ? styles.cardUnread : undefined]}>
      <IconBox kind={n.kind} />

      <View style={styles.cardBody}>
        <ThemedText style={styles.cardTitle}>{n.title}</ThemedText>
        <ThemedText style={styles.cardText}>{n.body}</ThemedText>
        <ThemedText style={styles.cardTime}>{n.time}</ThemedText>
      </View>

      {n.unread ? <View style={styles.redDot} /> : null}
    </View>
  );
}

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color="#263a63" />
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.headerTitle}>Notifications</ThemedText>
          <TouchableOpacity style={styles.markBtn}>
            <ThemedText style={styles.markText}>✓</ThemedText>
            <View style={styles.markDot} />
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.sectionTitle}>TODAY</ThemedText>
        {NOTIFICATIONS.filter((x, i) => i < 2).map((n) => (
          <NotificationCard key={n.id} n={n} />
        ))}

        <ThemedText style={[styles.sectionTitle, { marginTop: 18 }]}>EARLIER</ThemedText>
        {NOTIFICATIONS.filter((x, i) => i >= 2).map((n) => (
          <NotificationCard key={n.id} n={n} />
        ))}
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
  markBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  markText: { fontSize: 16, color: '#263a63' },
  markDot: { position: 'absolute', top: 4, right: 0, width: 10, height: 10, borderRadius: 6, backgroundColor: '#ff3b30' },

  sectionTitle: { color: '#9aa3a7', fontSize: 12, marginBottom: 8 },

  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#fff' },
  cardUnread: { backgroundColor: '#fff5f6', borderColor: '#fdecea' },
  iconBox: { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  iconEmoji: { fontSize: 20 },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  cardText: { fontSize: 12, color: '#9aa3a7', marginTop: 6 },
  cardTime: { fontSize: 10, color: '#c3c7cb', marginTop: 8 },
  redDot: { width: 10, height: 10, borderRadius: 6, backgroundColor: '#ff3b30' },
});
