import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { authAPI } from '../utils/api/api';
import { AntDesign } from '@expo/vector-icons';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleReset = async () => {
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      const res = await authAPI.post('seller/reset-password', { email });
      setMessage(res.data.message || 'A reset link has been sent to your email.');
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to send reset link');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={styles.navigationContainer}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text
              style={styles.navigationTitle}
            >
              Reset Password
            </Text>
          </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Reset Password</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError('');
                    setMessage('');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#665491"
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                
                {message ? <Text style={styles.success}>{message}</Text> : null}
              </View>

              <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Text style={styles.buttonText}>Send Reset Link</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navigationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    marginTop: 10,
    flex: 1,
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#7569FA",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  input: {
    color: "#665491",
    fontSize: 14,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    width: "100%",
    backgroundColor: "#7569FA",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
