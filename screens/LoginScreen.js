import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const goToApp = () => navigation.replace("MainTabs");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RecipeNest</Text>
      <Text style={styles.subtitle}>your cozy recipe corner 🍰</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.muted}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.muted}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={goToApp} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToApp} activeOpacity={0.8}>
        <Text style={styles.guest}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const colors = {
  bg: "#FFF0F3",
  rose: "#E5989B",
  soft: "#F4B6C2",
  muted: "#B5838D",
  text: "#5A2A2A",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.rose,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#F7D9E0",
  },
  button: {
    width: "100%",
    backgroundColor: colors.rose,
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
  },
  guest: {
    marginTop: 18,
    color: colors.text,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
