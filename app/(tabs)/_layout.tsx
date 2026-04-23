import { HapticTab } from '@/components/haptic-tab';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TAB_ICONS = {
  home: { active: 'home', inactive: 'home-outline' },
  cart: { active: 'cart', inactive: 'cart-outline' },
  favorites: { active: 'heart', inactive: 'heart-outline' },
  profile: { active: 'person', inactive: 'person-outline' },
};

function TabIcon({
  focused,
  icon,
}: {
  focused: boolean;
  icon: { active: string; inactive: string };
}) {
  return (
    <Ionicons
      name={focused ? icon.active : icon.inactive}
      size={28}
      color={focused ? '#D4AF37' : '#9AA3A7'}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#9AA3A7',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 85,
          paddingBottom: 12,
          paddingTop: 8,
          backgroundColor: '#000',
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={TAB_ICONS.home}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={TAB_ICONS.cart}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={TAB_ICONS.favorites}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={TAB_ICONS.profile}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(ai)"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
