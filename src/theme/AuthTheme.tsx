import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    height: 600,
    marginBottom: 50,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  label: {
    marginTop: 25,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    color: "white",
    fontSize: 18,
  },
  buttonContainer: { alignItems: "center", marginTop: 50 },
  button: {
    paddingHorizontal: 20,
    borderColor: "white",
    paddingVertical: 5,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
