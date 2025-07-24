import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity,
  StyleSheet, ScrollView, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from "@env";
import { AntDesign } from '@expo/vector-icons';

export default function EditSellerProfile() {
  const [token, setToken] = useState(null);
  const [themes, setThemes] = useState([]);

  const [form, setForm] = useState({
    id: '',
    user_name: '',
    f_name: '',
    l_name: '',
    email: '',
    phone: '',
    city: '',
    governorate: '',
    country: '',
    subdomain: '',
    payout_method: '',
    password: '',
    role: '',
    theme_id: '',
    profile_imge: '',
    logo: '',
    image_public_id: '',
    logo_public_id: '',
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const authHeader = `Bearer ${storedToken}`;
        setToken(authHeader);

        const sellerRes = await fetch(`${API}/api/seller/id`, {
          headers: { Authorization: authHeader },
        });

        const sellerData = await sellerRes.json();
        setForm({ ...sellerData, password: '' });
        setProfilePreview(sellerData.profile_imge);
        setLogoPreview(sellerData.logo);

        const themeRes = await fetch(`${API}/themes`);
        const themeData = await themeRes.json();
        setThemes(themeData);

      } catch (err) {
        console.log("Error loading data:", err.message);
        Alert.alert("Error", "Failed to load profile data.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const pickImage = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (type === "profile") {
        setProfilePreview(uri);
      } else if (type === "logo") {
        setLogoPreview(uri);
      }
    }
  };
const validateForm = () => {
  const requiredFields = ['user_name', 'f_name', 'email', 'phone', 'city', 'country'];
  for (let field of requiredFields) {
    if (!form[field]) {
      Alert.alert("Missing Field", `Please enter ${field.replace(/_/g, " ")}`);
      return false;
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    Alert.alert("Invalid Email", "Please enter a valid email address.");
    return false;
  }

  if (form.password && form.password.length < 6) {
    Alert.alert("Weak Password", "Password should be at least 6 characters.");
    return false;
  }

  return true;
};

  const handleSubmit = async () => {
      if (!validateForm()) return;

    try {
      const formData = new FormData();

      for (let key of [
        'user_name', 'f_name', 'l_name', 'email', 'phone',
        'city', 'governorate', 'country', 'subdomain',
        'payout_method', 'role', 'theme_id', 'image_public_id', 'logo_public_id'
      ]) {
        if (form[key]) formData.append(key, form[key]);
      }

      if (form.password) formData.append('password', form.password);

      if (profilePreview && !profilePreview.startsWith('http')) {
        formData.append("profile_imge", {
          uri: profilePreview,
          type: "image/jpeg",
          name: "profile.jpg",
        });
      }

      if (logoPreview && !logoPreview.startsWith('http')) {
        formData.append("logo", {
          uri: logoPreview,
          type: "image/jpeg",
          name: "logo.jpg",
        });
      }

      const res = await fetch('https://dokany-api-production.up.railway.app/api/seller/update', {
        method: 'PUT',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const rawText = await res.text();
      const data = JSON.parse(rawText);

      if (res.ok) {
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", data.message || "Update failed");
      }
    } catch (err) {
      console.log("Submit error:", err.message);
      Alert.alert("Error", "An error occurred during the update");
    }
  };

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
  onPress={() => navigation.goBack()}
  style={styles.backButton}
>
  <AntDesign name="arrowleft" size={24} color="black" />
</TouchableOpacity>

      <Text style={styles.header}>Edit Your Profile</Text>

      <View style={styles.imageRow}>
        <TouchableOpacity onPress={() => pickImage("profile")} style={styles.imageContainer}>
          <Image
            source={profilePreview ? { uri: profilePreview } : require('../../assets/avtar.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.imageText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => pickImage("logo")} style={styles.imageContainer}>
          <Image
            source={logoPreview ? { uri: logoPreview } : require('../../assets/icon.png')}
            style={styles.logoImage}
          />
          <Text style={styles.imageText}>Logo</Text>
        </TouchableOpacity>
      </View>

      {[
        "user_name", "f_name", "l_name", "email", "phone",
        "city", "governorate", "country", "subdomain","payout_method"
      ].map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.replace(/_/g, " ").toUpperCase()}
          value={form[key]}
          onChangeText={(text) => handleChange(key, text)}
        />
      ))}


      <Text style={styles.label}>Select Theme</Text>
      <View style={styles.themeList}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.id}
            style={[
              styles.themeCard,
              form.theme_id === theme.id && styles.selectedThemeCard
            ]}
            onPress={() => handleChange("theme_id", theme.id)}
          >
            <Image source={{ uri: theme.preview_image }} style={styles.themeImage} />
            <Text style={styles.themeName}>{theme.name}</Text>
            {form.theme_id === theme.id && (
              <Text style={styles.selectedText}>Selected</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', marginTop: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },

  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 100, height: 100, borderRadius: 50, marginBottom: 6,
  },
  logoImage: {
    width: 100, height: 100, borderRadius: 10, marginBottom: 6,
  },
  imageText: { fontSize: 12, color: '#666', textAlign: 'center' },

  input: {
    width: '90%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
  },

  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },

  payoutMethods: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  payoutOption: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  payoutSelected: {
    backgroundColor: '#e1d5ff',
    borderColor: '#6a0dad',
  },
  payoutText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },

  themeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },

  themeCard: {
    width: 130,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedThemeCard: {
    borderColor: '#6a0dad',
    borderWidth: 2,
    backgroundColor: '#f4e8ff',
  },
  themeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 6,
  },
  themeName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  selectedText: {
    marginTop: 4,
    fontSize: 12,
    color: '#6a0dad',
    fontWeight: 'bold',
  },

  saveButton: {
    backgroundColor: '#6a0dad',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 30,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },backButton: {
  position: "absolute",
  top: 10,
  left: 15,
  zIndex: 10,
  padding: 8,
  borderRadius: 50,
  alignItems: "center",
  justifyContent: "center",  
},

});
