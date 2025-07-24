import React, { useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "@expo/vector-icons/AntDesign";



const AddCategory =  ({ navigation }) => {


  const [name, setName] = useState('');
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

  const handleSubmit = async () => {
    if (!name ) {
        Alert.alert('please enter name');
      return;
    }else if (!image) {
      Alert.alert('please select image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', {
      uri: image.uri,
      name: 'category.jpg',
      type: 'image/jpeg',
    });

    const token = await AsyncStorage.getItem('token');
    // console.log("token",token);

    try {
      setLoading(true);
      const response = await fetch(`${API}/categories`, {
        method: 'POST',
        headers: {
        //   'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert('success','category added successfully',[
            {text:'ok',
            onPress:()=>{
                // navigation.goBack();
                setImage(null);
                setName('');
            }}
        ]);
        // navigation.goBack();
      } else {
        Alert.alert(data.message || 'Failed to add category');
        console.log(response)
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      Alert.alert('Failed to add category');
    }
  };

  return (
      <SafeAreaView style={{ flex: 1 }}>
        

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Add Category</Text>



      <Text style={styles.label}>Category Image</Text>
      <TouchableOpacity onPress={pickImage} style={{ marginBottom: 20 }}>
        {image ? (
          <Image
            source={{ uri: image.uri }}
            style={{ width: '100%', height: 200, borderRadius: 12 }}
          />
        ) : (
          <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage}>
                  <Text style={styles.title2}>Add a Category image</Text>
                  <Text style={styles.imageUploadText}>Upload a photo of your category</Text>
                  <Text style={styles.imageUploadBtn}>Upload image</Text>
                </TouchableOpacity>
        )}
      </TouchableOpacity>
            <Text style={styles.label}>Category Name </Text>
      <TextInput
        placeholder="Category Name"
        placeholderTextColor={"grey"}
        value={name}
        onChangeText={setName}
        style={styles.input}

      />

        {loading ? (
            <View style={styles.saveBtn}>
          <ActivityIndicator color="#fff" />
            </View>
        ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              style={styles.saveBtn}
            >
            
          <Text style={styles.saveBtnText}>save category </Text>
            
      </TouchableOpacity>
        )}
    </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

export default AddCategory;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
    // flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    marginTop: 10
  },
  title2: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 10,
    color: "#333",
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
    color: "#665491",
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

  label: {
    fontWeight: "bold",
    marginBottom: 4,
    // marginTop: 12,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#7569FA",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    width: "100%",
  },
  saveBtn: {
    backgroundColor: "#7569FA",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 16,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
        backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 3,
    padding: 8,
  },
  
});

