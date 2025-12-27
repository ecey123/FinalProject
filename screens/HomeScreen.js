import React, { useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import RecipeCard from "../components/RecipeCard";
import { recipes } from "../data/recipes";
import { getFavoriteIds, toggleFavoriteId } from "../storage/storage";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Home'a her gelindiğinde favorileri storage'dan çek
  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        const ids = await getFavoriteIds();
        if (mounted) setFavoriteIds(ids);
      })();
      return () => {
        mounted = false;
      };
    }, [])
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter((r) => r.title.toLowerCase().includes(q));
  }, [query]);

  const toggleFavorite = async (id) => {
    const next = await toggleFavoriteId(id);
    setFavoriteIds(next);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RecipeNest</Text>
      <Text style={styles.sub}>find something cozy ✨</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search recipes..."
        placeholderTextColor="#B5838D"
        style={styles.search}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <RecipeCard
            item={item}
            isFavorite={favoriteIds.includes(item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={() => {}}
          />
        )}
      />
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
    fontSize: 28,
    fontWeight: "900",
    color: "#E5989B",
    textAlign: "center",
    marginTop: 24,
  },
  sub: {
    fontSize: 13,
    color: "#B5838D",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
  },
  search: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    marginBottom: 14,
    fontSize: 14,
    color: "#5A2A2A",
  },
  list: {
    paddingBottom: 120,
  },
  row: {
    justifyContent: "space-between",
  },
});
