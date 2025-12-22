import { HeartIcon } from '@/components/icons/HeartIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { UsersIcon } from '@/components/icons/UsersIcon';
import { TabIconWithBadge } from '@/components/ui/TabIconWithBadge';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const favoriteCount = useFavoritesStore(
    (state) => state.favoritePostIds.length
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => (
            <TabIconWithBadge count={favoriteCount}>
              <HeartIcon size={28} color={color} />
            </TabIconWithBadge>
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) => <UsersIcon size={28} color={color} />,
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
