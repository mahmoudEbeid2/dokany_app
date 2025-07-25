import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { sellerAPI } from "../../utils/api/api";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from '../../utils/theme';

const CustomersListScreen = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchCustomers = async () => {
        try {
          setLoading(true);
          const response = await sellerAPI.get("/api/seller/customers");
          const fetchedCustomers = response.data || [];
          setCustomers(fetchedCustomers);
          // Set filtered customers here as well to reflect the latest fetch
          setFilteredCustomers(fetchedCustomers);
        } catch (error) {
          console.error("Failed to fetch customers:", error);
          Alert.alert("Error", "Failed to fetch customers from the server.");
        } finally {
          setLoading(false);
        }
      };

      fetchCustomers();
    }, [])
  );

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
      <View style={styles.headerContainer}>
        {/* لا تعرض زر العودة هنا */}
        <Text style={styles.title}>Customers</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={22} color={theme.colors.textSecondary} />
        <TextInput
          placeholder="Search customers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>
      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomerItem}
        keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: theme.colors.background,
    paddingInline: 50,
  },
  headerContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', paddingVertical: 12, marginBottom: 18, marginTop: 8, justifyContent: 'center' },
  title: { fontSize: theme.fonts.size.lg, color: theme.colors.text, fontWeight: 'bold', fontFamily: theme.fonts.bold, textAlign: 'center' },
  backButton: { padding: 4, marginRight: 8, position: 'absolute', left: 8, zIndex: 2, backgroundColor: theme.colors.card, borderRadius: 20, ...theme.shadow },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 14,
    ...theme.shadow,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.fonts.size.md,
    backgroundColor: 'transparent',
    marginLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  customerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: theme.fonts.size.md,
    fontWeight: 'bold',
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  customerRegistered: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow,
  },
});

export default CustomersListScreen;
