import { AppHeader } from '@/components/header/AppHeader';
import { StarIcon } from '@/components/icons/StarIcon';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function HomeHeader({ value, onChangeText }: Props) {
  return (
    <AppHeader
      icon={<StarIcon size={20} color="#fff" />}
      title="Discover"
      subtitle="Your daily news digest"
    >
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color="#9CA3AF" />
        <TextInput
          placeholder="Search by title or content..."
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
        />
      </View>
    </AppHeader>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
  },
});