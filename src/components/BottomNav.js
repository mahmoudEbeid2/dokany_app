import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav({ navigation }) {
  return (
    <View style={styles.container}>
      <NavItem icon="home" label="Home" onPress={() => navigation.navigate('Home')} />
      <NavItem icon="list" label="Orders" onPress={() => navigation.navigate('Orders')} />
      <NavItem icon="cube" label="Products" onPress={() => navigation.navigate('Products')} />
      <NavItem icon="people" label="Customers" onPress={() => navigation.navigate('Customers')} />
      <NavItem icon="pricetags-outline" label="Coupons" onPress={() => navigation.navigate('Coupons')} />
    </View>
  );
}

function NavItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#4F479E" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 4,
  },
});
