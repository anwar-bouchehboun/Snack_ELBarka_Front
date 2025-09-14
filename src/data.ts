import { Product } from './types';

// Données par défaut des produits avec plus de variété
export const defaultProducts: Product[] = [
  // Catégorie Café
  { id: 1, name: 'Café Noir', nameAr: 'قهوة سوداء', price: 5, category: 'Café', image: '☕' },
  { id: 2, name: 'Café au Lait', nameAr: 'قهوة بالحليب', price: 7, category: 'Café', image: '☕' },
  { id: 3, name: 'Cappuccino', nameAr: 'كابتشينو', price: 10, category: 'Café', image: '☕' },
  { id: 4, name: 'Espresso', nameAr: 'إسبريسو', price: 6, category: 'Café', image: '☕' },
  { id: 5, name: 'Latte', nameAr: 'لاتيه', price: 12, category: 'Café', image: '☕' },
  { id: 6, name: 'Café Turc', nameAr: 'قهوة تركية', price: 8, category: 'Café', image: '☕' },

  // Catégorie Boissons
  { id: 7, name: 'Coca Cola', nameAr: 'كوكا كولا', price: 8, category: 'Boissons', image: '🥤' },
  { id: 8, name: 'Fanta Orange', nameAr: 'فانتا برتقال', price: 8, category: 'Boissons', image: '🥤' },
  { id: 9, name: 'Sprite', nameAr: 'سبرايت', price: 8, category: 'Boissons', image: '🥤' },
  { id: 10, name: 'Eau Minérale', nameAr: 'ماء معدني', price: 4, category: 'Boissons', image: '💧' },
  { id: 11, name: 'Jus Orange', nameAr: 'عصير برتقال', price: 12, category: 'Boissons', image: '🍊' },
  { id: 12, name: 'Jus Pomme', nameAr: 'عصير تفاح', price: 12, category: 'Boissons', image: '🍎' },
  { id: 13, name: 'Thé à la Menthe', nameAr: 'أتاي بالنعناع', price: 6, category: 'Boissons', image: '🍵' },

  // Catégorie Sandwichs
  { id: 14, name: 'Sandwich Thon', nameAr: 'سندويش تونة', price: 15, category: 'Sandwichs', image: '🥪' },
  { id: 15, name: 'Sandwich Fromage', nameAr: 'سندويش جبن', price: 12, category: 'Sandwichs', image: '🥪' },
  { id: 16, name: 'Sandwich Poulet', nameAr: 'سندويش دجاج', price: 18, category: 'Sandwichs', image: '🥪' },
  { id: 17, name: 'Sandwich Mixte', nameAr: 'سندويش مختلط', price: 20, category: 'Sandwichs', image: '🥪' },
  { id: 18, name: 'Croque Monsieur', nameAr: 'كروك مسيو', price: 22, category: 'Sandwichs', image: '🥪' },

  // Catégorie Pâtisserie
  { id: 19, name: 'Croissant', nameAr: 'كرواسان', price: 6, category: 'Pâtisserie', image: '🥐' },
  { id: 20, name: 'Pain au Chocolat', nameAr: 'بان أو شوكولا', price: 7, category: 'Pâtisserie', image: '🥖' },
  { id: 21, name: 'Muffin Chocolat', nameAr: 'مافن شوكولاتة', price: 10, category: 'Pâtisserie', image: '🧁' },
  { id: 22, name: 'Donut', nameAr: 'دونات', price: 8, category: 'Pâtisserie', image: '🍩' },
  { id: 23, name: 'Éclair', nameAr: 'إكلير', price: 12, category: 'Pâtisserie', image: '🥧' },
  { id: 24, name: 'Tarte aux Pommes', nameAr: 'تارت التفاح', price: 15, category: 'Pâtisserie', image: '🥧' },

  // Catégorie Pizza
  { id: 25, name: 'Pizza Margherita', nameAr: 'بيتزا مارجريتا', price: 25, category: 'Pizza', image: '🍕' },
  { id: 26, name: 'Pizza 4 Fromages', nameAr: 'بيتزا 4 أجبان', price: 30, category: 'Pizza', image: '🍕' },
  { id: 27, name: 'Pizza Pepperoni', nameAr: 'بيتزا بيبيروني', price: 32, category: 'Pizza', image: '🍕' },
  { id: 28, name: 'Pizza Thon', nameAr: 'بيتزا تونة', price: 28, category: 'Pizza', image: '🍕' },
  { id: 29, name: 'Pizza Royale', nameAr: 'بيتزا رويال', price: 35, category: 'Pizza', image: '🍕' },

  // Catégorie Plats
  { id: 30, name: 'Tajine Poulet', nameAr: 'طاجين دجاج', price: 45, category: 'Plats', image: '🍲' },
  { id: 31, name: 'Couscous', nameAr: 'كسكس', price: 40, category: 'Plats', image: '🍛' },
  { id: 32, name: 'Pastilla', nameAr: 'بسطيلة', price: 35, category: 'Plats', image: '🥟' },
  { id: 33, name: 'Harira', nameAr: 'حريرة', price: 15, category: 'Plats', image: '🍜' },
  { id: 34, name: 'Salade Mixte', nameAr: 'سلطة مختلطة', price: 20, category: 'Plats', image: '🥗' },

  // Catégorie Desserts
  { id: 35, name: 'Tiramisu', nameAr: 'تيراميسو', price: 18, category: 'Desserts', image: '🍰' },
  { id: 36, name: 'Crème Brûlée', nameAr: 'كريم بروليه', price: 16, category: 'Desserts', image: '🍮' },
  { id: 37, name: 'Mousse Chocolat', nameAr: 'موس شوكولاتة', price: 14, category: 'Desserts', image: '🍫' },
  { id: 38, name: 'Fruit Salade', nameAr: 'سلطة فواكه', price: 12, category: 'Desserts', image: '🍓' },
  { id: 39, name: 'Glace Vanille', nameAr: 'آيس كريم فانيليا', price: 10, category: 'Desserts', image: '🍨' },
  { id: 40, name: 'Cheesecake', nameAr: 'تشيز كيك', price: 20, category: 'Desserts', image: '🍰' }
];
