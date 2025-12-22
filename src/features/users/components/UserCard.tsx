import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';
import { colors } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { User } from '../types';

type UserProps = {
  user: User;
};

export function UserCard({ user }: UserProps) {
  const initials = `${user.firstname[0]}${user.lastname[0]}`;

  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>

        <LinearGradient
          colors={[colors.primary, colors.primarySoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.statusDot}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {user.firstname} {user.lastname}
        </Text>

        <View style={styles.row}>
          <EnvelopeIcon size={14} color={colors.textSecondary} />
          <Text style={styles.text}>{user.email}</Text>
        </View>

        <View style={styles.row}>
          <PhoneIcon size={14} color={colors.textSecondary} />
          <Text style={styles.text}>{user.phone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  avatarContainer: {
    marginRight: 16,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  initials: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.textSecondary,
  },

  statusDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.white,
  },

  info: {
    flex: 1,
    justifyContent: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },

  text: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
