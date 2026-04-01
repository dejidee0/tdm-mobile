import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, fetchMe, logout } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      await fetchMe();
    }

    getUser();
  }, []);

  const profileActions = [
    {
      id: 'orders',
      label: 'Orders',
      icon: require('@/assets/images/icons/orders.png'),
      type: 'image',
      route: '/orders',
    },
    {
      id: 'details',
      label: 'My Details',
      icon: require('@/assets/images/icons/id.png'),
      type: 'image',
      route: '/my-details',
    },
    {
      id: 'delivery-address',
      label: 'Delivery Address',
      icon: require('@/assets/images/icons/location.png'),
      type: 'image',
      route: '/delivery-address',
    },
    {
      id: 'rewards',
      label: 'Rewards',
      icon: require('@/assets/images/icons/rewards.png'),
      type: 'image',
      route: '/rewards',
    },
    {
      id: 'contact-us',
      label: 'Contact Us',
      icon: 'call-outline',
      type: 'ionicon',
      route: '/contact-us',
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#273054" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('/notifications')} style={styles.headerNotification}>
          <Ionicons name="notifications" size={24} color="#273054" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {user ? (
          <>
            <View style={styles.profileSection}>
              <Image source={require('@/assets/images/profile.jpg')} style={styles.avatar} />
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user?.name || 'Andrea Hirata'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'hirata@gmail.com'}</Text>
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
                  <View style={styles.iconContainer}>
                    {item.type === 'image' ? (
                      <Image source={item.icon} style={styles.iconImage} />
                    ) : (
                      <Ionicons name={item.icon as any} size={20} color="#273054" />
                    )}
                  </View>
                  <Text style={styles.listText}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#ccc" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.guestSection}>
            <Image source={require('@/assets/images/icons/id.png')} style={styles.guestIcon} />
            <Text style={styles.guestTitle}>You are not logged in</Text>
            <Text style={styles.guestSubTitle}>Sign in to view your profile, track your orders and manage your details.</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginBtnText}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {user && (
        <View style={styles.logoutWrap}>
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={async () => {
              await logout();
              return router.replace('/(auth)/login');
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#273054" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerBack: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerNotification: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: '#273054',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  userName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#273054',
  },
  userEmail: {
    fontSize: 13,
    color: '#999',
  },
  list: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  listText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#273054',
  },
  logoutWrap: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F2F3F2',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#273054',
  },
  guestSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  guestIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    opacity: 0.8,
    tintColor: '#273054',
  },
  guestTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#273054',
    marginBottom: 8,
  },
  guestSubTitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  loginBtn: {
    backgroundColor: '#273054',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    shadowColor: '#273054',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});
