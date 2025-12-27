import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeCard({ item, isFavorite, onToggleFavorite, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <TouchableOpacity
        style={styles.heartBtn}
        onPress={() => onToggleFavorite(item.id)}
        activeOpacity={0.85}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={18}
          color={isFavorite ? "#E5989B" : "#B5838D"}
        />
      </TouchableOpacity>

      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color="#B5838D" />
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F7D9E0",
  },
  image: {
    width: "100%",
    height: 120,
  },
  heartBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F7D9E0",
  },
  meta: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5A2A2A",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    marginLeft: 6,
    fontSize: 12,
    color: "#B5838D",
  },
});
