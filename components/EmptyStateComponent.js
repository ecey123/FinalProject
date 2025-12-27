import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmptyState({ title, subtitle }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    alignItems: "center",
    marginTop: 30,
  },
  title: { fontSize: 16, fontWeight: "800", color: "#5A2A2A", marginBottom: 6 },
  sub: { fontSize: 13, color: "#B5838D", textAlign: "center" },
});
