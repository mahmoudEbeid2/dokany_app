import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@env";


const EditCategory =  ({ route, navigation }) => {
  const { category } = route.params; 
// const category = { name: 'Test5',
//     id:"cmddaye3d0005w43dj89d6gnc"
//  };
//   const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGMzNzhuazAwMDgxMmtjY3V2MGkybjMiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMDQwODE1LCJleHAiOjE3NTM2NDU2MTV9.5RI4Ou2Oohgd05E615SL6-2Z-7XQL00FppfKFCRxoq4";



  const [name, setName] = useState(category.name || '');
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!name) {
      Alert.alert('Please enter name');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);

    if (image) {
      formData.append('image', {
        uri: image.uri,
        name: 'category.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${API}/categories/${category.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert('Success', 'Category updated successfully', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      } else {
        Alert.alert(data.message || 'Failed to update category');
        // console.log(response);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      Alert.alert('Failed to update category');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Edit Category</Text>

        <Text style={styles.label}>Category Image</Text>
        <TouchableOpacity onPress={pickImage} style={{ marginBottom: 20 }}>
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={{ width: '100%', height: 200, borderRadius: 12 }}
            />
          ) : (
             <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage}>
                              <Text style={styles.title}>Update a Category image</Text>
                              <Text style={styles.imageUploadText}>Upload a photo of your category</Text>
                              <Text style={styles.imageUploadBtn}>Upload image</Text>
                            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Category Name</Text>
        <TextInput
          placeholder="Category Name"
          placeholderTextColor={'#4F479E'}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        {loading ? (
          <View style={styles.saveBtn}>
            <ActivityIndicator color="#fff" />
          </View>
        ) : (
          <TouchableOpacity onPress={handleUpdate} style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Update Category</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditCategory;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 30,
    backgroundColor: "#fff",
    alignItems: "stretch",
    // flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  imageUploadBox: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  imageUploadText: {
    color: "#666",
    fontSize: 16,
  },
  imageUploadBtn: {
    backgroundColor: "#E8E5F5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
//   imagePreviewContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 15,
//   },
//   image: {
//     width: 70,
//     height: 70,
//     margin: 5,
//     borderRadius: 6,
//   },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    // marginTop: 12,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#E8E5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    width: "100%",
  },
  saveBtn: {
    backgroundColor: "#5E2BD9",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
