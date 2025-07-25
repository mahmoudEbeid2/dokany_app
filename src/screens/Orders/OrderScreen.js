import React, { useState } from "react";
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles, pickerSelectStyles } from "../../components/Order/style";
import AllOrder from "../../components/Order/AllOrder";
import OrderByStatus from "../../components/Order/OrderByStatus";
import theme from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function OrdersScreen() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("all");

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.card }}>
        <View style={styles.headerBar}>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Orders</Text>
          <View style={styles.pikerContinuer}>
            <RNPickerSelect
              value={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
              placeholder={{ label: "Select order status", value: "" }}
              items={[
                { label: "All", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "Processing", value: "processing" },
                { label: "Shipped", value: "shipped" },
                { label: "Delivered", value: "delivered" },
                { label: "Cancelled", value: "cancelled" },
              ]}
              style={pickerSelectStyles}
            />
          </View>

          {selectedValue === "all" ? (
            <AllOrder />
          ) : (
            <OrderByStatus status={selectedValue} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
