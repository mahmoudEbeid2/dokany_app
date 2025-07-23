import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function CouponItem({ coupon, onDeleteCoupon, onSelectCoupon }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.code}>{coupon.code}</Text>
        <Text style={styles.date}>
          Expires on{" "}
          {new Date(coupon.expiration_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => onSelectCoupon({ ...coupon })}>
          <MaterialIcons name="edit" size={28} color="#7569FA" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeleteCoupon(coupon.id)}>
          <MaterialIcons name="delete-forever" size={28} color="tomato" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  code: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 1,
  },
  date: {
    fontSize: 14,
    color: "#6E6387",
  },
});

export default CouponItem;
