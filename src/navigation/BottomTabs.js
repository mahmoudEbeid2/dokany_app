// src/navigation/BottomTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProductsAndCategories from '../screens/ProductsAndCategories';
import OrdersScreen from '../screens/OrdersScreen';
import CustomersScreen from '../screens/CustomersScreen';
import CouponsScreen from '../screens/CouponsScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home': iconName = 'home'; break;
            case 'Orders': iconName = 'list'; break;
            case 'Products': iconName = 'cube'; break;
            case 'Customers': iconName = 'people'; break;
            case 'Coupons': iconName = 'pricetags-outline'; break;
            default: iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4F479E',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Products" component={ProductsAndCategories} />
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Coupons" component={CouponsScreen} />
    </Tab.Navigator>
  );
}
