import { View, Text, ScrollView } from "react-native";
import CouponItem from "./CouponItem";

function DisplayCoupons({ coupon, onDeleteCoupon, onSelectCoupon }) {
  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Coupons
      </Text>

      {coupon.length === 0 ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: "#666" }}>
            No coupons available at the moment.
          </Text>
        </View>
      ) : (
        <View>
          {coupon.map((item) => (
            <CouponItem
              key={item.id}
              coupon={item}
              onDeleteCoupon={onDeleteCoupon}
              onSelectCoupon={onSelectCoupon}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default DisplayCoupons;
