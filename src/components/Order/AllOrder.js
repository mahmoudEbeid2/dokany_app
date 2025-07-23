import { useState, useEffect } from "react";
import OrderItem from "./OrderItem";
import { View, FlatList, ActivityIndicator } from "react-native";
import { loderStyles } from "./style";
import { API } from "@env";

export default function AllOrder() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGRmcDh5MDAwMDFzNnlwMWY0bW4xZWgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMTMyNTkyLCJleHAiOjE3NTM3MzczOTJ9.SY-EgjwraLb27FLWL50heKW-SqBcI8oOqx_muzO_Di4";
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/api/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("❌ Failed to fetch data");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("⚠️ Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <View>
        {loading ? (
          <View style={loderStyles.loader}>
            <ActivityIndicator size="large" color="#7569FA" />
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item, index) => item._id ?? index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <OrderItem order={item} />}
          />
        )}
      </View>
    </>
  );
}
