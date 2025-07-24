import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { themeAPI } from '../utils/api/api';

const backupThemes = [
  {
    name: 'Elegant Light',
    image: require('../../assets/theme-one.webp'),
  },
  {
    name: 'Dark Modern',
    image: require('../../assets/theme-two.webp'),
  },
];

export default function ThemeSelector({ selectedTheme, onSelectTheme }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchThemes = async () => {
    try {
      const res = await themeAPI.get('');
      const fetchedThemes = res.data.themes.map((theme) => ({
        name: theme.name,
        image: { uri: theme.image },
      }));
      setThemes(fetchedThemes);
    } catch (error) {
      console.log('Failed to load themes from API, using backup', error.message);
      setThemes(backupThemes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleLongPress = (theme) => {
    setSelectedImage(theme.image);
    onSelectTheme(theme.name);
    setModalVisible(true);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#7569FA" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Choose Your Theme</Text>
      <View style={styles.themesRow}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.name}
            onLongPress={() => handleLongPress(theme)}
            onPress={() => onSelectTheme(theme.name)}
            style={[
              styles.themeBox,
              selectedTheme === theme.name && styles.selectedBox,
            ]}
          >
            <Image source={theme.image} style={styles.themeImage} />
            <Text style={styles.themeName}>{theme.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTheme}</Text>
            <Image
              source={selectedImage}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  subHeader: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 10,
  },
  themesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeBox: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#eee',
    padding: 5,
    alignItems: 'center',
  },
  selectedBox: {
    borderColor: '#578FCA',
  },
  themeImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  themeName: {
    marginTop: 8,
    fontWeight: '500',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
    marginTop: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: "#7569FA",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 16,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


