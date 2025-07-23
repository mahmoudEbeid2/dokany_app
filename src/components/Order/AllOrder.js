import { useState, useEffect } from "react";
import OrderItem from "./OrderItem";
import { View, FlatList, ActivityIndicator } from "react-native";
import { loderStyles } from "./style";
import { API } from "@env";

export default function AllOrder() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

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
