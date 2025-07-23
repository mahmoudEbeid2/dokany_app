import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { API } from "@env";
const ProductDropdown = ({ id, value, onChange }) => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGRmcDh5MDAwMDFzNnlwMWY0bW4xZWgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMTMyNTkyLCJleHAiOjE3NTM3MzczOTJ9.SY-EgjwraLb27FLWL50heKW-SqBcI8oOqx_muzO_Di4";

  const fetchAllProducts = async () => {
    try {
      let page = 1;
      let allProducts = [];
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(`${API}/products/seller?page=${page}`, {
          headers: {
            Authorization: token,
          },
        });

        const data = await res.json();
        const pageProducts = Array.isArray(data) ? data : data.products;

        if (!pageProducts || pageProducts.length === 0) {
          hasMore = false;
        } else {
          allProducts = [...allProducts, ...pageProducts];
          page += 1;
        }
      }

      const dropdownItems = allProducts
        .filter((product) => product?.id && product?.title)
        .map((product) => ({
          label: product.title,
          value: product.id,
          key: product.id,
        }));

      setProducts(dropdownItems);

      if (id) {
        const found = dropdownItems.find((item) => item.value === id);
        if (found) {
          onChange(id);
        }
      }
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <View style={[styles.wrapper, open && { zIndex: 3000 }]}>
      {loading ? (
        <ActivityIndicator size="large" color="#6c63ff" />
      ) : (
        <DropDownPicker
          open={open}
          value={value}
          items={products}
          setOpen={setOpen}
          setValue={(callback) => onChange(callback(value))}
          setItems={setProducts}
          placeholder="Select Product"
          searchable
          listMode="SCROLLVIEW"
          searchPlaceholder="Search Here"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    zIndex: 1000,
    elevation: 10,
  },
  dropdown: {
    borderColor: "#7569FA",
    borderRadius: 20,
  },
  dropdownContainer: {
    borderColor: "#7569FA",
  },
});

export default ProductDropdown;
