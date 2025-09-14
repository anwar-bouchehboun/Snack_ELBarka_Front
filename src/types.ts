// Types pour l'application POS
export interface Product {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  category: string;
  image: string;
}

export interface NewProductForm {
  name: string;
  nameAr: string;
  price: string;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderData {
  id: number;
  customerName: string;
  items: CartItem[];
  total: number;
  date: string;
}

export type Language = 'fr' | 'ar';
export type TabType = 'pos' | 'products' | 'orders';
