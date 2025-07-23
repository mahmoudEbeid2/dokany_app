import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatCard({ title, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '46%', 
    marginBottom: 10, 
  },
  title: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
