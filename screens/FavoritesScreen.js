import React, { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import RecipeCard from "../components/RecipeCard";
import { recipes } from "../data/recipes";
import { getFavoriteIds, toggleFavoriteId } from "../storage/storage";
import EmptyState from "../components/EmptyStateComponent";

export default function FavoritesScreen() {
  const [favoriteIds, setFavoriteIds] = useState([]);

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

  const favorites = useMemo(() => {
    return recipes.filter((r) => favoriteIds.includes(r.id));
  }, [favoriteIds]);

  const toggleFavorite = async (id) => {
    const next = await toggleFavoriteId(id);
    setFavoriteIds(next);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      <Text style={styles.sub}>your saved cozy picks 💗</Text>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          subtitle="Tap the heart on a recipe to save it."
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <RecipeCard
              item={item}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
              onPress={() => {}}
            />
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
    marginTop: 24
,
  },
  sub: {
    fontSize: 13,
    color: "#B5838D",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
  },
  list: {
    paddingBottom: 120,
  },
  row: {
    justifyContent: "space-between",
  },
});
