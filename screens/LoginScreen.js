import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { setUser } from "../storage/storage";

export default function LoginScreen({ navigation }) {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = (v) => /\S+@\S+\.\S+/.test(v);

  const onSubmit = async () => {
    const n = name.trim();
    const e = email.trim().toLowerCase();
    const p = password;

    if (mode === "signup" && n.length < 2) {
      Alert.alert("Name required", "Please enter your name.");
      return;
    }
    if (!isEmailValid(e)) {
      Alert.alert("Invalid email", "Please enter a valid email.");
      return;
    }
    if (p.length < 4) {
      Alert.alert("Weak password", "Password must be at least 4 characters.");
      return;
    }

    // Demo auth: sadece local kaydediyoruz
    const user = {
      name: mode === "signup" ? n : (n || e.split("@")[0]),
      email: e,
    };

    await setUser(user);

    // Login sonrası MainTabs'e geç
    navigation.replace("MainTabs");
  };

  return (
   <View style={styles.container}>
  <View style={styles.card}>
    <Text style={styles.title}>RecipeNest</Text>
    <Text style={styles.sub}>cute recipes • cozy vibes 💗</Text>

    {/* switchRow + inputlar + buton burada aynı kalsın */}
  </View>

      <View style={styles.switchRow}>
        <TouchableOpacity
          style={[styles.switchBtn, mode === "signin" && styles.switchBtnActive]}
          onPress={() => setMode("signin")}
          activeOpacity={0.85}
        >
          <Text style={[styles.switchText, mode === "signin" && styles.switchTextActive]}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.switchBtn, mode === "signup" && styles.switchBtnActive]}
          onPress={() => setMode("signup")}
          activeOpacity={0.85}
        >
          <Text style={[styles.switchText, mode === "signup" && styles.switchTextActive]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {mode === "signup" && (
        <View style={styles.inputWrap}>
          <Ionicons name="person-outline" size={18} color="#B5838D" />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#B5838D"
            style={styles.input}
            autoCapitalize="words"
          />
        </View>
      )}

      <View style={styles.inputWrap}>
        <Ionicons name="mail-outline" size={18} color="#B5838D" />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#B5838D"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputWrap}>
        <Ionicons name="lock-closed-outline" size={18} color="#B5838D" />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#B5838D"
          style={styles.input}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit} activeOpacity={0.9}>
        <Text style={styles.primaryText}>{mode === "signin" ? "Sign In" : "Create Account"}</Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({

  

 container: {
  flex: 1,
  backgroundColor: "#FFF0F3",
  paddingHorizontal: 16,
  justifyContent: "center",
},

  title: { fontSize: 34, fontWeight: "900", color: "#E5989B", textAlign: "center" },
  sub: { marginTop: 6, color: "#B5838D", textAlign: "center", fontWeight: "700" },

  switchRow: {
    marginTop: 22,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    overflow: "hidden",
  },
  switchBtn: { flex: 1, paddingVertical: 12, alignItems: "center" },
  switchBtnActive: { backgroundColor: "#F4B6C2" },
  switchText: { fontWeight: "900", color: "#5A2A2A" },
  switchTextActive: { color: "#fff" },

  inputWrap: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: { flex: 1, fontSize: 14, color: "#5A2A2A", fontWeight: "700" },

  primaryBtn: {
    marginTop: 18,
    backgroundColor: "#E5989B",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F7D9E0",
  },
  primaryText: { color: "#fff", fontWeight: "900" },

  note: { marginTop: 10, textAlign: "center", color: "#B5838D", fontWeight: "700", fontSize: 12 },
});
