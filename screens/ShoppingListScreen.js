import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import ShoppingListItem from "../components/ShoppingListItem";
import EmptyState from "../components/EmptyStateComponent";
import {
  getShoppingItems,
  addShoppingItem,
  toggleShoppingItem,
  removeShoppingItem,
  clearShoppingDone,
} from "../storage/storage";

export default function ShoppingListScreen() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        const list = await getShoppingItems();
        if (mounted) setItems(list);
      })();
      return () => {
        mounted = false;
      };
    }, [])
  );

  const onAdd = async () => {
    const next = await addShoppingItem(text);
    setItems(next);
    setText("");
    Keyboard.dismiss();
  };

  const onToggle = async (id) => {
    const next = await toggleShoppingItem(id);
    setItems(next);
  };

  const onRemove = async (id) => {
    const next = await removeShoppingItem(id);
    setItems(next);
  };

  const onClearDone = async () => {
    const next = await clearShoppingDone();
    setItems(next);
  };

  const doneCount = items.filter((x) => x.done).length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>
      <Text style={styles.sub}>tick items like a cute to-do 🛒</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add an item (e.g., milk)"
          placeholderTextColor="#B5838D"
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={onAdd}
        />
        <TouchableOpacity style={styles.addBtn} onPress={onAdd} activeOpacity={0.9}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.topActions}>
        <Text style={styles.count}>
          {items.length} items • {doneCount} done
        </Text>

        <TouchableOpacity
          onPress={onClearDone}
          activeOpacity={0.8}
          disabled={doneCount === 0}
        >
          <Text style={[styles.clear, doneCount === 0 && styles.clearDisabled]}>
            Clear done
          </Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <EmptyState
          title="Your shopping list is empty"
          subtitle="Add items you need to buy 💗"
        />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ShoppingListItem item={item} onToggle={onToggle} onRemove={onRemove} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F3",
    paddingTop: 18,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "900",
    color: "#E5989B",
    textAlign: "center",
    marginTop: 40,
  },
  sub: {
    fontSize: 13,
    color: "#B5838D",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    fontSize: 14,
    color: "#5A2A2A",
  },
  addBtn: {
    marginLeft: 10,
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#E5989B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F7D9E0",
  },
  topActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  count: {
    fontSize: 12,
    color: "#B5838D",
    fontWeight: "600",
  },
  clear: {
    fontSize: 12,
    color: "#5A2A2A",
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  clearDisabled: {
    opacity: 0.35,
    textDecorationLine: "none",
  },
  list: {
    paddingTop: 6,
    paddingBottom: 120,
  },
});
