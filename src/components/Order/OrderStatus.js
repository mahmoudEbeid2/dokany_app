import { View, Text, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { statusStyle as styles } from "./OrderDetailsStyle";
import { API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

function OrderStatus({ status, order_id }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(status);
  const [items, setItems] = useState([
    { label: "Pending", value: "pending", key: "pending" },
    { label: "Processing", value: "processing", key: "processing" },
    { label: "Shipped", value: "shipped", key: "shipped" },
    { label: "Delivered", value: "delivered", key: "delivered" },
    { label: "Cancelled", value: "cancelled", key: "cancelled" },
  ]);

  async function handleUpdate() {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${API}/api/orders/${order_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ status: value }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      await res.json();
      alert("Order status updated successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  }
  const buttonStyle = {
    width: "100%",
    backgroundColor: "#7569FA",
    marginTop: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  };

  const buttonTextStyle = {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Status</Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select order status"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        listMode="SCROLLVIEW"
      />

      <TouchableOpacity onPress={handleUpdate} style={buttonStyle}>
        <Text style={buttonTextStyle}>Update Status</Text>
      </TouchableOpacity>
    </View>
  );
}

export default OrderStatus;
