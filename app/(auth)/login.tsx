import { StarIcon } from '@/components/icons/StarIcon';
import { useAuthStore } from '@/features/auth/store/authStore';
import { colors } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function LoginScreen() {
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailIsValid = useMemo(() => isValidEmail(email), [email]);
  const showError = submitted && !emailIsValid;

  const handleLogin = async () => {
    setSubmitted(true);

    if (!emailIsValid || loading) return;

    try {
      setLoading(true);
      await login(email.trim(), 'password');
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || (submitted && !emailIsValid);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <View style={styles.brand}>
            <LinearGradient
              colors={[colors.primary, colors.primarySoft]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.brandIcon}
            >
              <StarIcon size={16} color={colors.white} />
            </LinearGradient>
            <Text style={styles.brandName}>Conexa News</Text>
          </View>

          <View style={styles.spacer} />

          <View>
            <Text style={styles.title}>Welcome back</Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (submitted) {
                  setSubmitted(false);
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                styles.input,
                showError && styles.inputError,
              ]}
            />

            {showError && (
              <Text style={styles.errorText}>
                Please enter a valid email address
              </Text>
            )}

            <Pressable
              onPress={handleLogin}
              disabled={disabled}
              style={({ pressed }) => [
                styles.buttonWrapper,
                disabled && styles.buttonDisabled,
                pressed && !disabled && styles.buttonPressed,
              ]}
            >
              <LinearGradient
                colors={[colors.primary, colors.primarySoft]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Signing in...' : 'Sign in'}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.spacer} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  brandName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  brandIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  spacer: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: colors.textPrimary,
  },

  input: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  inputError: {
    borderColor: '#EF4444',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginBottom: 12,
  },

  buttonWrapper: {
    borderRadius: 12,
  },

  button: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  buttonText: {
    color: colors.white,
    fontWeight: '600',
  },
});
