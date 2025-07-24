import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import OrderCard from './OrderCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { API } from "@env";

export default function LastOrders() {
  const [orders, setOrders] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('token');
          const res = await fetch(`${API}/api/orders`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          const data = await res.json();
          setOrders(data.slice(0, 5));
        } catch (err) {
          console.log('Fetch Orders Error:', err);
        }
      };

      fetchOrders();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Last Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <OrderCard
            name={`${item.customer.f_name} ${item.customer.l_name}`}
            orderNumber={item.id}
            price={item.total_price}
            image={
              item.customer.profile_image
                ? item.customer.profile_image
                : require('../../assets/avtar.jpg')
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,

  },
  heading: {
   fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 16, 
    color: "#333", 
  },
});
