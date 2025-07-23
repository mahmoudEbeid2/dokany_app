import { API } from "@env";
import { View, Text, ScrollView } from "react-native";
import CouponItem from "./CouponItem";

function DisplayCoupons({ coupon, onDeleteCoupon, onSelectCoupon }) {
  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Coupons
      </Text>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {coupon.map((item) => (
          <CouponItem
            key={item.id}
            coupon={item}
            onDeleteCoupon={onDeleteCoupon}
            onSelectCoupon={onSelectCoupon}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default DisplayCoupons;
