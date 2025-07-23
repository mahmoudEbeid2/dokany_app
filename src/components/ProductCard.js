import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress }) {
  const imageUri = product?.images?.[0]?.image;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product.id)}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    margin: 8,
    elevation: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor:"#fff",
    maxWidth:180,
     height: 220,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    padding:10
  },
});

