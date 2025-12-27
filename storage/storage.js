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
