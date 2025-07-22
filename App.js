
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateProduct from './src/screens/createProduct/CreateProduct';
import EditProduct from './src/screens/editProduct/EditProduct';
import AddCategory from './src/screens/AddCategory/AddCategory';
import EditCategory from './src/screens/EditCategory/EditCategory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetails from './src/screens/ProductDetails/ProductDetails';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import ConfirmPasswordScreen from './src/screens/ConfirmPasswordScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PayoutsScreen from './src/screens/PayoutsScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';

const Stack = createNativeStackNavigator();


export default  function App () {
  //  AsyncStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGRmNTVxNzAwMDBzNnlweG5oaThtOGgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMTIxMjg1LCJleHAiOjE3NTM3MjYwODV9.EjqeiVhVpkBWo3kyJDO5ngPOHzWUAx3_kbis8kxoBxY")
  
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="ConfirmPassword" component={ConfirmPasswordScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Payouts" component={PayoutsScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

