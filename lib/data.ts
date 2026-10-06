export const BRAND_NAME = "ToyWorld";
export const BRAND_TAGLINE = "Where Imagination Comes to Life!";
export const BRAND_EMAIL = "hello@example.com";
export const BRAND_PHONE = "+1 (800) TOY-WORLD";
export const BRAND_ADDRESS = "123 Rainbow Road, Fun City, CA 90210";

export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Shop", href: "/shop", key: "shop" },
  { label: "About Us", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
  { label: "Cart", href: "/cart", key: "cart" },
];

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  ageGroup: string;
  brand: string;
  image: string;
  badge?: string;
  description: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  label?: string;
  icon: string;
  count: number;
  image: string;
}

export const categories: Category[] = [
  { id: "action-figures", name: "Action Figures", icon: "⚡", count: 48, image: "https://api.dicebear.com/7.x/shapes/svg?seed=action%20figure%20toy" },
  { id: "educational", name: "Educational", icon: "🎓", count: 62, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0e652b42a2fe422781c68a4ac845c7cb.jpg" },
  { id: "outdoor", name: "Outdoor & Sports", icon: "🏃", count: 35, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/1e4e8eded45c495f95526eecf4a6ffe4.jpg" },
  { id: "dolls", name: "Dolls & Plush", icon: "🧸", count: 54, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/04012280c3fb47748fabcd626c9b8730.jpg" },
  { id: "board-games", name: "Board Games", icon: "🎲", count: 41, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e4159206f14b4b18b5ab8c4cf3d650b5.jpg" },
  { id: "stem", name: "STEM Toys", icon: "🔬", count: 29, image: "https://api.dicebear.com/7.x/shapes/svg?seed=robot%20building%20kit" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Super Robot Builder Kit",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewCount: 124,
    category: "stem",
    ageGroup: "6-12",
    brand: "Melissa & Doug",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ab60691dd65e4db7960c5e8a699be35c.jpg",
    badge: "Bestseller",
    description: "Build your own programmable robot with 200+ pieces. Teaches coding basics and engineering principles.",
    inStock: true,
  },
  {
    id: "p2",
    name: "Rainbow Unicorn Plush",
    price: 24.99,
    rating: 4.9,
    reviewCount: 89,
    category: "dolls",
    ageGroup: "3-8",
    brand: "Fisher-Price",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/2880b68dae0c45949478380f36b11976.jpg",
    badge: "New",
    description: "Soft, cuddly rainbow unicorn plush toy. Perfect bedtime companion for little ones.",
    inStock: true,
  },
  {
    id: "p3",
    name: "Adventure Board Game",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.7,
    reviewCount: 67,
    category: "board-games",
    ageGroup: "7+",
    brand: "Hasbro",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e4159206f14b4b18b5ab8c4cf3d650b5.jpg",
    badge: "Sale",
    description: "Epic family adventure board game for 2-6 players. Hours of strategic fun for the whole family.",
    inStock: true,
  },
  {
    id: "p4",
    name: "Dinosaur Excavation Kit",
    price: 19.99,
    rating: 4.6,
    reviewCount: 203,
    category: "educational",
    ageGroup: "5-10",
    brand: "Melissa & Doug",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a7698fe5d6ea4e64b2845a0970bce85f.jpg",
    badge: "Popular",
    description: "Dig up real dinosaur fossils! Includes excavation tools, brush, and dino fact booklet.",
    inStock: true,
  },
  {
    id: "p5",
    name: "Outdoor Splash Pad",
    price: 44.99,
    rating: 4.5,
    reviewCount: 156,
    category: "outdoor",
    ageGroup: "2-8",
    brand: "Hasbro",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=dinosaur%20fossil%20excavation%20toy",
    description: "Giant 68-inch splash pad for endless summer fun. Easy setup, connects to any garden hose.",
    inStock: true,
  },
  {
    id: "p6",
    name: "Galaxy Action Figure Set",
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.8,
    reviewCount: 91,
    category: "action-figures",
    ageGroup: "5-12",
    brand: "Hasbro",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=action%20figure%20toy",
    badge: "Sale",
    description: "Set of 6 intergalactic heroes with accessories. Fully articulated for dynamic poses.",
    inStock: true,
  },
  {
    id: "p7",
    name: "Magnetic Tiles 100pc",
    price: 54.99,
    rating: 4.9,
    reviewCount: 312,
    category: "stem",
    ageGroup: "3-10",
    brand: "Melissa & Doug",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=splash%20pad",
    badge: "Bestseller",
    description: "100-piece magnetic building tile set. Sparks creativity and develops spatial reasoning.",
    inStock: true,
  },
  {
    id: "p8",
    name: "Baby Sensory Play Set",
    price: 22.99,
    rating: 4.7,
    reviewCount: 78,
    category: "educational",
    ageGroup: "0-3",
    brand: "Fisher-Price",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=action%20figure%20set",
    description: "Colorful sensory toys for babies. Develops motor skills and sensory awareness.",
    inStock: true,
  },
];
