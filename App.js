// App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import ConfirmPasswordScreen from "./src/screens/ConfirmPasswordScreen";
import SplashScreen from "./src/screens/SplashScreen";
import CreateProduct from "./src/screens/createProduct/CreateProduct";
import EditProduct from "./src/screens/editProduct/EditProduct";
import AddCategory from "./src/screens/AddCategory/AddCategory";
import EditCategory from "./src/screens/EditCategory/EditCategory";
import ProductDetails from "./src/screens/ProductDetails/ProductDetails";
import EditSellerProfile from "./src/screens/EditSellerProfile";
import PayoutsScreen from "./src/screens/PayoutsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import CustomersListScreen from "./src/screens/Customers/CustomersListScreen";

import BottomTabs from "./src/navigation/BottomTabs";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            {/* Main App Tabs */}
            <Stack.Screen name="MainTabs" component={BottomTabs} />
            {/* Nested Screens */}
            <Stack.Screen name="CreateProduct" component={CreateProduct} />
            <Stack.Screen name="EditProduct" component={EditProduct} />
            <Stack.Screen name="CreateCategory" component={AddCategory} />
            <Stack.Screen name="EditCategory" component={EditCategory} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen
              name="EditSellerProfile"
              component={EditSellerProfile}
            />
            <Stack.Screen name="Payouts" component={PayoutsScreen} />
            <Stack.Screen name="Customers" component={CustomersListScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
            <Stack.Screen
              name="ConfirmPassword"
              component={ConfirmPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//======================================================================================

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import CreateProduct from './src/screens/createProduct/CreateProduct';
// import EditProduct from './src/screens/editProduct/EditProduct';
// import AddCategory from './src/screens/AddCategory/AddCategory';
// import EditCategory from './src/screens/EditCategory/EditCategory';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ProductDetails from './src/screens/ProductDetails/ProductDetails';
// import SplashScreen from './src/screens/SplashScreen';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import RegisterScreen from './src/screens/RegisterScreen';
// import LoginScreen from './src/screens/LoginScreen';
// import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
// import ConfirmPasswordScreen from './src/screens/ConfirmPasswordScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import ProductsAndCategoriesScreen from './src/screens/ProductsAndCategoriesScreen';
// import SettingsScreen from './src/screens/SettingsScreen';
// import ProductsAndCategories from './src/screens/ProductsAndCategoriesScreen';
// import EditSellerProfile from './src/screens/EditSellerProfile';
// import PayoutsScreen from './src/screens/PayoutsScreen';
// import CouponsScreen from './src/screens//Coupon/CouponScreen';
// import OrderScreen from './src/screens/Orders/OrderScreen';
// import CustomersListScreen from './src/screens/Customers/CustomersListScreen';
// import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
// import { Ionicons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useState,useEffect } from 'react';
// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function BottomNavTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           switch (route.name) {
//             case 'Home': iconName = 'home'; break;
//             case 'Orders': iconName = 'list'; break;
//             case 'Products': iconName = 'cube'; break;
//             case 'Customers': iconName = 'people'; break;
//             case 'Coupons': iconName = 'pricetags-outline'; break;
//             default: iconName = 'ellipse';
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#4F479E',
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Orders" component={OrderScreen} />
//       <Tab.Screen name="Products" component={ProductsAndCategories} />
//       <Tab.Screen name="Customers" component={CustomersListScreen} />
//       <Tab.Screen name="Coupons" component={CouponsScreen} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = await AsyncStorage.getItem('token');
//       setIsAuthenticated(!!token);
//     };
//     checkToken();
//   }, []);

//   if (isAuthenticated === null) {
//     return <SplashScreen />;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isAuthenticated ? (
//           <>
//             {/* Tabs Screen */}
//             <Stack.Screen name="Home" component={BottomNavTabs} />

//             {/* Other Screens */}
//             <Stack.Screen name="CreateProduct" component={CreateProduct} />
//             <Stack.Screen name="EditProduct" component={EditProduct} />
//             <Stack.Screen name="CreateCategory" component={AddCategory} />
//             <Stack.Screen name="EditCategory" component={EditCategory} />
//             <Stack.Screen name="ProductDetails" component={ProductDetails} />
//             <Stack.Screen name="Settings" component={SettingsScreen} />
//             <Stack.Screen name="EditSellerProfile" component={EditSellerProfile} />
//             <Stack.Screen name="Payouts" component={PayoutsScreen} />
//           </>
//         ) : (
//           <>
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Register" component={RegisterScreen} />
//             <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
//             <Stack.Screen name="ConfirmPassword" component={ConfirmPasswordScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
