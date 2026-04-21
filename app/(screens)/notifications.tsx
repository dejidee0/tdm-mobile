import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiFetch } from '../../services/api';

type Notification = { id: string; title: string; body: string; time: string; unread?: boolean; kind?: 'success' | 'reward' | 'info' | 'account' };

function IconBox({ kind }: { kind?: Notification['kind'] }) {
  const map: any = {
    success: { bg: '#e6faf0', fg: '#2f9a67', name: 'truck-check' },
    reward: { bg: '#ffeceb', fg: '#f05b4a', name: 'gift' },
    info: { bg: '#eef7ef', fg: '#27ae60', name: 'tag' },
    account: { bg: '#f0e9ff', fg: '#6b46c1', name: 'account' },
  };
  const cfg = kind && map[kind] ? map[kind] : map.info;
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
        <Text style={styles.cardTitle}>{n.title}</Text>
        <Text style={styles.cardText}>{n.body}</Text>
        <Text style={styles.cardTime}>{n.time || 'recently'}</Text>
      </View>

      {n.unread ? <View style={styles.redDot} /> : null}
    </View>
  );
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch('/account/notifications');
        if (res.ok && res.data) {
          setNotifications(Array.isArray(res.data) ? res.data : (res.data.data || []));
        }
      } catch {
        // Fallback to empty
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function markAllRead() {
    try {
      await apiFetch('/account/notifications', { method: 'PUT' });
      setNotifications(notifications.map(n => ({ ...n, unread: false })));
    } catch {
      // ignore
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#D4AF37" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.markBtn} onPress={markAllRead}>
            <Ionicons name="checkmark" size={20} color="#D4AF37" />
            <View style={styles.markDot} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : notifications.length === 0 ? (
          <Text style={{ color: '#999', textAlign: 'center', marginTop: 20 }}>No notifications</Text>
        ) : (
          <>
            <Text style={styles.sectionTitle}>ALL NOTIFICATIONS</Text>
            {notifications.map((n) => (
              <NotificationCard key={n.id} n={n} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  container: { padding: 16, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#000' },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#D4AF37' },
  markBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  markDot: { position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: '#e24a43' },
  sectionTitle: { color: '#999', fontSize: 12, fontWeight: '600', marginBottom: 12, textTransform: 'uppercase' },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, backgroundColor: '#D4AF37', marginBottom: 10, borderWidth: 1, borderColor: '#f5f5f5' },
  cardUnread: { backgroundColor: '#fff5f5', borderColor: '#ffe6e3' },
  iconBox: { width: 48, height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  cardBody: { flex: 1, gap: 4 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#D4AF37' },
  cardText: { fontSize: 13, color: '#999', lineHeight: 18 },
  cardTime: { fontSize: 11, color: '#ccc', marginTop: 2 },
  redDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#e24a43' },
});
