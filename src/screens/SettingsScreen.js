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
import theme from '../utils/theme';

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
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* هيدر علوي ثابت: */}
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <AntDesign name="arrowleft" size={22} color={theme.colors.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>
          {/* صورة البروفايل: */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageWrapper}>
              <Image source={seller?.profile_imge ? { uri: seller.profile_imge } : defaultProfile} style={styles.profileImage} />
              <View style={styles.cameraOverlay}>
                <MaterialIcons name="photo-camera" size={20} color={theme.colors.card} />
              </View>
            </View>
            <Text style={styles.nameText}>{seller?.user_name || seller?.f_name || 'Your Name'}</Text>
            <View style={styles.subdomainCard}>
              <Text style={styles.subdomainText}>@{seller?.subdomain || 'subdomain'}</Text>
              <TouchableOpacity onPress={() => { Clipboard.setStringAsync(`@${seller?.subdomain || 'subdomain'}`); if (Platform.OS === 'android') { ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT); } else { Alert.alert('Copied!', 'Subdomain copied to clipboard.'); } }} style={styles.copyIconBtn}>
                <MaterialIcons name="content-copy" size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          {/* كروت الخيارات: */}
          {settings.map((setting, index) => (
            <View key={index} style={styles.optionCard}>
              <TouchableOpacity
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => {
                  if (setting.GoToPage === 'Logout') {
                    handleLogout();
                  } else {
                    navigation.navigate(setting.GoToPage, { sellerId: seller?.id, payoutMethod: seller?.payout_method });
                  }
                }}
              >
                <View style={styles.optionDetails}>
                  <View style={[styles.optionIconCircle, { backgroundColor: index === 0 ? theme.colors.primary : index === 1 ? theme.colors.success : theme.colors.error }]}> 
                    {React.cloneElement(setting.icon, { size: 20, color: '#FFF' })}
                  </View>
                  <Text style={styles.optionText}>{setting.content}</Text>
                </View>
                <AntDesign name="arrowright" size={22} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
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
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navigationTitle: {
    fontSize: theme.fonts.size.xl,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
    marginTop: 10,
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.bold,
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
  profileImageWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  profileImage: { width: 110, height: 110, borderRadius: 55, backgroundColor: theme.colors.card, marginBottom: 10, borderWidth: 3, borderColor: theme.colors.primary, ...theme.shadow },
  cameraOverlay: { position: 'absolute', bottom: 6, right: 10, backgroundColor: theme.colors.primary, borderRadius: 16, padding: 4, borderWidth: 2, borderColor: theme.colors.card, alignItems: 'center', justifyContent: 'center' },
  nameText: { fontSize: theme.fonts.size.xl, fontWeight: 'bold', color: theme.colors.text, marginTop: 8, fontFamily: theme.fonts.bold, textAlign: 'center' },
  subdomainCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.md, paddingVertical: 4, paddingHorizontal: 14, marginTop: 4, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', ...theme.shadow },
  subdomainText: { color: theme.colors.textSecondary, fontSize: theme.fonts.size.md, fontWeight: 'bold', textAlign: 'center' },
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
  optionIconContainer: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background, borderRadius: theme.radius.lg, marginRight: 14, ...theme.shadow },
  optionIconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 14, ...theme.shadow },
  optionText: { fontSize: theme.fonts.size.lg, color: theme.colors.text, fontWeight: 'bold', fontFamily: theme.fonts.bold },
  optionCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, marginBottom: 14, ...theme.shadow },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 16 },
  optionRowPressed: { backgroundColor: theme.colors.background },
  backButton: { padding: 4, marginRight: 8 },
  headerBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', paddingVertical: 12, paddingHorizontal: 0, marginBottom: 18, marginTop: 8, justifyContent: 'center', shadowColor: 'transparent', borderRadius: 0 },
  backButton: { padding: 4, marginRight: 8, position: 'absolute', left: 8, zIndex: 2 },
  headerTitle: { fontSize: theme.fonts.size.lg, color: theme.colors.text, fontWeight: 'bold', fontFamily: theme.fonts.bold, textAlign: 'center' },
  profileSection: { alignItems: 'center', marginBottom: 18 },
  profileImageWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  profileImage: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: theme.colors.primary, ...theme.strongShadow },
  cameraOverlay: { position: 'absolute', bottom: 8, right: 10, backgroundColor: theme.colors.primary, borderRadius: 16, padding: 4, borderWidth: 2, borderColor: theme.colors.card, alignItems: 'center', justifyContent: 'center' },
  nameText: { fontSize: theme.fonts.size.md, fontWeight: 'bold', color: theme.colors.text, marginTop: 8, fontFamily: theme.fonts.bold, textAlign: 'center' },
  subdomainCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.md, paddingVertical: 4, paddingHorizontal: 14, marginTop: 4, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', ...theme.shadow },
  subdomainText: { color: theme.colors.textSecondary, fontSize: theme.fonts.size.sm, fontWeight: 'bold', textAlign: 'center' },
  copyIconBtn: { marginLeft: 8, padding: 2 },
  optionCard: { backgroundColor: theme.colors.card, borderRadius: 24, marginBottom: 18, ...theme.strongShadow },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, paddingHorizontal: 18, borderRadius: 24 },
  optionIconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  optionText: { fontSize: theme.fonts.size.md, color: theme.colors.text, fontWeight: 'bold', fontFamily: theme.fonts.bold },
});


