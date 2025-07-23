import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function OrderCard({ name, orderNumber, price, image }) {
  const fullName = name || 'Unknown Customer';
  const avatarSource = image ? { uri: image } : null;

  return (
    <View style={styles.card}>
      <View style={styles.avatarWrapper}>
        {avatarSource ? (
          <Image source={avatarSource} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar} />
        )}
      </View>
      <View style={styles.details}>
        <View style={styles.left}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.order}>Order #{orderNumber}</Text>
        </View>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    elevation: 1,
    alignItems: 'center',
  },
  avatarWrapper: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  placeholderAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ccc',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  order: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginRight:18
  },
});
