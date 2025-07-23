import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 0,
    width: "100%",
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    marginTop: 10,
  },

  pikerContinuer: {
    borderWidth: 1,
    borderColor: "#7569FA",
    borderRadius: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 20,
    paddingVertical: 5,
    color: "#333",
  },
  inputAndroid: {
    fontSize: 20,
    paddingVertical: 5,
    color: "#333",
  },
  placeholder: {
    color: "#aaa",
  },
};

const loderStyles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { styles, pickerSelectStyles, loderStyles };
