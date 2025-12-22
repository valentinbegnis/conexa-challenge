import { AppHeader } from '@/components/header/AppHeader';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { StarIcon } from '@/components/icons/StarIcon';
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
        headerShown: true
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
          header: () => (
            <AppHeader
              icon={<StarIcon size={20} color='#fff' />}
              title="Discover"
              subtitle="Your daily news digest"
            />
          )
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
          header: () => (
            <AppHeader
              icon={<HeartIcon size={20} color='#fff' />}
              title="Favorites"
              subtitle="Your saved articles"
            />
          )
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) => <UsersIcon size={28} color={color} />,
          header: () => (
            <AppHeader
              icon={<UsersIcon size={20} color='#fff' />}
              title="Community"
              subtitle="0 active members"
            />
          )
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
