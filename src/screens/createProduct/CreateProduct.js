import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Keyboard, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateProduct = ({navigation}) => {

//   const categoryId = "cmdc3qxl8000a12kc49thcm72";
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGRmNTVxNzAwMDBzNnlweG5oaThtOGgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMTIxMjg1LCJleHAiOjE3NTM3MjYwODV9.EjqeiVhVpkBWo3kyJDO5ngPOHzWUAx3_kbis8kxoBxY";
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  //   send data to api
  const handleSave = async () => {
    //   if (!productName || !price || !description || !category ||!stock || images.length === 0) {
    //     Alert.alert('Error', 'Please fill in all the required fields and select at least one image.');
    //     return;
    //   }
    if (!productName) {
      Alert.alert("Error", "Please enter product name");
      return;
    } else if (!price) {
      Alert.alert("Error", "Please enter price");
      return;
    } else if (!description) {
      Alert.alert("Error", "Please enter description");
      return;
    } else if (!category) {
      Alert.alert("Error", "Please enter category");
      return;
    } else if (!stock) {
      Alert.alert("Error", "Please enter stock");
      return;
    } else if (images.length === 0) {
      Alert.alert("Error", "Please select at least one image");
      return;
    }


    try {
        const token = await AsyncStorage.getItem('token');
        setLoading(true);
      const formData = new FormData();
      formData.append("title", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("discount", discount?discount:0);
      formData.append("category_id", category);
      formData.append("stock", stock);
      formData.append("status", status);
      // formData.append('images', images);
      images.forEach((image, index) => {
        formData.append("images", {
          uri: image.uri,
          type: "image/jpeg",
          name: `image_${index}.jpg`,
        });
      });
      const response = await fetch(
        "https://dokany-api-production.up.railway.app/products",
        {
          method: "POST",
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Product added successfully", [
          {
            text: "OK",
            onPress: () => {
              // navigation.navigate('Home');
            //   console.log("OK");
              setProductName("");
              setPrice("");
              setDescription("");
              setDiscount("");
              setCategory("");
              setStock("");
              setStatus("");
              setImages([]);
            },
          },
        ]);
      } else {
        Alert.alert("Error", data.error || "Failed to add product");
        console.log(response)
      }
    //   console.log(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add product");
    }finally{
        setLoading(false);
    }

  };
  //   get categories
  useEffect(() => {
    const fetchCategories = async () => {
        const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch(
          "https://dokany-api-production.up.railway.app/categories/seller",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log("Categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const removeImage = (indexToRemove) => {
  const updatedImages = images.filter((_, index) => index !== indexToRemove);
  setImages(updatedImages);
};

  return (
    <KeyboardAvoidingView
    //   style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={20}
    >
        
    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
    <ScrollView contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"
    
    >
      <Text style={styles.title}>Add Product</Text>

      {categories?.length>0? null:<View style={styles.loadingContainer}>
        <Text style={styles.title}>not categories yet plesse add category</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.navigate("CreateCategory")}>
        <Text style={styles.saveBtnText}>Add Category</Text>
      </TouchableOpacity>   
      </View>}
        
        
    
      <TouchableOpacity style={styles.imageUploadBox} onPress={pickImages}>
        <Text style={styles.title}>Add a product image</Text>
        <Text style={styles.imageUploadText}>Upload a photo of your product</Text>
        <Text style={styles.imageUploadBtn}>Upload image</Text>
      </TouchableOpacity>

      {/* <View style={styles.imagePreviewContainer}>
        {images.map((img, i) => (
          <Image key={i} source={{ uri: img.uri }} style={styles.image} />
        ))}
      </View> */}
      <FlatList
  horizontal
  data={images}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item, index }) => (
    <View style={{ marginRight: 10, position: 'relative' }}>
      <Image
        source={{ uri: item.uri }}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
      <TouchableOpacity
        onPress={() => removeImage(index)}
        style={{
          position: 'absolute',
          top: -5,
          right: -5,
          backgroundColor: 'red',
          borderRadius: 10,
          padding: 5,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
      </TouchableOpacity>
    </View>
  )}
/>

      {/* <TouchableWithoutFeedback }> */}
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        placeholderTextColor={"#4F479E"}
        value={productName}
        onChangeText={setProductName}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        placeholderTextColor={"#4F479E"}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Text style={styles.label}>Discount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter discount (optional)"
        placeholderTextColor={"#4F479E"}
        keyboardType="numeric"
        value={discount}
        onChangeText={setDiscount}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Enter category"
        value={category}
        onChangeText={setCategory}
      /> */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value=""  color="#4F479E" enabled={false} />
          {categories?.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Stock</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter stock"
        keyboardType="numeric"
        placeholderTextColor={"#4F479E"}
        value={stock}
        onChangeText={setStock}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Enter status"
        value={status}
        onChangeText={setStatus}
      /> */}
      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select status" value="" color="#4F479E" enabled={false} />
          <Picker.Item label="Active" value="active" />
          <Picker.Item label="Inactive" value="inactive" />
        </Picker>
      </View>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="description"
        placeholderTextColor={"#4F479E"}
        multiline
        textAlignVertical="top"
        numberOfLines={5}
        value={description}
        onChangeText={setDescription}
      />

      {loading ? (<View style={styles.saveBtn}>

        <ActivityIndicator size="large" color="#fff" />
      </View>
      ):
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>}
      {/* </TouchableWithoutFeedback> */}
    </ScrollView>
    {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    // padding: 30,
    // backgroundColor: "#fff",
    // alignItems: "stretch",
    // // flex: 1,
   
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
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
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  image: {
    width: 70,
    height: 70,
    margin: 5,
    borderRadius: 6,
  },
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: "#E8E5F5",
  },
  picker: {
    height: 60,
    width: "100%",
  },
});
