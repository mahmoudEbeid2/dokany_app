import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductScreen() {
  const navigation = useNavigation();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [token, setToken] = useState(null);

  const [pageSize] = useState(10);
  const API = Constants.expoConfig?.extra?.API || 'https://dokany-api-production.up.railway.app/api';

  useEffect(() => {
    const loadTokenAndFetch = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        fetchAllProducts(storedToken);
      } else {
        setLoading(false);
        console.error(' Token not found in AsyncStorage');
      }
    };

    loadTokenAndFetch();
  }, []);

  const fetchAllProducts = async (authToken) => {
    try {
      let all = [];
      let currentPage = 1;
      let keepFetching = true;

      while (keepFetching) {
        const res = await axios.get(
          `${API}/products/seller?page=${currentPage}&limit=10`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        const newProducts = res.data;

        if (newProducts.length > 0) {
          all = [...all, ...newProducts];
          currentPage++;
        }

        if (newProducts.length < 10) {
          keepFetching = false;
        }
      }

      setAllProducts(all);
      setFilteredProducts(all);
    } catch (err) {
      console.error('Error fetching products:', err.message);
    }
    setLoading(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
    setPage(1);
  };

  const goToDetails = (productId) => {
    navigation.navigate('ProductDetails', { id: productId });
  };

  const paginatedData = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateProduct')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <TextInput
        placeholder="Search products..."
        value={searchText}
        onChangeText={handleSearch}
        style={styles.search}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
      ) : (
        <>
          <FlatList
            data={paginatedData}
            keyExtractor={(item, index) => item.id + '_' + index}
            numColumns={2}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <ProductCard product={item} onPress={goToDetails} />
            )}
          />

          <View style={styles.paginationContainer}>
            <TouchableOpacity
              onPress={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
              style={page === 1 ? styles.disabled : {}}
            >
              <Ionicons name="chevron-back" size={28} />
            </TouchableOpacity>

            <Text style={styles.pageText}>
              Page {page} of {totalPages}
            </Text>

            <TouchableOpacity
              onPress={() => page < totalPages && setPage(page + 1)}
              disabled={page === totalPages}
              style={page === totalPages ? styles.disabled : {}}
            >
              <Ionicons name="chevron-forward" size={28} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  search: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  disabled: {
    opacity: 0.4,
  },
  pageText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: '#4F479E',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 10,
  },
});
