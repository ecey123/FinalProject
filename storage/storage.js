import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorites_v1";

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
const SHOPPING_KEY = "shopping_v1";

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

