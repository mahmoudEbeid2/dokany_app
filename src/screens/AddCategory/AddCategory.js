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

const AddCategory =  ({ navigation }) => {
     const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGRmNTVxNzAwMDBzNnlweG5oaThtOGgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMTIxMjg1LCJleHAiOjE3NTM3MjYwODV9.EjqeiVhVpkBWo3kyJDO5ngPOHzWUAx3_kbis8kxoBxY"
     // const token =  AsyncStorage.getItem("token");

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

    try {
      setLoading(true);
      const response = await fetch('https://dokany-api-production.up.railway.app/categories', {
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
        // console.log(response)
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      Alert.alert('Failed to add category');
    }
  };

  return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
                  <Text style={styles.title}>Add a Category image</Text>
                  <Text style={styles.imageUploadText}>Upload a photo of your category</Text>
                  <Text style={styles.imageUploadBtn}>Upload image</Text>
                </TouchableOpacity>
        )}
      </TouchableOpacity>
            <Text style={styles.label}>Category Name </Text>
      <TextInput
        placeholder="Category Name"
        placeholderTextColor={"#4F479E"}
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
  );
};

export default AddCategory;


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
    width: "300",
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

