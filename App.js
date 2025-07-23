import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "./src/screens/Orders/OrderScreen";
import OrderDetails from "./src/screens/Orders/OrderDetails";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import ConfirmPasswordScreen from "./src/screens/ConfirmPasswordScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import PayoutsScreen from "./src/screens/PayoutsScreen";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import CouponScreen from "./src/screens/Coupon/CouponScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="AuthLoading">
    //     <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
    //     <Stack.Screen name="Register" component={RegisterScreen} />
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    //     <Stack.Screen name="ConfirmPassword" component={ConfirmPasswordScreen} />
    //     <Stack.Screen name="Settings" component={SettingsScreen} />
    //     <Stack.Screen name="Payouts" component={PayoutsScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="OrderScreen"
    //     screenOptions={{ headerShown: false }}
    //   >
    //     <Stack.Screen name="OrderScreen" component={OrderScreen} />
    //     <Stack.Screen name="OrderDetails" component={OrderDetails} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <CouponScreen />
  );
}
