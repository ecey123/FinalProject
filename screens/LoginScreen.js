import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RecipeNest</Text>
      <Text style={styles.subtitle}>your cozy recipe corner 🍰</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#B5838D"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#B5838D"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.guest}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F3",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: "800",
    color: "#E5989B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#B5838D",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 16,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#E5989B",
    padding: 16,
    borderRadius: 18,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
  guest: {
    marginTop: 20,
    color: "#5A2A2A",
    fontSize: 14,
  },
});
