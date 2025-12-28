import React, { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import RecipeCard from "../components/RecipeCard";
import { recipes as DEFAULT_RECIPES } from "../data/recipes";
import { getFavoriteIds, toggleFavoriteId, getUserRecipes } from "../storage/storage";
import EmptyState from "../components/EmptyStateComponent";

export default function FavoritesScreen({ navigation }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      (async () => {
        const ids = await getFavoriteIds();
        const user = await getUserRecipes();
        const merged = [...user, ...DEFAULT_RECIPES];

        if (mounted) {
          setFavoriteIds(ids);
          setAllRecipes(merged);
        }
      })();

      return () => {
        mounted = false;
      };
    }, [])
  );

  const favorites = useMemo(() => {
    return allRecipes.filter((r) => favoriteIds.includes(r.id));
  }, [favoriteIds, allRecipes]);

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
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <RecipeCard
              item={item}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
              onPress={() =>
                navigation.navigate("RecipeDetail", { recipe: item })
              }
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
    marginTop: 45,
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
