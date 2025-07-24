import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatsOverview from '../components/StatsOverview';
import LastOrders from '../components/LastOrders';

export default function HomeScreen({ navigation }) {
  const dummyData = [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F479E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyData}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Storefront</Text>
              <Ionicons
              style={styles.setting}
                name="settings-outline"
                size={24}
                onPress={() => navigation.navigate('Settings')}
              />
            </View>

            <Text style={styles.overview}>Overview</Text>
            <StatsOverview />
            <LastOrders />
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
  fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#333", 
    marginTop: 10, 
    paddingHorizontal:10
  },
  overview: {
    fontSize: 18, 
    fontWeight: "700", 
    color: "#333", 
        paddingHorizontal:10

  },
  setting:{
            paddingHorizontal:10

  }
});
