import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StatsOverview from "../components/StatsOverview";
import LastOrders from "../components/LastOrders";
import theme from '../utils/theme';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const dummyData = [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F479E" />
      </View>
    );
  }

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={22} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={dummyData}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.overview}>Overview</Text>
            <StatsOverview />
            <LastOrders />
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fonts.size.xl,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
    marginTop: 10,
    paddingHorizontal: 10,
    fontFamily: theme.fonts.bold,
  },
  overview: {
    fontSize: theme.fonts.size.lg,
    fontWeight: '700',
    color: theme.colors.primary,
    paddingHorizontal: 10,
    fontFamily: theme.fonts.bold,
  },
  setting: {
    paddingHorizontal: 10,
  },
  backButton: { padding: 4, marginRight: 8, position: 'absolute', left: 8, zIndex: 2, backgroundColor: theme.colors.card, borderRadius: 20, ...theme.shadow },
  headerBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', paddingVertical: 12, marginBottom: 18, marginTop: 8, justifyContent: 'center' },
  headerTitle: { fontSize: theme.fonts.size.lg, color: theme.colors.text, fontWeight: 'bold', fontFamily: theme.fonts.bold, textAlign: 'center' },
  settingsButton: { padding: 4, marginLeft: 8, position: 'absolute', right: 8, zIndex: 2, backgroundColor: theme.colors.card, borderRadius: 20, ...theme.shadow },
});
