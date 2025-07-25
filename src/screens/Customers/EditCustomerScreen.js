import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { sellerAPI } from "../../utils/api/api";
import {
  validateName,
  validateUsername,
  validatePassword,
} from "../../utils/validation";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import theme from '../../utils/theme';

const EditCustomerScreen = ({ route, navigation }) => {
  const { customer } = route.params;

  const [f_name, setFName] = useState(customer.f_name);
  const [l_name, setLName] = useState(customer.l_name);
  const [userName, setUserName] = useState(customer.user_name);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [city, setCity] = useState(customer.city);
  const [governorate, setGovernorate] = useState(customer.governorate);
  const [country, setCountry] = useState(customer.country);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSaveChanges = async () => {
    const nameError = validateName(f_name, "First Name");
    const lastNameError = validateName(l_name, "Last Name");
    const usernameError = validateUsername(userName);
    const passwordError = validatePassword(password, false);

    const newErrors = {
      f_name: nameError,
      l_name: lastNameError,
      userName: usernameError,
      password: passwordError,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== null)) {
      Alert.alert(
        "Validation Error",
        "Please fix the errors before submitting."
      );
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("f_name", f_name);
    formData.append("l_name", l_name);
    formData.append("user_name", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("governorate", governorate);
    formData.append("country", country);

    if (password) {
      formData.append("password", password);
    }

    if (image) {
      let filename = image.uri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append("profile_imge", { uri: image.uri, name: filename, type });
    }

    try {
      await sellerAPI.put(`/api/seller/customers/${customer.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Success", "Customer details updated!");
      navigation.navigate("CustomersList");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update customer."
      );
    } finally {
      setLoading(false);
    }
  };

  const imageSource = image
    ? { uri: image.uri }
    : customer.profile_imge
    ? { uri: customer.profile_imge }
    : require("../../../assets/CustomerImage.png");

  return (
    <SafeAreaView style={styles.formContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Customer</Text>

        <View style={{ width: 24 }} />
      </View>
      <ScrollView>
        <TouchableOpacity
          style={styles.editAvatarContainer}
          onPress={async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) setImage(result.assets[0]);
          }}
        >
          <Image source={imageSource} style={styles.editAvatar} />
          <Text style={styles.editAvatarSubtitle}>
            Tap to change profile photo
          </Text>
        </TouchableOpacity>

        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={f_name}
            onChangeText={setFName}
          />
          {errors.f_name && (
            <Text style={styles.errorText}>{errors.f_name}</Text>
          )}

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={l_name}
            onChangeText={setLName}
          />
          {errors.l_name && (
            <Text style={styles.errorText}>{errors.l_name}</Text>
          )}

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            autoCapitalize="none"
          />
          {errors.userName && (
            <Text style={styles.errorText}>{errors.userName}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            value={country}
            onChangeText={setCountry}
          />

          <Text style={styles.label}>Governorate</Text>
          <TextInput
            style={styles.input}
            value={governorate}
            onChangeText={setGovernorate}
          />

          <Text style={styles.label}>City</Text>
          <TextInput style={styles.input} value={city} onChangeText={setCity} />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Leave blank to keep current password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.formFooter}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSaveChanges}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Save changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10,
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
  form: {
    padding: 10,
  },
  label: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    marginBottom: 8,
    fontWeight: 'bold',
    fontFamily: theme.fonts.bold,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    padding: 15,
    fontSize: theme.fonts.size.md,
    marginBottom: 20,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.regular,
    ...theme.shadow,
  },
  formFooter: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    ...theme.shadow,
  },
  buttonText: {
    color: theme.colors.card,
    fontSize: theme.fonts.size.md,
    fontWeight: 'bold',
    fontFamily: theme.fonts.bold,
  },
  editAvatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  editAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: theme.colors.border,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  editAvatarSubtitle: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: -15,
    marginBottom: 10,
    fontSize: theme.fonts.size.xs,
  },
});

export default EditCustomerScreen;
