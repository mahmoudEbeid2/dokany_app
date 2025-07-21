import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../utils/api/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {

      const res = await authAPI.post('seller/login', { email, password });

      await AsyncStorage.setItem('token', res.data.token);

      alert('Login successful');
      setErrors({});
      navigation.navigate('Settings');
    } catch (err) {
      console.error(err);
      console.error('Login error:', err.message, err.stack);
      setErrors({
        general: err?.response?.data?.error || 'Login failed',
      });
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setErrors(prev => ({ ...prev, email: null }));
        }}
        style={[styles.input, errors.email && styles.inputError]}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setErrors(prev => ({ ...prev, password: null }));
        }}
        style={[styles.input, errors.password && styles.inputError]}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {errors.general && <Text style={styles.error}>{errors.general}</Text>}

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>
          Don't have an account? <Text style={styles.linkBold}>Register</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#7569FA',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#231f53ff',
    textAlign: 'center',
    marginTop: 18,
    fontSize: 14,
  },
  linkBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});




