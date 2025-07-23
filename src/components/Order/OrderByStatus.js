import { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { API } from "@env";
import { loderStyles } from "./style";
import OrderItem from "./OrderItem";

function OrderByStatus({ status }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

        const response = await fetch(`${API}/api/orders/${status}`, {
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
  }, [status]);
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
            ListEmptyComponent={
              !loading && (
                <View style={{ padding: 20, alignItems: "center" }}>
                  <Text style={{ color: "#999", fontSize: 16 }}>
                    No orders found
                  </Text>
                </View>
              )
            }
          />
        )}
      </View>
    </>
  );
}

export default OrderByStatus;
