import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CreateProduct from "./src/screens/createProduct/CreateProduct";
import EditProduct from "./src/screens/editProduct/EditProduct";
import AddCategory from "./src/screens/AddCategory/AddCategory";
import EditCategory from "./src/screens/EditCategory/EditCategory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductDetails from "./src/screens/ProductDetails/ProductDetails";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import ConfirmPasswordScreen from "./src/screens/ConfirmPasswordScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import PayoutsScreen from "./src/screens/PayoutsScreen";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
// cutomer screens
import CustomersListScreen from "./src/screens/Customers/CustomersListScreen";
import AddCustomerScreen from "./src/screens/Customers/AddCustomerScreen";
import CustomerDetailsScreen from "./src/screens/Customers/CustomerDetailsScreen";
import EditCustomerScreen from "./src/screens/Customers/EditCustomerScreen";
const Stack = createNativeStackNavigator();


export default  function App () {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen
          name="ConfirmPassword"
          component={ConfirmPasswordScreen}
        />
        {/* customer */}
        <Stack.Screen name="CustomersList" component={CustomersListScreen} />
        <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
        <Stack.Screen
          name="CustomerDetails"
          component={CustomerDetailsScreen}
        />
        <Stack.Screen name="EditCustomer" component={EditCustomerScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
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
