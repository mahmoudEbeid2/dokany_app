import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {authAPI} from '../utils/api/api';
import theme from '../utils/theme';

export default function ConfirmPasswordScreen({ route }) {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const token = route?.params?.token;

  const handleConfirm = async () => {
    setError('');
    setMessage('');

    if (!newPassword.trim()) {
      setError('Password is required');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await authAPI.post('seller/reset-password/confirm', { token, newPassword });
      setMessage(res.data.message || 'Password has been reset successfully.');
    } catch (err) {
      setError(err?.response?.data?.error || 'Password reset failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set New Password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New password"
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            setError('');
            setMessage('');
          }}
          secureTextEntry
          placeholderTextColor="#999"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {message ? <Text style={styles.success}>{message}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
  },
  title: {
    fontSize: theme.fonts.size.lg,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    fontFamily: theme.fonts.regular,
    ...theme.shadow,
  },
  error: {
    color: theme.colors.error,
    marginTop: 6,
    fontSize: theme.fonts.size.sm,
  },
  success: {
    color: theme.colors.success,
    marginTop: 6,
    fontSize: theme.fonts.size.sm,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    marginTop: 12,
    ...theme.shadow,
  },
  buttonText: {
    color: theme.colors.card,
    fontWeight: 'bold',
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.bold,
  },
});

