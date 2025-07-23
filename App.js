

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateProduct from './src/screens/createProduct/CreateProduct';
import EditProduct from './src/screens/editProduct/EditProduct';
import AddCategory from './src/screens/AddCategory/AddCategory';
import EditCategory from './src/screens/EditCategory/EditCategory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetails from './src/screens/ProductDetails/ProductDetails';
import SplashScreen from './src/screens/SplashScreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import ConfirmPasswordScreen from './src/screens/ConfirmPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductsAndCategoriesScreen from './src/screens/ProductsAndCategoriesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import EditSellerProfile from './src/screens/EditSellerProfile';
import PayoutsScreen from './src/screens/PayoutsScreen';
import CustomersListScreen from './src/screens/Customers/CustomersListScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';


const Stack = createNativeStackNavigator();


export default  function App () {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
   <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="ConfirmPassword" component={ConfirmPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Customers" component={CustomersListScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Products" component={ProductsAndCategoriesScreen} />
        <Stack.Screen name="EditSellerProfile" component={EditSellerProfile} />
        <Stack.Screen name="Payouts" component={PayoutsScreen} />
        {/* products */}
        <Stack.Screen name="CreateProduct" component={CreateProduct} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
        <Stack.Screen name="CreateCategory" component={AddCategory} />
        <Stack.Screen name="EditCategory" component={EditCategory} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
