# RecipeNest 
**Student Name:** Ece Yüksektepe  
**Student ID:** 220408028  

## Overview
**RecipeNest** is a cozy, Pinterest-inspired recipe app built with **React Native + Expo**.  
Users can explore recipes, favorite them, add ingredients to a shopping list, create their own recipes (with an optional photo), and manage everything with persistent local storage.

## Key Features
- Browse recipes in a cute grid layout
- Search recipes by title
- Open a recipe detail page with steps + ingredients
- Favorite / unfavorite recipes (saved locally)
- Add selected ingredients to the shopping list
- Shopping list: add items manually, mark as done, remove, clear
- Add your own recipe (optional photo URL) and delete it anytime
- Profile dashboard with user info + counts
- Select an avatar from built-in assets
- Data persistence using **AsyncStorage**
---

## Screens & What You Can Do

### 1) Login Screen
- Sign in with your name and email
- Your info is saved and shown on the Profile screen

### 2) Home Screen
- Displays recipes in a grid
- Includes a search bar to filter recipes by title
- Tap any recipe card to open the **Recipe Detail Screen**
- Favorite recipes directly from the card (heart icon)

### 3) Recipe Detail Screen
- Shows recipe image, title, time, ingredients, and step-by-step instructions
- You can:
  - Add/remove the recipe from **Favorites**
  - Select ingredients individually (Select All / Clear options)
  - Add selected ingredients to the **Shopping List**
- If the recipe was created by the user, it can be deleted from this screen

### 4) Favorites Screen
- Shows only the recipes you favorited
- Tap a recipe to open its detail page
- Unfavorite directly from the Favorites list

### 5) Add Recipe Screen
- Create your own recipe with:
  - Title, time, ingredients, steps
  - **Optional photo** (you can add a photo link; photo is optional)
- After saving, the recipe appears in:
  - Home (if you display user recipes there)
  - Profile → “My Recipes”
- User recipes can be deleted later

### 6) Shopping List Screen
- Add items manually to your shopping list
- Mark items as done, remove items, clear completed items
- Ingredients added from recipe details appear here automatically
- Shopping list is saved with AsyncStorage

### 7) Profile Screen
- Displays your saved user info (name/email)
- Shows statistics:
  - Favorites count
  - Shopping list item count
- Shows **My Recipes** section (your added recipes, with image preview)
- Avatar selection:
  - Choose an avatar from built-in asset avatars
- Actions:
  - Clear favorites
  - Clear shopping list
  - Logout

---

## Tech Stack
- **React Native** (Expo)
- **React Navigation** (Stack + Bottom Tabs)
- **AsyncStorage** for local persistence
- **Expo Vector Icons (Ionicons)**

---

## Project Structure (example)

RecipeNest/
├── App.js
├── navigation/
│ ├── AppNavigator.js
│ └── MainTabs.js
├── screens/
│ ├── LoginScreen.js
│ ├── HomeScreen.js
│ ├── FavoritesScreen.js
│ ├── RecipeDetailScreen.js
│ ├── AddRecipeScreen.js
│ ├── ShoppingListScreen.js
│ └── ProfileScreen.js
├── components/
│ ├── RecipeCard.js
│ ├── ShoppingListItem.js
│ └── EmptyStateComponent.js
├── data/
│ └── recipes.js
├── constants/
│ └── avatars.js
├── storage/
│ └── storage.js
└── assets/
└── avatar1.png
└── avatar2.png
└── avatar3.png
└── avatar4.png
└── avatar5.png
└── avatar6.png




