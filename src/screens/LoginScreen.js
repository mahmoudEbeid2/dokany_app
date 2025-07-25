import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "../utils/api/api";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import theme from '../utils/theme';




export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await authAPI.post("seller/login", { email, password });

      await AsyncStorage.setItem("token", res.data.token);

      alert("Login successful");
      setErrors({});
      navigation.navigate("Settings");
    } catch (err) {
      console.error(err);
      console.error("Login error:", err.message, err.stack);
      setErrors({
        general: err?.response?.data?.error || "Login failed",
      });
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <ScrollView contentContainerStyle={styles.container} >
            <View style={styles.logoCircleModern}>
              <AntDesign name="user" size={48} color={theme.colors.primary} />
            </View>
            <View style={styles.loginCardModern}>
              <Text style={styles.title}>Login</Text>
              <View>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.icon}><Ionicons name="person" size={20} /></View>
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setErrors((prev) => ({ ...prev, email: null }));
                    }}
                    style={[styles.input, errors.email && styles.inputError]}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor={theme.colors.textSecondary}

                  />
                </View>
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}
              </View>
              <View >
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.icon}> <Ionicons name="lock-closed" size={20} /></View>
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setErrors((prev) => ({ ...prev, password: null }));
                    }}
                    style={[styles.input, errors.password && styles.inputError]}
                    secureTextEntry
                    placeholderTextColor={theme.colors.textSecondary}

                  />
                </View>
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}
              </View>

              {errors.general && <Text style={styles.error}>{errors.general}</Text>}

              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}>
                  Don't have an account?{' '}
                  <Text style={styles.linkBold}>Register</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navigationTitle: {
    fontSize: theme.fonts.size.xl,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
    marginTop: 10,
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.bold,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fonts.size.lg,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 10,
    textAlign: 'center',
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  inputContainer: { width: '100%', flexDirection: 'row', alignItems: 'center', borderColor: 'transparent', borderWidth: 0, borderRadius: theme.radius.lg, paddingHorizontal: 12, marginBottom: 14, paddingVertical: 8, backgroundColor: theme.colors.card, ...theme.shadow },
  inputLabel: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: theme.fonts.bold,
  },
  input: { flex: 1, color: theme.colors.textSecondary, fontSize: theme.fonts.size.sm, fontFamily: theme.fonts.regular, backgroundColor: 'transparent' },
  icon: {
    marginRight: 5,
    width: 20,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    color: theme.colors.error,
    marginBottom: 8,
    fontSize: theme.fonts.size.xs,
    width: '100%',
    textAlign: 'start',
    paddingHorizontal: 10,
  },
  button: { width: '100%', backgroundColor: theme.colors.primary, padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 18, ...theme.strongShadow },
  buttonText: { color: theme.colors.card, fontSize: theme.fonts.size.md, fontWeight: 'bold', fontFamily: theme.fonts.bold },
  link: {
    color: theme.colors.primary,
    fontSize: theme.fonts.size.sm,
    marginTop: 18,
  },
  linkBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  logoCircleModern: { backgroundColor: theme.colors.card, borderRadius: 48, width: 96, height: 96, alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.18, shadowRadius: 18, elevation: 10, alignSelf: 'center' },
  loginCardModern: { backgroundColor: theme.colors.card, borderRadius: 32, padding: 28, marginBottom: 32, width: '100%', ...theme.strongShadow, alignItems: 'center' },
});
