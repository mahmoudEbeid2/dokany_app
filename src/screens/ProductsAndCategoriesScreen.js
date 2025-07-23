import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProductsScreen from '../components/ProductScreen';
import CategoriesScreen from '../components/CategoriesScreen';

export default function ProductsAndCategoriesScreen() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <View style={styles.container}>
      {/* 🔘 Switch Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('products')}
          style={[styles.tabButton, activeTab === 'products' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'products' && styles.activeText]}>
            Products
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('categories')}
          style={[styles.tabButton, activeTab === 'categories' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'categories' && styles.activeText]}>
            Categories
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔄 Active Screen */}
      <View style={styles.content}>
        {activeTab === 'products' ? <ProductsScreen /> : <CategoriesScreen />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#eee',
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
});
