import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  isRTL: boolean;
}

export const ProductGrid = ({ products, onAddToCart, isRTL }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div
          key={product.id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-105"
          onClick={() => onAddToCart(product)}
        >
          <div className="text-4xl text-center mb-2">{product.image}</div>
          <h3 className="font-semibold text-center text-sm mb-1">
            {isRTL ? product.nameAr : product.name}
          </h3>
          <p className="text-blue-600 font-bold text-center">{product.price} DH</p>
          <p className="text-xs text-gray-500 text-center">{product.category}</p>
        </div>
      ))}
    </div>
  );
};
