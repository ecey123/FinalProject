import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites 💗</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F3",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    color: "#E5989B",
    fontWeight: "700",
  },
});
