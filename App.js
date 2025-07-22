import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateProduct from './src/screens/createProduct/CreateProduct';
import EditProduct from './src/screens/editProduct/EditProduct';
import AddCategory from './src/screens/AddCategory/AddCategory';
import EditCategory from './src/screens/EditCategory/EditCategory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetails from './src/screens/ProductDetails/ProductDetails';

export default  function App () {
  //  AsyncStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGRmNTVxNzAwMDBzNnlweG5oaThtOGgiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzUzMTIxMjg1LCJleHAiOjE3NTM3MjYwODV9.EjqeiVhVpkBWo3kyJDO5ngPOHzWUAx3_kbis8kxoBxY")
  
  return (
    <View style={styles.container}>
      {/* <CreateProduct/> */}
      {/* <EditProduct/> */}
      {/* <AddCategory/> */}
      {/* <EditCategory/> */}
      <ProductDetails/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
