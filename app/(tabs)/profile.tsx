import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  const profileActions = [
    {
      id: 'orders',
      label: 'Orders',
      icon: require('@/assets/images/profile/order.png'),
      route: '/orders',
    },
    {
      id: 'details',
      label: 'My Details',
      icon: require('@/assets/images/profile/my-details.png'),
      route: '/profile/details',
    },
    {
      id: 'delivery-address',
      label: 'Delivery Address',
      icon: require('@/assets/images/profile/delivery-address.png'),
      route: '/delivery-address',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: require('@/assets/images/profile/notifications.png'),
      route: '/notifications',
    },
    {
      id: 'contact-us',
      label: 'Contact Us',
      icon: require('@/assets/images/profile/notifications.png'),
      route: '/contact-us',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FB' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <IconSymbol name="chevron.left" size={20} color="#263a63" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Profile</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.profileRow}>
          <Image source={require('@/assets/images/profile.jpg')} style={styles.avatar} />
          <View style={{ marginLeft: 12 }}>
            <ThemedText type="defaultSemiBold">Andrea Hirata</ThemedText>
            <ThemedText style={{ color: '#9aa3a7', marginTop: 6 }}>hirata@gmail.com</ThemedText>
          </View>
        </View>

        <View style={styles.list}>
          {profileActions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItem}
              onPress={() => item.route && router.push(item.route)}
              activeOpacity={0.7}
            >
              <Image
                source={item.icon}
              />

              <ThemedText style={styles.listText}>
                {item.label}
              </ThemedText>

              <IconSymbol name="chevron.right" size={20} color="#9aa3a7" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.logoutWrap} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={() => {
            // TODO: clear auth state if present
            router.replace('/(auth)/login');
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="#263a63" />
          <ThemedText style={styles.logoutText}>Log Out</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { height: 80, paddingHorizontal: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '700', color: '#263a63' },
  container: { padding: 18 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  list: { marginTop: 24, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#f2f4f6' },
  listText: { flex: 1, marginLeft: 12, fontSize: 16 },
  logoutWrap: { width: '100%', marginTop: 20, paddingHorizontal: 18, paddingBottom: 20, backgroundColor: 'transparent' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 56, borderRadius: 12, backgroundColor: '#f2f4f6' },
  logoutText: { marginLeft: 10, fontSize: 16, fontWeight: '700', color: '#263a63' },
});
