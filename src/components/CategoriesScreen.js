import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const token =     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGRmcDh5MDAwMDFzNnlwMWY0bW4xZWgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMTMyNTkyLCJleHAiOjE3NTM3MzczOTJ9.SY-EgjwraLb27FLWL50heKW-SqBcI8oOqx_muzO_Di4';
;

export default function CategoriesScreen() {
      const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://dokany-api-production.up.railway.app/categories/seller',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <TouchableOpacity
  style={styles.fab}
onPress={() => navigation.navigate('CreateCategory')}
>
  <Ionicons name="add" size={28} color="#fff" />
</TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
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
  zIndex:10,
}

});
