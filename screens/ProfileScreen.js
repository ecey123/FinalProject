import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile 👤</Text>
      <Text style={styles.sub}>User info & logout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF0F3", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "800", color: "#E5989B", marginBottom: 6 },
  sub: { fontSize: 14, color: "#5A2A2A" },
});
