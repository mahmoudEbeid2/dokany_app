import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {authAPI} from '../utils/api/api';

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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    marginTop: 6,
    fontSize: 14,
  },
  success: {
    color: 'green',
    marginTop: 6,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#7569FA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

