import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={focused ? colors.rose : colors.muted}
            />
          ),
        }}
      />

      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={focused ? colors.rose : colors.muted}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AddRecipeTab"
        component={AddRecipeScreen}
        options={{
          tabBarIcon: () => <PlusButton />,
        }}
      />

      <Tab.Screen
        name="ShoppingTab"
        component={ShoppingListScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={size}
              color={focused ? colors.rose : colors.muted}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={focused ? colors.rose : colors.muted}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function PlusButton() {
  return (
    <View style={styles.plusWrap}>
      <TouchableOpacity style={styles.plusBtn} activeOpacity={0.85}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const colors = {
  bg: "#FFF0F3",
  rose: "#E5989B",
  soft: "#F4B6C2",
  muted: "#B5838D",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: "#F7D9E0",
  },
  plusWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    marginTop: -26,
  },
  plusBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.rose,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderWidth: 3,
    borderColor: colors.white,
  },
});
