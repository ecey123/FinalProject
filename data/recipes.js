export const recipes = [
  {
    id: "1",
    title: "Strawberry Pancakes",
    time: "20 min",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=60",
    ingredients: [
      "1 cup flour",
      "1 egg",
      "1 cup milk",
      "1 tbsp sugar",
      "1 tsp baking powder",
      "Strawberries",
    ],
    steps: [
      "Mix dry ingredients in a bowl.",
      "Add egg and milk, whisk until smooth.",
      "Cook on a non-stick pan until golden.",
      "Top with strawberries and serve.",
    ],
  },
  {
    id: "2",
    title: "Pink Pasta",
    time: "25 min",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=60",
    ingredients: [
      "Pasta",
      "1 cup tomato sauce",
      "2 tbsp cream",
      "1 tbsp butter",
      "Salt & pepper",
      "Parmesan (optional)",
    ],
    steps: [
      "Boil pasta until al dente.",
      "Warm tomato sauce with butter.",
      "Add cream and mix to get a pink sauce.",
      "Combine pasta with sauce, season, serve.",
    ],
  },
  {
    id: "3",
    title: "Berry Smoothie",
    time: "10 min",
    image:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=60",
    ingredients: ["Mixed berries", "1 banana", "1 cup yogurt", "Honey (optional)"],
    steps: [
      "Add all ingredients to a blender.",
      "Blend until creamy.",
      "Serve chilled.",
    ],
  },
  {
    id: "4",
    title: "Avocado Toast",
    time: "12 min",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=60",
    ingredients: ["Bread slices", "1 avocado", "Salt", "Lemon", "Chili flakes"],
    steps: [
      "Toast the bread.",
      "Mash avocado with salt and lemon.",
      "Spread on toast and add chili flakes.",
    ],
  },
  {
    id: "5",
    title: "Chocolate Waffles",
    time: "18 min",
    image:
      "https://images.unsplash.com/photo-1514516430035-0c2b1f0f6a3b?auto=format&fit=crop&w=800&q=60",
    ingredients: [
      "Waffle mix",
      "Milk",
      "Egg",
      "Cocoa powder",
      "Chocolate chips",
    ],
    steps: [
      "Mix all ingredients until smooth.",
      "Pour batter into waffle maker.",
      "Cook until crisp and serve.",
    ],
  },
  {
    id: "6",
    title: "Banana Oat Pancakes",
    time: "15 min",
    image:
      "https://images.unsplash.com/photo-1587738347115-cc8c6f0b6f5f?auto=format&fit=crop&w=800&q=60",
    ingredients: [
      "1 banana",
      "1 cup oats",
      "1 egg",
      "1/2 tsp cinnamon",
    ],
    steps: [
      "Blend all ingredients.",
      "Pour small portions onto a pan.",
      "Cook both sides until golden.",
    ],
  },
  {
    id: "7",
    title: "Vanilla Cupcakes",
    time: "35 min",
    image:
      "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=60",
    ingredients: [
      "Flour",
      "Sugar",
      "Eggs",
      "Butter",
      "Vanilla extract",
    ],
    steps: [
      "Mix wet and dry ingredients.",
      "Pour into cupcake liners.",
      "Bake until lightly golden.",
    ],
  },
  {
    id: "8",
    title: "Creamy Mushroom Pasta",
    time: "30 min",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=60",
    ingredients: [
      "Pasta",
      "Mushrooms",
      "Cream",
      "Garlic",
      "Olive oil",
    ],
    steps: [
      "Cook pasta.",
      "Sauté mushrooms with garlic.",
      "Add cream and mix with pasta.",
    ],
  },
  {
    id: "9",
    title: "Blueberry Yogurt Bowl",
    time: "8 min",
    image:
      "https://images.unsplash.com/photo-1506086679525-9c8c9f02c6b1?auto=format&fit=crop&w=800&q=60",
    ingredients: [
      "Greek yogurt",
      "Blueberries",
      "Granola",
      "Honey",
    ],
    steps: [
      "Add yogurt to a bowl.",
      "Top with blueberries and granola.",
      "Drizzle with honey.",
    ],
  },
  {
    id: "10",
    title: "Cheese Omelette",
    time: "10 min",
    image:
      "https://images.unsplash.com/photo-1604908177522-4328a3f0f25b?auto=format&fit=crop&w=800&q=60",
    ingredients: ["2 eggs", "Cheese", "Salt", "Butter"],
    steps: [
      "Whisk eggs with salt.",
      "Cook eggs in butter.",
      "Add cheese, fold and serve.",
    ],
  },
];
export async function addShoppingItems(texts) {
  const items = await getShoppingItems();

  const cleaned = (texts || [])
    .map((t) => String(t || "").trim())
    .filter(Boolean);

  if (cleaned.length === 0) return items;

  // aynı item varsa tekrar ekleme (case-insensitive)
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
