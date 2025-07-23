import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { sellerAPI } from "../../utils/api/api";

const CustomerDetailsScreen = ({ route, navigation }) => {
  const { customer } = route.params;

  const handleDelete = () => {
    Alert.alert(
      "Delete Customer",
      "Are you sure you want to delete this customer?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await sellerAPI.delete(`/api/seller/customers/${customer.id}`);
              Alert.alert("Success", "Customer deleted successfully.");
              navigation.goBack();
            } catch (error) {
              console.error(
                "Failed to delete customer:",
                error.response?.data || error.message
              );
              Alert.alert(
                "Error",
                "Failed to delete customer. You may not have permission."
              );
            }
          },
        },
      ]
    );
  };

  if (!customer) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>Customer not found.</Text>
      </SafeAreaView>
    );
  }

  const imageSource = customer.profile_imge
    ? { uri: customer.profile_imge }
    : require("../../../assets/CustomerImage.png");

  return (
    <SafeAreaView style={styles.detailsContainer}>
      <ScrollView>
        <Image source={imageSource} style={styles.detailsAvatar} />
        <View style={styles.detailsContent}>
          <Text
            style={styles.detailsName}
          >{`${customer.f_name} ${customer.l_name}`}</Text>
          <Text style={styles.detailsEmail}>{customer.email}</Text>
          {/* <Text style={styles.detailsId}>Customer ID: {customer.id}</Text> */}
          <View style={styles.detailsInfoRow}>
            <View style={styles.detailsInfoBlock}>
              <Text style={styles.detailsInfoTitle}>Phone</Text>
              <Text style={styles.detailsInfoText}>{customer.phone}</Text>
            </View>
            <View style={styles.detailsInfoBlock}>
              <Text style={styles.detailsInfoTitle}>City</Text>
              <Text style={styles.detailsInfoText}>
                {customer.city || "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.detailsFooter}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditCustomer", { customer })}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A202C",
    textAlign: "center",
    marginTop: 40,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  detailsAvatar: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  detailsContent: {
    padding: 20,
  },
  detailsName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A202C",
  },
  detailsEmail: {
    fontSize: 16,
    color: "#718096",
    marginTop: 4,
  },
  detailsId: {
    fontSize: 14,
    color: "#A0AEC0",
    marginTop: 8,
    marginBottom: 20,
  },
  detailsInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F5",
  },
  detailsInfoBlock: {
    flex: 1,
  },
  detailsInfoTitle: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 4,
  },
  detailsInfoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A202C",
  },
  detailsFooter: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F5",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
  },
  editButtonText: {
    color: "#1A202C",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#E53E3E",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomerDetailsScreen;
