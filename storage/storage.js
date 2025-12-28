import AsyncStorage from "@react-native-async-storage/async-storage";

/* ===================== KEYS ===================== */
const FAVORITES_KEY = "favorites_v1";
const SHOPPING_KEY = "shopping_v1";
const USER_KEY = "user_v1";
const USER_RECIPES_KEY = "user_recipes_v1";

/* ===================== FAVORITES ===================== */
export async function getFavoriteIds() {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export async function setFavoriteIds(ids) {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (e) {
    // ignore for now
  }
}

export async function toggleFavoriteId(id) {
  const ids = await getFavoriteIds();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  await setFavoriteIds(next);
  return next;
}

export async function clearFavorites() {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
    return [];
  } catch (e) {
    return [];
  }
}

/* ===================== SHOPPING LIST ===================== */
export async function getShoppingItems() {
  try {
    const raw = await AsyncStorage.getItem(SHOPPING_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export async function setShoppingItems(items) {
  try {
    await AsyncStorage.setItem(SHOPPING_KEY, JSON.stringify(items));
  } catch (e) {}
}

export async function addShoppingItem(text) {
  const t = (text || "").trim();
  if (!t) return await getShoppingItems();

  const items = await getShoppingItems();
  const newItem = {
    id: String(Date.now()),
    text: t,
    done: false,
    createdAt: Date.now(),
  };
  const next = [newItem, ...items];
  await setShoppingItems(next);
  return next;
}

export async function addShoppingItems(texts) {
  const items = await getShoppingItems();

  const cleaned = (texts || [])
    .map((t) => String(t || "").trim())
    .filter(Boolean);

  if (cleaned.length === 0) return items;

  // Aynı item varsa tekrar ekleme (case-insensitive)
  const existingLower = new Set(items.map((x) => x.text.toLowerCase()));

  const newOnes = cleaned
    .filter((t) => !existingLower.has(t.toLowerCase()))
    .map((t) => ({
      id: String(Date.now()) + "_" + Math.random().toString(16).slice(2),
      text: t,
      done: false,
      createdAt: Date.now(),
    }));

  const next = [...newOnes, ...items];
  await setShoppingItems(next);
  return next;
}

export async function toggleShoppingItem(id) {
  const items = await getShoppingItems();
  const next = items.map((it) =>
    it.id === id ? { ...it, done: !it.done } : it
  );
  await setShoppingItems(next);
  return next;
}

export async function removeShoppingItem(id) {
  const items = await getShoppingItems();
  const next = items.filter((it) => it.id !== id);
  await setShoppingItems(next);
  return next;
}

export async function clearShoppingDone() {
  const items = await getShoppingItems();
  const next = items.filter((it) => !it.done);
  await setShoppingItems(next);
  return next;
}

export async function clearShopping() {
  try {
    await AsyncStorage.setItem(SHOPPING_KEY, JSON.stringify([]));
    return [];
  } catch (e) {
    return [];
  }
}

/* ===================== USER (LOGIN) ===================== */
export async function setUser(user) {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return true;
  } catch (e) {
    return false;
  }
}

export async function getUser() {
  try {
    const raw = await AsyncStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export async function clearUser() {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

/* ===================== USER RECIPES (ADD RECIPE) ===================== */
export async function getUserRecipes() {
  try {
    const raw = await AsyncStorage.getItem(USER_RECIPES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export async function addUserRecipe(recipe) {
  const list = await getUserRecipes();
  const next = [recipe, ...list];
  try {
    await AsyncStorage.setItem(USER_RECIPES_KEY, JSON.stringify(next));
    return next;
  } catch (e) {
    return list;
  }
}
export async function deleteUserRecipe(id) {
  try {
    const raw = await AsyncStorage.getItem(USER_RECIPES_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const safeList = Array.isArray(list) ? list : [];

    const next = safeList.filter((r) => String(r?.id) !== String(id));

    await AsyncStorage.setItem(USER_RECIPES_KEY, JSON.stringify(next));
    return next;
  } catch (e) {
    return await getUserRecipes();
  }
}
const AVATAR_KEY = "avatar_index_v1";

export async function setAvatarIndex(index) {
  try {
    await AsyncStorage.setItem(AVATAR_KEY, String(index));
    return true;
  } catch (e) {
    return false;
  }
}

export async function getAvatarIndex() {
  try {
    const raw = await AsyncStorage.getItem(AVATAR_KEY);
    if (raw === null) return null;
    return Number(raw);
  } catch (e) {
    return null;
  }
}

