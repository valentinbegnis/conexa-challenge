import { AppHeader } from '@/components/header/AppHeader';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { StarIcon } from '@/components/icons/StarIcon';
import { UsersIcon } from '@/components/icons/UsersIcon';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
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
          tabBarIcon: ({ color }) => <HeartIcon size={28} color={color} />,
          header: () => (
            <AppHeader
              icon="heart"
              title="Favorites"
              subtitle="0 saved articles"
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
              icon="users"
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
