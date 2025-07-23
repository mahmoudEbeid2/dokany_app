import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import AddCoupon from "../../components/Coupon/AddCoupon";
import DisplayCoupons from "../../components/Coupon/DisplayCoupons";
import UpdateCoupon from "../../components/Coupon/UpdateCoupon";
import { API } from "@env";

function CouponScreen() {
  const [coupon, setCoupon] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGRmcDh5MDAwMDFzNnlwMWY0bW4xZWgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMTMyNTkyLCJleHAiOjE3NTM3MzczOTJ9.SY-EgjwraLb27FLWL50heKW-SqBcI8oOqx_muzO_Di4";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${API}/api/coupon`, {
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
        setCoupon(data);
      } catch (error) {
        console.error("⚠️ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleDeleteCoupon(id) {
    fetch(`${API}/api/coupon/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Coupon deleted:", data);
        Alert.alert("Success", "Coupon deleted successfully!");
        setCoupon((prev) => prev.filter((coupon) => coupon.id !== id));
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        Alert.alert("Error", "Something went wrong while deleting the coupon.");
      });
  }

  function handleAddCoupon(newCoupon) {
    setCoupon((prev) => [newCoupon, ...prev]);
  }

  function handeleUpdateCoupon(updatedCoupon) {
    const updatedCoupons = coupon.map((coupon) =>
      coupon.id === updatedCoupon.id ? updatedCoupon : coupon
    );
    setCoupon(updatedCoupons);
    setSelectedCoupon(null);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          Coupon
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#6c63ff" />
        ) : (
          <>
            {selectedCoupon ? (
              <UpdateCoupon
                coupon={selectedCoupon}
                onUpdateCoupon={handeleUpdateCoupon}
                onLoading={setLoading}
              />
            ) : (
              <AddCoupon onAddCoupon={handleAddCoupon} onLoading={setLoading} />
            )}

            <DisplayCoupons
              coupon={coupon}
              onDeleteCoupon={handleDeleteCoupon}
              onSelectCoupon={setSelectedCoupon}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
}

export default CouponScreen;
