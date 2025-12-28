import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { addUserRecipe } from "../storage/storage";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=60";

export default function AddRecipeScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [pickedUri, setPickedUri] = useState(null);
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");

  const pickFromGallery = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow photo access to pick an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });

    if (result.canceled) return;

    const uri = result.assets?.[0]?.uri;
    if (uri) setPickedUri(uri);
  };

  const onSave = async () => {
    const t = title.trim();
    if (!t) {
      Alert.alert("Missing title", "Please enter a recipe title.");
      return;
    }

    const ingredients = ingredientsText
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const steps = stepsText
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const recipe = {
      id: "u_" + Date.now(),
      title: t,
      time: time.trim() || "—",
      image: pickedUri || DEFAULT_IMAGE, // ✅ optional photo
      ingredients,
      steps,
      isUser: true,
    };

    await addUserRecipe(recipe);

    // reset for "Add another"
    setTitle("");
    setTime("");
    setPickedUri(null);
    setIngredientsText("");
    setStepsText("");

    Alert.alert("Recipe added! ✅", "Your recipe has been saved successfully.", [
      { text: "Add another", style: "default" },
      { text: "View in Home", onPress: () => navigation.navigate("HomeTab") },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Add Recipe</Text>
      <Text style={styles.sub}>share your cozy creation 💗</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Photo (optional)</Text>

        <View style={styles.imageRow}>
          <View style={styles.previewWrap}>
            <Image
              source={{ uri: pickedUri || DEFAULT_IMAGE }}
              style={styles.preview}
            />
            {pickedUri ? (
              <TouchableOpacity
                style={styles.removeImgBtn}
                onPress={() => setPickedUri(null)}
                activeOpacity={0.85}
              >
                <Ionicons name="close" size={14} color="#fff" />
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.pickBtn}
              onPress={pickFromGallery}
              activeOpacity={0.9}
            >
              <Ionicons name="images-outline" size={18} color="#fff" />
              <Text style={styles.pickBtnText}>Choose from gallery</Text>
            </TouchableOpacity>

            <Text style={styles.hint}>
              If you skip, we’ll use a default photo ✨
            </Text>
          </View>
        </View>

        <Input
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Pink Pasta"
        />
        <Input
          label="Time"
          value={time}
          onChangeText={setTime}
          placeholder="25 min"
        />

        <InputArea
          label="Ingredients (one per line)"
          value={ingredientsText}
          onChangeText={setIngredientsText}
          placeholder={"200g pasta\n1 cup cream\nSalt"}
        />

        <InputArea
          label="Steps (one per line)"
          value={stepsText}
          onChangeText={setStepsText}
          placeholder={"Boil pasta\nAdd sauce\nServe"}
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={onSave}
          activeOpacity={0.9}
        >
          <Ionicons name="checkmark" size={18} color="#fff" />
          <Text style={styles.saveText}>Save Recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Input({ label, ...props }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#B5838D"
      />
    </View>
  );
}

function InputArea({ label, ...props }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={[styles.input, { height: 110, textAlignVertical: "top" }]}
        placeholderTextColor="#B5838D"
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF0F3", paddingHorizontal: 16 },
  header: {
    fontSize: 26,
    fontWeight: "900",
    color: "#E5989B",
    textAlign: "center",
    marginTop: 18,
  },
  sub: {
    textAlign: "center",
    color: "#B5838D",
    fontWeight: "700",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    padding: 16,
  },
  label: { fontSize: 12, fontWeight: "800", color: "#5A2A2A", marginBottom: 6 },

  imageRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  previewWrap: {
    width: 110,
    height: 86,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F7D9E0",
    backgroundColor: "#fff",
    position: "relative",
  },
  preview: { width: "100%", height: "100%" },
  removeImgBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 10,
    backgroundColor: "#E5989B",
    alignItems: "center",
    justifyContent: "center",
  },
  pickBtn: {
    backgroundColor: "#E5989B",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "#F7D9E0",
  },
  pickBtnText: { color: "#fff", fontWeight: "900", fontSize: 13 },
  hint: { marginTop: 8, color: "#B5838D", fontWeight: "700", fontSize: 12 },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#5A2A2A",
    fontWeight: "700",
  },
  saveBtn: {
    marginTop: 12,
    backgroundColor: "#E5989B",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  saveText: { color: "#fff", fontWeight: "900" },
});
