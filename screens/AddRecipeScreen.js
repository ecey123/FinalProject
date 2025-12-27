import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AddRecipeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Recipe ➕</Text>
      <Text style={styles.subtitle}>Create your own cute recipe 💗</Text>
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
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#E5989B",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#5A2A2A",
  },
});
