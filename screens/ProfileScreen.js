import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import {
  getFavoriteIds,
  getShoppingItems,
  clearFavorites,
  clearShopping,
  getUser,
  clearUser,
} from "../storage/storage";

export default function ProfileScreen({ navigation }) {
  const [user, setUserState] = useState(null);
  const [favCount, setFavCount] = useState(0);
  const [shopCount, setShopCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      (async () => {
        const u = await getUser();
        const favs = await getFavoriteIds();
        const shop = await getShoppingItems();

        if (mounted) {
          setUserState(u);
          setFavCount(favs.length);
          setShopCount(shop.length);
        }
      })();

      return () => {
        mounted = false;
      };
    }, [])
  );

  const onClearFavorites = () => {
    Alert.alert("Clear favorites?", "This will remove all saved favorites.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await clearFavorites();
          setFavCount(0);
        },
      },
    ]);
  };

  const onClearShopping = () => {
    Alert.alert(
      "Clear shopping list?",
      "This will remove all items in your shopping list.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearShopping();
            setShopCount(0);
          },
        },
      ]
    );
  };

  const onLogout = () => {
    Alert.alert("Log out?", "You will return to the login screen.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await clearUser();
          navigation.replace("Login");
        },
      },
    ]);
  };

  const displayName = user?.name || "Guest";
  const displayEmail = user?.email || "guest@example.com";

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.sub}>your cozy space 💗</Text>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={26} color="#fff" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{displayEmail}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{favCount}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNum}>{shopCount}</Text>
          <Text style={styles.statLabel}>Shopping</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.action}
        onPress={onClearFavorites}
        activeOpacity={0.85}
      >
        <Ionicons name="heart-dislike-outline" size={18} color="#B5838D" />
        <Text style={styles.actionText}>Clear Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.action}
        onPress={onClearShopping}
        activeOpacity={0.85}
      >
        <Ionicons name="trash-outline" size={18} color="#B5838D" />
        <Text style={styles.actionText}>Clear Shopping List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.logout, { marginTop: 16 }]}
        onPress={onLogout}
        activeOpacity={0.9}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>RecipeNest ✨</Text>
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
    marginTop: 10,
  },
  sub: {
    fontSize: 13,
    color: "#B5838D",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
    fontWeight: "700",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    padding: 14,
    marginTop: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: "#E5989B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  name: { fontSize: 16, fontWeight: "900", color: "#5A2A2A" },
  email: {
    fontSize: 12,
    fontWeight: "700",
    color: "#B5838D",
    marginTop: 2,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 12,
  },
  statBox: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    paddingVertical: 16,
    alignItems: "center",
  },
  statNum: { fontSize: 22, fontWeight: "900", color: "#E5989B" },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "800",
    color: "#B5838D",
  },

  action: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F7D9E0",
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  actionText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: "800",
    color: "#5A2A2A",
  },

  logout: {
    backgroundColor: "#E5989B",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F7D9E0",
  },
  logoutText: { color: "#fff", fontWeight: "900" },

  footer: {
    marginTop: 20,
    textAlign: "center",
    color: "#B5838D",
    fontWeight: "700",
  },
});
