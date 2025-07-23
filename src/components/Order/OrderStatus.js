import { View, Text, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { statusStyle as styles } from "./OrderDetailsStyle";
import { API } from "@env";

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

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGRmcDh5MDAwMDFzNnlwMWY0bW4xZWgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMTMyNTkyLCJleHAiOjE3NTM3MzczOTJ9.SY-EgjwraLb27FLWL50heKW-SqBcI8oOqx_muzO_Di4";

  function handleUpdate() {
    fetch(`${API}/api/orders/${order_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status: value }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update status");
        }
        return res.json();
      })
      .then(() => {
        alert("Order status updated successfully ✅");
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong ❌");
      });
  }

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#6130D4",
    marginTop: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  };

  const buttonTextStyle = {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
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
