import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StatCard from './StatCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from "@env";
import { useIsFocused } from '@react-navigation/native';

export default function StatsOverview() {
  const isFocused = useIsFocused();
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });

  const fetchStats = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const finalToken = `Bearer ${storedToken}`;

      const res = await fetch(`${API}/api/seller/dashboard-stats`, {
        headers: { Authorization: finalToken },
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.log('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchStats();
    }
  }, [isFocused]);

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
    paddingVertical: 20,
    rowGap: 10,
    margin: 10,
    borderRadius: 30,
  },
});
