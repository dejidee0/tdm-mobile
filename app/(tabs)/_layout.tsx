import { HapticTab } from '@/components/haptic-tab';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import React from 'react';

const TAB_ICONS = {
  home: {
    active: require('@/assets/images/tabs/home-active.png'),
    inactive: require('@/assets/images/tabs/home-inactive.png'),
  },
  cart: {
    active: require('@/assets/images/tabs/cart-active.png'),
    inactive: require('@/assets/images/tabs/cart-inactive.png'),
  },
  favorites: {
    active: require('@/assets/images/tabs/favorite-active.png'),
    inactive: require('@/assets/images/tabs/favorite-inactive.png'),
  },
  profile: {
    active: require('@/assets/images/tabs/profile-active.png'),
    inactive: require('@/assets/images/tabs/profile-inactive.png'),
  },
};

function TabIcon({
  focused,
  active,
  inactive,
}: {
  focused: boolean;
  active: any;
  inactive: any;
}) {
  return (
    <Image
      source={focused ? active : inactive}
      style={{ width: 30, height: 30 }}
      contentFit="contain"
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#263A63',
        tabBarInactiveTintColor: '#9AA3A7',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 85,
          paddingBottom: 12,
          paddingTop: 8,
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
              active={TAB_ICONS.home.active}
              inactive={TAB_ICONS.home.inactive}
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
              active={TAB_ICONS.cart.active}
              inactive={TAB_ICONS.cart.inactive}
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
              active={TAB_ICONS.favorites.active}
              inactive={TAB_ICONS.favorites.inactive}
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
              active={TAB_ICONS.profile.active}
              inactive={TAB_ICONS.profile.inactive}
            />
          ),
        }}
      />
    </Tabs>
  );
}
