import { HeartIcon } from '@/components/icons/HeartIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { UsersIcon } from '@/components/icons/UsersIcon';
import { TabIconWithBadge } from '@/components/ui/TabIconWithBadge';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { colors } from '@/theme/colors';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const favoriteCount = useFavoritesStore(
    (state) => state.favoritePostIds.length
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          borderTopWidth: 1,
          paddingTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <TabIconWithBadge count={favoriteCount}>
              <HeartIcon size={size} color={color} />
            </TabIconWithBadge>
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color, size }) => <UsersIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="post/[id]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
