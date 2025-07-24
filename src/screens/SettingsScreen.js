import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform, ToastAndroid,

} from 'react-native';

import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sellerAPI } from '../utils/api/api';
import defaultProfile from '../../assets/Seller.png';
import * as Clipboard from 'expo-clipboard';

const settings = [
  {
    content: 'Edit Profile',
    icon: <FontAwesome name="user" size={20} color="#121217" />,
    GoToPage: 'EditSellerProfile',
  },
  {
    content: 'Withdrawals & Payouts',
    icon: <MaterialIcons name="account-balance-wallet" size={20} color="#121217" />,
    GoToPage: 'Payouts',
  },
  {
    content: 'Logout',
    icon: <MaterialIcons name="logout" size={20} color="#121217" />,
    GoToPage: 'Logout',
  },
];

export default function SettingsScreen({ navigation }) {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSeller = async () => {
    try {
      const res = await sellerAPI.get('api/seller/id');
      setSeller(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to load seller data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (err) {
      console.error('Logout error:', err);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7569FA" />
      </View>
    );
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={styles.navigationContainer}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text
              style={styles.navigationTitle}
            >
              Settings
            </Text>
          </View>
          <View style={styles.profileContainer}>
            <Image
              source={seller?.profile_imge ? { uri: seller.profile_imge } : defaultProfile}
              style={styles.profileImage}
            />
            <Text style={styles.nameText}>{seller?.user_name || seller?.f_name || 'Your Name'}</Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync(`@${seller?.subdomain || 'subdomain'}`);
                if (Platform.OS === 'android') {
                  ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
                } else {
                  Alert.alert('Copied!', 'Subdomain copied to clipboard.');
                }
              }}
            >
              <Text style={styles.subdomainText}>@{seller?.subdomain || 'subdomain'}</Text>
            </TouchableOpacity>

          </View>

          {settings.map((setting, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionContainer}
              onPress={() => {
                if (setting.GoToPage === 'Logout') {
                  handleLogout();
                } else {
                  navigation.navigate(setting.GoToPage, { sellerId: seller?.id, payoutMethod: seller?.payout_method });
                }
              }}
            >
              <View style={styles.optionDetails}>
                <View style={styles.optionIconContainer}>
                  {setting.icon}
                </View>
                <Text style={styles.optionText}>{setting.content}</Text>
              </View>
              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>
          ))}

        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navigationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    marginTop: 10,
    flex: 1,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    marginTop: 10,
  },
  subdomainText: {
    color: "#665491",
    fontSize: 14,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
  },
  optionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F0F5',
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "700",
  },
});


