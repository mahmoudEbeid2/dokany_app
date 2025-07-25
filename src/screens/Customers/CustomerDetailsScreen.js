import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { sellerAPI } from "../../utils/api/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import theme from '../../utils/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

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
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[theme.colors.background, '#e8eaf6']} style={styles.gradientBg}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Customer Details</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
          <View style={styles.avatarWrapper}>
            <Image source={imageSource} style={styles.detailsAvatar} />
          </View>
          <Text style={styles.detailsName}>{`${customer.f_name} ${customer.l_name}`}</Text>
          <Text style={styles.detailsEmail}>{customer.email}</Text>
          <View style={{ height: 12 }} />
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <AntDesign name="phone" size={24} color={theme.colors.primary} />
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{customer.phone}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <AntDesign name="enviromento" size={24} color={theme.colors.primary} />
              <Text style={styles.infoLabel}>City</Text>
              <Text style={styles.infoValue}>{customer.city || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <AntDesign name="flag" size={24} color={theme.colors.primary} />
              <Text style={styles.infoLabel}>Governorate</Text>
              <Text style={styles.infoValue}>{customer.governorate || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <AntDesign name="earth" size={24} color={theme.colors.primary} />
              <Text style={styles.infoLabel}>Country</Text>
              <Text style={styles.infoValue}>{customer.country || 'N/A'}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.detailsFooter}>
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("EditCustomer", { customer })}
          >
            <MaterialIcons name="edit" size={22} color={theme.colors.card} style={{ marginRight: 6 }} />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.7}
            onPress={handleDelete}
          >
            <MaterialIcons name="delete" size={22} color={'#FFF'} style={{ marginRight: 6 }} />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: theme.fonts.size.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  headerTitle: {
    fontSize: theme.fonts.size.xxl,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: 40,
    fontFamily: theme.fonts.bold,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 0,
  },
  avatarWrapper: { marginTop: 24, marginBottom: 12, alignItems: 'center', justifyContent: 'center', ...theme.shadow },
  detailsAvatar: {
    alignSelf: 'center',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.card,
    ...theme.shadow,
  },
  detailsContent: {
    padding: 10,
    alignItems: 'center',
  },
  detailsName: { fontSize: theme.fonts.size.xxl, fontWeight: 'bold', color: theme.colors.text, marginBottom: 2, marginTop: 10, fontFamily: theme.fonts.bold, textAlign: 'center', letterSpacing: 0.5 },
  detailsEmail: { fontSize: theme.fonts.size.md, color: theme.colors.textSecondary, marginTop: 2, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  infoCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.md, paddingVertical: 14, paddingHorizontal: 16, marginVertical: 8, width: '92%', alignSelf: 'center', borderWidth: 1, borderColor: theme.colors.border, ...theme.shadow },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  infoLabel: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
    fontFamily: theme.fonts.bold,
    flex: 1,
    marginLeft: 6,
  },
  infoValue: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontFamily: theme.fonts.bold,
    alignSelf: 'flex-end',
    marginLeft: 12,
  },
  detailsFooter: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: theme.colors.border, backgroundColor: theme.colors.background, paddingVertical: 14, paddingHorizontal: 10, position: 'absolute', bottom: 0, left: 0, right: 0, ...theme.shadow, zIndex: 10 },
  editButton: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: 30, paddingVertical: 14, marginHorizontal: 8, ...theme.shadow },
  editButtonText: {
    color: theme.colors.card,
    fontSize: theme.fonts.size.md,
    fontWeight: 'bold',
    fontFamily: theme.fonts.bold,
  },
  deleteButton: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.error, borderRadius: 30, paddingVertical: 14, marginHorizontal: 8, ...theme.shadow },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: { height: 1, backgroundColor: theme.colors.border, width: '80%', alignSelf: 'center', marginVertical: 2 },
  gradientBg: { flex: 1 },
});

export default CustomerDetailsScreen;
