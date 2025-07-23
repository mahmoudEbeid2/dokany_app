import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setTimeout(() => {
        navigation.replace(token ? 'Home' : 'Login');
      }, 2000); 
    };

    checkAuth();
  }, []);

  return (
      <View style={styles.container}>
      <FontAwesome5 name="store" size={80} color="#fff" style={styles.icon} />
      <Text style={styles.title}>Dokany</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F479E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    position: 'absolute',
    bottom: 340,
    fontSize: 30,
  fontFamily: 'Lobster-Bold',
    color: '#fff',
    letterSpacing: 2,
    fontWeight:"bold"
  },
});