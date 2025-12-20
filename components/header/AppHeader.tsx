import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AppHeaderProps = {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

export function AppHeader({
  icon,
  title,
  subtitle,
  children,
}: AppHeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.iconContainer}>
            <FontAwesome name={icon} size={18} color="#fff" />
          </View>

          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        {children ? <View style={styles.extra}>{children}</View> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F9FAFB',
  },

  container: {
    padding: 16,
    backgroundColor: '#F9FAFB',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },

  extra: {
    marginTop: 12,
  },
});
