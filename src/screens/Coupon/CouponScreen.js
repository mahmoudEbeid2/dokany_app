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
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AddCoupon from "../../components/Coupon/AddCoupon";
import DisplayCoupons from "../../components/Coupon/DisplayCoupons";
import UpdateCoupon from "../../components/Coupon/UpdateCoupon";
import { API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
function CouponScreen() {
  const [coupon, setCoupon] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          const token = await AsyncStorage.getItem("token");
          setLoading(true);
          const response = await fetch(`${API}/api/coupon`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("❌ Failed to fetch data");
          }
          const data = await response.json();
          if (isActive) {
            setCoupon(data);
          }
        } catch (error) {
          console.error("⚠️ Error fetching data:", error);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      }

      fetchData();

      // cleanup function
      return () => {
        isActive = false;
      };
    }, [])
  );
  async function handleDeleteCoupon(id) {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API}/api/coupon/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Coupon deleted:", data);
        Alert.alert("Success", "Coupon deleted successfully!");
        setCoupon((prev) => prev.filter((coupon) => coupon.id !== id));
      } else {
        console.error("❌ Server error:", data);
        Alert.alert(
          "Error",
          data?.message || "Something went wrong while deleting the coupon."
        );
      }
    } catch (err) {
      console.error("❌ Error:", err);
      Alert.alert("Error", "Something went wrong while deleting the coupon.");
    }
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
        <ScrollView>
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
                <AddCoupon
                  onAddCoupon={handleAddCoupon}
                  onLoading={setLoading}
                />
              )}

              <DisplayCoupons
                coupon={coupon}
                onDeleteCoupon={handleDeleteCoupon}
                onSelectCoupon={setSelectedCoupon}
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default CouponScreen;
