import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // ✅ استيراد أيقونة السهم
import { useNavigation } from '@react-navigation/native';
import ProductsScreen from '../components/ProductScreen';
import CategoriesScreen from '../components/CategoriesScreen';
import theme from '../utils/theme';

export default function ProductsAndCategoriesScreen() {
  const [activeTab, setActiveTab] = useState('products');
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        {/* لا تعرض زر العودة هنا */}
        <Text style={styles.headerTitle}>Products & Categories</Text>
      </View>

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

      <View style={styles.content}>
        {activeTab === 'products' ? <ProductsScreen /> : <CategoriesScreen />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.border,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fonts.size.md,
    fontWeight: 'bold',
    fontFamily: theme.fonts.bold,
  },
  activeText: {
    color: theme.colors.card,
    fontWeight: 'bold',
    fontFamily: theme.fonts.bold,
  },
  content: {
    flex: 1,
  },
  backButton: { padding: 4, marginRight: 8, position: 'absolute', left: 8, zIndex: 2, backgroundColor: theme.colors.card, borderRadius: 20, ...theme.shadow },
  headerBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', paddingVertical: 12, marginBottom: 18, marginTop: 8, justifyContent: 'center' },
  headerTitle: { fontSize: theme.fonts.size.lg, color: theme.colors.text, fontWeight: 'bold', fontFamily: theme.fonts.bold, textAlign: 'center' },
});
