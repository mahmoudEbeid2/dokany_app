import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatsOverview from '../components/StatsOverview';
import LastOrders from '../components/LastOrders';
import BottomNav from '../components/BottomNav';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Storefront</Text>
          <Ionicons name="settings-outline" size={24} onPress={() => navigation.navigate('Settings')} />
        </View>

        <Text style={styles.overview}>Overview</Text>
        <StatsOverview />
        <LastOrders />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContent: {
    paddingBottom: 80, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  overview: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
});
