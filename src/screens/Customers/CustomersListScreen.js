import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { sellerAPI } from "../../utils/api/api";

const CustomersListScreen = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await sellerAPI.get("/api/seller/customers");
      const fetchedCustomers = response.data || [];
      setCustomers(fetchedCustomers);
      setFilteredCustomers(fetchedCustomers);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      Alert.alert("Error", "Failed to fetch customers from the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchCustomers);
    return unsubscribe;
  }, [navigation, fetchCustomers]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((customer) =>
        `${customer.f_name} ${customer.l_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, customers]);

  const renderCustomerItem = ({ item }) => {
    const imageSource = item.profile_imge
      ? { uri: item.profile_imge }
      : require("../../../assets/CustomerImage.png");

    return (
      <TouchableOpacity
        style={styles.customerItem}
        onPress={() =>
          navigation.navigate("CustomerDetails", { customer: item })
        }
      >
        <Image source={imageSource} style={styles.avatar} />
        <View style={styles.customerInfo}>
          <Text
            style={styles.customerName}
          >{`${item.f_name} ${item.l_name}`}</Text>
          <Text style={styles.customerRegistered}>@{item.user_name}</Text>
        </View>
        <Feather name="chevron-right" size={24} color="#C0C0C0" />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddCustomer")}
      >
        <Feather name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  customerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A202C",
  },
  customerRegistered: {
    fontSize: 14,
    color: "#718096",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#6200EE",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CustomersListScreen;
