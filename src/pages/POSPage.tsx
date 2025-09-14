import { Plus, Minus, Trash2, Printer, Package } from 'lucide-react';
import { Product, CartItem } from '../types';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryFilter } from '../components/CategoryFilter';
import { SearchBar } from '../components/SearchBar';

interface POSPageProps {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  customerName: string;
  selectedCategory: string;
  searchTerm: string;
  isRTL: boolean;
  t: any;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onClearCart: () => void;
  onPrintReceipt: () => void;
  onCustomerNameChange: (name: string) => void;
  onCategoryChange: (category: string) => void;
  onSearchChange: (term: string) => void;
  onResetToDefault: () => void;
  categories: string[];
  getTotal: () => number;
}

export const POSPage = ({
  products,
  filteredProducts,
  cart,
  customerName,
  selectedCategory,
  searchTerm,
  isRTL,
  t,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
  onPrintReceipt,
  onCustomerNameChange,
  onCategoryChange,
  onSearchChange,
  onResetToDefault,
  categories,
  getTotal
}: POSPageProps) => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Products Section */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">
          {t.products} ({filteredProducts.length}/{products.length})
        </h2>
        
        {/* Search Bar */}
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder={t.searchProducts}
        />
        
        {/* Categories Filter */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          allText={t.all}
        />

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">{t.noProductsFound}</p>
            <p className="text-sm mt-2">
              Total produits disponibles: {products.length}
            </p>
            {products.length === 0 && (
              <button
                onClick={onResetToDefault}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                🔄 Charger les données par défaut
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="text-sm text-gray-600 mb-4">
              Affichage de {filteredProducts.length} produit(s) sur {products.length} total
            </div>
            <ProductGrid 
              products={filteredProducts}
              onAddToCart={onAddToCart}
              isRTL={isRTL}
            />
          </div>
        )}
      </div>

      {/* Cart Section */}
      <div className="lg:w-96 bg-white shadow-lg">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-bold">{t.cart}</h2>
          {/* Champ nom du client */}
          <div className="mt-3">
            <input
              type="text"
              placeholder={t.customerName}
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
        
        <div className="p-4 h-96 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">{t.empty}</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-4 p-2 border rounded">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">
                    {isRTL ? item.nameAr : item.name}
                  </h4>
                  <p className="text-xs text-gray-500">{item.price} DH</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total and Actions */}
        <div className="p-4 border-t bg-gray-50">
          <div className="text-xl font-bold mb-4">
            {t.total}: {getTotal()} DH
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPrintReceipt}
              disabled={cart.length === 0}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-2 rounded flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              {t.print}
            </button>
            <button
              onClick={onClearCart}
              disabled={cart.length === 0}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white p-2 rounded"
            >
              {t.clear}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
