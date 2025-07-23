import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { authAPI } from '../utils/api/api';
import ThemeSelector from '../components/ThemeSelector';

const fields = [
  { name: 'user_name', label: 'Username', icon: <FontAwesome name="user" size={20} /> },
  { name: 'f_name', label: 'First Name', icon: <Ionicons name="person" size={20} /> },
  { name: 'l_name', label: 'Last Name', icon: <Ionicons name="person-outline" size={20} /> },
  { name: 'email', label: 'Email', icon: <MaterialIcons name="email" size={20} /> },
  { name: 'phone', label: 'Phone', icon: <FontAwesome name="phone" size={20} /> },
  { name: 'city', label: 'City', icon: <FontAwesome name="building" size={20} /> },
  { name: 'governorate', label: 'Governorate', icon: <FontAwesome name="map-marker" size={20} /> },
  { name: 'country', label: 'Country', icon: <FontAwesome name="globe" size={20} /> },
  { name: 'subdomain', label: 'Subdomain', icon: <FontAwesome name="link" size={20} /> },
  { name: 'payout_method', label: 'Payout Account', icon: <FontAwesome name="credit-card" size={20} /> },
  { name: 'password', label: 'Password', icon: <Ionicons name="lock-closed" size={20} />, isPassword: true },
  { name: 'confirm_password', label: 'Confirm Password', icon: <Ionicons name="lock-closed-outline" size={20} />, isPassword: true },
];

export default function RegisterScreen({ navigation }) {

  const [form, setForm] = useState(Object.fromEntries(fields.map(f => [f.name, ''])));
  const [errors, setErrors] = useState({});
  const [logo, setLogo] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleChange = (field, value) => {
    const trimmedValue = value.trimStart();

    setForm(prev => ({ ...prev, [field]: trimmedValue }));

    const newError = validateSingleField(field, trimmedValue);
    setErrors(prev => ({ ...prev, [field]: newError || '' }));
  };

  const validateSingleField = (field, value) => {
    switch (field) {
      case 'user_name':
        if (!value) return "Username must be at least 3 characters long";
        if (!/^[a-zA-Z0-9_.-]+$/.test(value)) return "Username can only contain English letters, numbers, underscores, periods, or hyphens";
        if (value.length < 3 || value.length > 30) return "Username must be between 3 and 30 characters";
        break;

      case 'f_name':
      case 'l_name':
        if (!value) return `${field === 'f_name' ? 'First' : 'Last'} name is required and must be at least 2 characters`;
        if (!/^[a-zA-Z\u0600-\u06FF\s.'-]+$/.test(value)) return `${field === 'f_name' ? 'First' : 'Last'} name must contain letters only`;
        if (value.length < 2 || value.length > 50) return `${field === 'f_name' ? 'First' : 'Last'} name must be between 2 and 50 characters`;
        break;

      case 'email':
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format. Please enter a valid email address.";
        const domain = value.split('@')[1];
        const allowed = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com', 'protonmail.com'];
        if (!allowed.includes(domain)) return "Email must be from a recognized provider (e.g., Gmail, Outlook, Yahoo).";
        break;

      case 'phone':
        if (!value) return "Phone number is too short (at least 8 digits)";
        if (!/^[0-9+()\-\s]*$/.test(value)) return "Phone number can only contain digits or international characters (+, -, parenthesis)";
        if (value.length < 8 || value.length > 15) return "Phone number must be between 8 and 15 digits";
        break;

      case 'city':
      case 'governorate':
      case 'country':
        if (!value) return `${field[0].toUpperCase() + field.slice(1)} name is required and must be at least 2 characters`;
        if (!/^[a-zA-Z\u0600-\u06FF\s.'-]+$/.test(value)) return `${field[0].toUpperCase() + field.slice(1)} name must contain letters only`;
        if (value.length < 2 || value.length > 100) return `${field[0].toUpperCase() + field.slice(1)} name must be between 2 and 100 characters`;
        break;

      case 'password':
        if (!value) return "Password must be at least 8 characters long";
        if (value.length < 8 || value.length > 50) return "Password must be between 8 and 50 characters";
        if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
        if (!/[0-9]/.test(value)) return "Password must contain at least one digit";
        if (!/[^a-zA-Z0-9]/.test(value)) return "Password must contain at least one special character (e.g., !@#$%^&*)";
        break;

      case 'confirm_password':
        if (!value || value !== form.password) return "Passwords do not match";
        break;

      case 'subdomain':
        if (value && !/^[a-z0-9-]+$/.test(value)) return "Subdomain can only contain lowercase letters, numbers, and hyphens";
        if (value && (value.length < 3 || value.length > 50)) return "Subdomain must be between 3 and 50 characters long";
        break;

      case 'payout_method':
        if (!value) return "Payout Account is required";
        break;

      default:
        return '';
    }
    return '';
  };


  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: false,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.user_name) {
      newErrors.user_name = "Username must be at least 3 characters long";
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(form.user_name)) {
      newErrors.user_name = "Username can only contain English letters, numbers, underscores, periods, or hyphens";
    } else if (form.user_name.length < 3 || form.user_name.length > 30) {
      newErrors.user_name = "Username must be between 3 and 30 characters";
    }

    if (!form.f_name) {
      newErrors.f_name = "First name is required and must be at least 2 characters";
    } else if (!/^[a-zA-Z\u0600-\u06FF\s.'-]+$/.test(form.f_name)) {
      newErrors.f_name = "First name must contain letters only";
    } else if (form.f_name.length < 2 || form.f_name.length > 50) {
      newErrors.f_name = "First name must be between 2 and 50 characters";
    }

    if (!form.l_name) {
      newErrors.l_name = "Last name is required and must be at least 2 characters";
    } else if (!/^[a-zA-Z\u0600-\u06FF\s.'-]+$/.test(form.l_name)) {
      newErrors.l_name = "Last name must contain letters only";
    } else if (form.l_name.length < 2 || form.l_name.length > 50) {
      newErrors.l_name = "Last name must be between 2 and 50 characters";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format. Please enter a valid email address.";
    } else {
      const domain = form.email.split('@')[1];
      const commonDomains = [
        'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
        'aol.com', 'icloud.com', 'protonmail.com'
      ];
      if (!commonDomains.includes(domain)) {
        newErrors.email = "Email must be from a recognized provider (e.g., Gmail, Outlook, Yahoo).";
      }
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is too short (at least 8 digits)";
    } else if (!/^[0-9+()\-\s]*$/.test(form.phone)) {
      newErrors.phone = "Phone number can only contain digits or international characters (+, -, parenthesis)";
    } else if (form.phone.length < 8 || form.phone.length > 15) {
      newErrors.phone = "Phone number must be between 8 and 15 digits";
    }

    const nameFields = ['city', 'governorate', 'country'];
    nameFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = `${field[0].toUpperCase() + field.slice(1)} name is required and must be at least 2 characters`;
      } else if (!/^[a-zA-Z\u0600-\u06FF\s.'-]+$/.test(form[field])) {
        newErrors[field] = `${field[0].toUpperCase() + field.slice(1)} name must contain letters only`;
      } else if (form[field].length < 2 || form[field].length > 100) {
        newErrors[field] = `${field[0].toUpperCase() + field.slice(1)} name must be between 2 and 100 characters`;
      }
    });

    if (!form.password) {
      newErrors.password = "Password must be at least 8 characters long";
    } else {
      if (form.password.length < 8 || form.password.length > 50) {
        newErrors.password = "Password must be between 8 and 50 characters";
      } else if (!/[a-z]/.test(form.password)) {
        newErrors.password = "Password must contain at least one lowercase letter";
      } else if (!/[A-Z]/.test(form.password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      } else if (!/[0-9]/.test(form.password)) {
        newErrors.password = "Password must contain at least one digit";
      } else if (!/[^a-zA-Z0-9]/.test(form.password)) {
        newErrors.password = "Password must contain at least one special character (e.g., !@#$%^&*)";
      }
    }

    if (!form.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    } else if (form.password !== form.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    if (form.subdomain && !/^[a-z0-9-]+$/.test(form.subdomain)) {
      newErrors.subdomain = "Subdomain can only contain lowercase letters, numbers, and hyphens";
    } else if (form.subdomain && (form.subdomain.length < 3 || form.subdomain.length > 50)) {
      newErrors.subdomain = "Subdomain must be between 3 and 50 characters long";
    }

    if (!form.payout_method) {
      newErrors.payout_method = "Payout Account is required";
    }

    return newErrors;
  };


  const handleRegister = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    if (logo) {
      formData.append('logo', {
        uri: logo.uri,
        name: 'logo.jpg',
        type: 'image/jpeg',
      });
    }

    if (profileImage) {
      formData.append('profile_imge', {
        uri: profileImage.uri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });
    }

    formData.append('theme', selectedTheme);

    try {
      await authAPI.post('seller/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Registration successful');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err?.response?.data);

      if (err?.response?.data?.details) {
        const serverErrors = {};
        for (const key in err.response.data.details) {
          const messageArray = err.response.data.details[key];
          if (Array.isArray(messageArray) && messageArray.length > 0) {
            serverErrors[key] = messageArray[0];
          } else if (typeof messageArray === 'string') {
            serverErrors[key] = messageArray;
          } else {
            serverErrors[key] = 'Invalid value';
          }
        }
        setErrors(serverErrors);
      }


      // ممكن تشيل alert خالص لو مش عاوزها
      alert(err?.response?.data?.error || 'Registration failed');
    }


  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create an Account</Text>

      {fields.map(({ name, label, icon, isPassword }) => (
        <View key={name} style={{ marginBottom: 15 }}>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>{icon}</View>
            <TextInput
              placeholder={label}
              value={form[name]}
              secureTextEntry={!!isPassword}
              onChangeText={(val) => handleChange(name, val)}
              style={styles.input}
            />
          </View>
          {errors[name] && <Text style={styles.errorText}>{errors[name]}</Text>}
        </View>
      ))}


      <View style={styles.uploadContainer}>
        <Text style={styles.uploadHeader}>Add a Store Logo</Text>
        <Text style={styles.uploadDescription}>{logo ? "Store Logo Selected" : "Upload a photo of your store logo"}</Text>
        <TouchableOpacity onPress={() => pickImage(setLogo)} style={styles.uploadButton}>
          <Text>Upload Image</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadHeader}>Add a Profile Image</Text>
        <Text style={styles.uploadDescription}>{profileImage ? "Profile Image Selected" : "Upload a photo of your profile"}</Text>
        <TouchableOpacity onPress={() => pickImage(setProfileImage)} style={styles.uploadButton}>
          <Text>Upload Image</Text>
        </TouchableOpacity>
      </View>

      <ThemeSelector selectedTheme={selectedTheme} onSelectTheme={setSelectedTheme} />


      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
    width: 24,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingTop: 10,
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#D1CFE8',
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'dashed',
    paddingVertical: 20,
  },
  uploadHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0D0D1C',
  },
  uploadDescription: {
    fontSize: 14,
    color: '#0D0D1C',
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#7569FA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },

});
