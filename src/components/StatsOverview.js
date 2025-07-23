import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StatCard from './StatCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StatsOverview() {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });

const [token, setToken] = useState(null);

useEffect(() => {
  const loadTokenAndFetchStats = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    const finalToken = `Bearer ${storedToken}`;
    setToken(finalToken);

    try {
      const res = await fetch('https://dokany-api-production.up.railway.app/api/seller/dashboard-stats', {
        headers: { Authorization: finalToken },
      });
      const data = await res.json();
      console.log('Stats:', data);
      setStats(data);
    } catch (err) {
      console.log('Error fetching stats:', err);
    }
  };

  loadTokenAndFetchStats();
}, []);


  return (
    <View style={styles.container}>
      <StatCard title="Total Sales" value={`$${stats.totalEarnings}`} />
      <StatCard title="Orders" value={stats.totalOrders} />
      <StatCard title="Customers" value={stats.totalCustomers} />
      <StatCard title="Products" value={stats.totalProducts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical:20,
    rowGap: 10, 
    margin:10,
    backgroundColor: '#b7b3ddff',
    borderRadius:30

  },
});

