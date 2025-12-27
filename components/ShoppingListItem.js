import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ShoppingListItem({ item, onToggle, onRemove }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.check, item.done && styles.checkDone]}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.8}
      >
        {item.done ? <Ionicons name="checkmark" size={16} color="#fff" /> : null}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.textWrap}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.8}
      >
        <Text style={[styles.text, item.done && styles.textDone]} numberOfLines={2}>
          {item.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.trash}
        onPress={() => onRemove(item.id)}
        activeOpacity={0.8}
      >
        <Ionicons name="trash-outline" size={18} color="#B5838D" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    marginBottom: 10,
  },
  check: {
    width: 26,
    height: 26,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#E5989B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#FFF0F3",
  },
  checkDone: {
    backgroundColor: "#E5989B",
  },
  textWrap: { flex: 1 },
  text: {
    fontSize: 14,
    color: "#5A2A2A",
    fontWeight: "600",
  },
  textDone: {
    color: "#B5838D",
    textDecorationLine: "line-through",
  },
  trash: {
    paddingLeft: 10,
    paddingVertical: 6,
  },
});
