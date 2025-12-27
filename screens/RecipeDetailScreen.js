import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { addShoppingItems, getFavoriteIds, toggleFavoriteId } from "../storage/storage";

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;

  const ingredients = useMemo(() => recipe?.ingredients || [], [recipe]);

  const [selected, setSelected] = useState([]);
  const [added, setAdded] = useState(false);

  const [favoriteIds, setFavoriteIds] = useState([]);
  const isFavorite = favoriteIds.includes(recipe.id);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const ids = await getFavoriteIds();
      if (mounted) setFavoriteIds(ids);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const allSelected =
    ingredients.length > 0 && selected.length === ingredients.length;

  const toggleOne = (ing) => {
    setSelected((prev) =>
      prev.includes(ing) ? prev.filter((x) => x !== ing) : [...prev, ing]
    );
  };

  const selectAll = () => setSelected([...ingredients]);
  const clearAll = () => setSelected([]);

  const onAddSelected = async () => {
    if (selected.length === 0) return;
    await addShoppingItems(selected);
    clearAll();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const onToggleFavorite = async () => {
    const next = await toggleFavoriteId(recipe.id);
    setFavoriteIds(next);
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Ionicons name="chevron-back" size={22} color="#5A2A2A" />
      </TouchableOpacity>

      {/* Favorite heart (top-right) */}
      <TouchableOpacity
        style={styles.favBtn}
        onPress={onToggleFavorite}
        activeOpacity={0.85}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={20}
          color={isFavorite ? "#E5989B" : "#5A2A2A"}
        />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: recipe.image }} style={styles.image} />

        <View style={styles.headerRow}>
          <Text style={styles.title}>{recipe.title}</Text>

          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={14} color="#B5838D" />
            <Text style={styles.time}>{recipe.time}</Text>
          </View>
        </View>

        {/* Add selected button */}
        <TouchableOpacity
          style={[
            styles.addBtn,
            selected.length === 0 && styles.addBtnDisabled,
            added && styles.addBtnDone,
          ]}
          onPress={onAddSelected}
          activeOpacity={0.9}
          disabled={selected.length === 0}
        >
          <Ionicons
            name={added ? "checkmark" : "cart"}
            size={18}
            color="#fff"
          />
          <Text style={styles.addBtnText}>
            {added
              ? "Added to shopping list!"
              : selected.length === 0
              ? "Select ingredients first"
              : `Add ${selected.length} items to shopping list`}
          </Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.section}>Ingredients</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={selectAll}
              activeOpacity={0.8}
              disabled={ingredients.length === 0 || allSelected}
            >
              <Text
                style={[
                  styles.actionText,
                  (ingredients.length === 0 || allSelected) && styles.actionDisabled,
                ]}
              >
                Select all
              </Text>
            </TouchableOpacity>

            <Text style={styles.dot}>•</Text>

            <TouchableOpacity
              onPress={clearAll}
              activeOpacity={0.8}
              disabled={selected.length === 0}
            >
              <Text
                style={[
                  styles.actionText,
                  selected.length === 0 && styles.actionDisabled,
                ]}
              >
                Clear
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {ingredients.map((ing, idx) => {
          const checked = selected.includes(ing);

          return (
            <TouchableOpacity
              key={`${ing}-${idx}`}
              style={styles.ingredientRow}
              onPress={() => toggleOne(ing)}
              activeOpacity={0.85}
            >
              <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                {checked ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : null}
              </View>

              <Text style={styles.ingredientText}>{ing}</Text>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.sectionSteps}>Steps</Text>
        {recipe.steps?.map((step, idx) => (
          <View key={`${step}-${idx}`} style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{idx + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF0F3" },
  content: { paddingBottom: 30 },

  backBtn: {
    position: "absolute",
    zIndex: 10,
    top: 35,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "#F7D9E0",
    alignItems: "center",
    justifyContent: "center",
  },

  favBtn: {
    position: "absolute",
    zIndex: 10,
    top: 35,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "#F7D9E0",
    alignItems: "center",
    justifyContent: "center",
  },

  image: { width: "100%", height: 420 },

  headerRow: { paddingHorizontal: 16, paddingTop: 14 },
  title: { fontSize: 24, fontWeight: "900", color: "#5A2A2A" },
  timeRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  time: { marginLeft: 6, color: "#B5838D", fontWeight: "700" },

  addBtn: {
    marginTop: 14,
    marginHorizontal: 16,
    backgroundColor: "#E5989B",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F7D9E0",
  },
  addBtnDisabled: {
    opacity: 0.6,
  },
  addBtnDone: {
    backgroundColor: "#F4B6C2",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "900",
    marginLeft: 10,
    fontSize: 13,
  },

  sectionHeader: {
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  section: {
    fontSize: 16,
    fontWeight: "900",
    color: "#E5989B",
  },
  actions: { flexDirection: "row", alignItems: "center" },
  actionText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#5A2A2A",
    textDecorationLine: "underline",
  },
  actionDisabled: { opacity: 0.35, textDecorationLine: "none" },
  dot: { marginHorizontal: 8, color: "#B5838D", fontWeight: "900" },

  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#E5989B",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0F3",
  },
  checkboxChecked: { backgroundColor: "#E5989B" },
  ingredientText: { flex: 1, color: "#5A2A2A", fontWeight: "600" },

  sectionSteps: {
    marginTop: 18,
    marginBottom: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "900",
    color: "#E5989B",
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 9,
    backgroundColor: "#E5989B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
  },
  stepNumText: { color: "#fff", fontWeight: "900", fontSize: 12 },
  stepText: { flex: 1, color: "#5A2A2A", fontWeight: "600", lineHeight: 20 },
});
