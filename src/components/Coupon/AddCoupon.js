import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import ProductDropdown from "./ProductDropdown";
import { API } from "@env";

function AddCoupon({ onAddCoupon, onLoading }) {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [daysToExpire, setDaysToExpire] = useState("");
  const [product, setProduct] = useState("");

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGRmcDh5MDAwMDFzNnlwMWY0bW4xZWgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMTMyNTkyLCJleHAiOjE3NTM3MzczOTJ9.SY-EgjwraLb27FLWL50heKW-SqBcI8oOqx_muzO_Di4";
  function handleAddCoupon() {
    const today = new Date();
    const expireDate = new Date();
    expireDate.setDate(today.getDate() + parseInt(daysToExpire));

    fetch(`${API}/api/coupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        code,
        discount_value: parseFloat(discount),
        expiration_date: expireDate.toISOString(),
        product_id: product,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Success", "✅ Coupon added successfully! ");
        onAddCoupon(data);
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        Alert.alert("Error", "Something went wrong while adding the coupon.");
      });

    setCode("");
    setDiscount("");
    setDaysToExpire("");
    setProduct(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a coupon</Text>

      <TextInput
        style={styles.input}
        placeholder="Coupon Code"
        value={code}
        onChangeText={(text) => setCode(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Discount Percentage"
        value={discount}
        keyboardType="numeric"
        onChangeText={(text) => setDiscount(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Valid for (days)"
        value={daysToExpire}
        keyboardType="numeric"
        onChangeText={(text) => setDaysToExpire(text)}
      />

      <ProductDropdown
        value={product}
        onChange={setProduct}
        onLoading={onLoading}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddCoupon}>
        <Text style={styles.buttonText}>Add Coupon</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#120F1A",
  },
  input: {
    borderWidth: 1,
    borderColor: "#7569FA",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#7569FA",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddCoupon;
