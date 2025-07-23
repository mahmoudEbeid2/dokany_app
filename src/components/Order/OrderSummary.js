import { View, Text } from "react-native";
import SummaryItem from "./SummaryItem";

function OrderSummary({ orders }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 8,
          marginTop: 28,
          color: "#333",
        }}
      >
        Order Summary
      </Text>

      {orders.map((order) => (
        <SummaryItem key={order.id} order={order} />
      ))}
    </View>
  );
}

export default OrderSummary;
