import CustomerInfo from "../../components/Order/CustomerInfo";
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../components/Order/OrderDetailsStyle";
import OrderSummary from "../../components/Order/OrderSummary";
import OrderStatus from "../../components/Order/OrderStatus";
import { useRoute, useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function OrderDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text
              style={[
                styles.title,
                { flex: 1, textAlign: "center", marginRight: 24 },
              ]}
            >
              Order Details
            </Text>
          </View>

          <CustomerInfo customer={order.customer} />
          <OrderSummary orders={order.items} />
          <OrderStatus status={order.order_status} order_id={order.id} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
