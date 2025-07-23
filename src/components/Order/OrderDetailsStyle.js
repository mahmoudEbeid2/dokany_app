import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 0,
    width: "100%",
    backgroundColor: "#FAFAFA",
  },
  title: {
    textAlign: "center",
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

const customerInfoStyle = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
    marginTop: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  name: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  data: {
    color: "#665491",
    fontSize: 14,
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "#EBE8F2",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

const summaryItemStyle = StyleSheet.create({
  continuer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    width: "100%",
    gap: 16,
  },

  image: { width: 70, height: 70, borderRadius: 8 },
  name: { fontWeight: "500", fontSize: 16, color: "#120F1A" },
  data: { color: "#6E6387", fontSize: 14 },
});

const statusStyle = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#120F1A",
  },
  dropdown: {
    marginBottom: 10,
    borderColor: "#7569FA",
  },
  dropdownContainer: {
    borderColor: "#7569FA",
  },
  list: {
    marginTop: 20,
  },
  Button: {
    color: "#7569FA",
  },
  ButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  ButtonDisabled: {
    color: "#ccc",
  },
  ButtonDisabledText: {
    color: "white",
    fontWeight: "bold",
  },
});

export {
  styles,
  pickerSelectStyles,
  customerInfoStyle,
  summaryItemStyle,
  statusStyle,
};
