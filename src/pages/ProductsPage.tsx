import { Plus, Edit, Save, X, Trash2 } from 'lucide-react';
import { Product, NewProductForm } from '../types';

interface ProductsPageProps {
  products: Product[];
  editingProduct: number | null;
  newProduct: NewProductForm;
  showAddForm: boolean;
  isRTL: boolean;
  t: any;
  onAddProduct: () => void;
  onUpdateProduct: (id: number, updatedProduct: Partial<Product>) => void;
  onDeleteProduct: (id: number) => void;
  onSetEditingProduct: (id: number | null) => void;
  onSetNewProduct: (product: NewProductForm) => void;
  onSetShowAddForm: (show: boolean) => void;
  onResetToDefault: () => void;
}

export const ProductsPage = ({
  products,
  editingProduct,
  newProduct,
  showAddForm,
  isRTL,
  t,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onSetEditingProduct,
  onSetNewProduct,
  onSetShowAddForm,
  onResetToDefault
}: ProductsPageProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t.products}</h2>
        <div className="flex gap-2">
          <button
            onClick={onResetToDefault}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            🔄 Restaurer données par défaut
          </button>
          <button
            onClick={() => onSetShowAddForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t.addProduct}
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-bold mb-4">{t.addProduct}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t.name}
              value={newProduct.name}
              onChange={(e) => onSetNewProduct({...newProduct, name: e.target.value})}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder={t.nameAr}
              value={newProduct.nameAr}
              onChange={(e) => onSetNewProduct({...newProduct, nameAr: e.target.value})}
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder={t.price}
              value={newProduct.price}
              onChange={(e) => onSetNewProduct({...newProduct, price: e.target.value})}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder={t.category}
              value={newProduct.category}
              onChange={(e) => onSetNewProduct({...newProduct, category: e.target.value})}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Emoji"
              value={newProduct.image}
              onChange={(e) => onSetNewProduct({...newProduct, image: e.target.value})}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={onAddProduct}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t.save}
            </button>
            <button
              onClick={() => onSetShowAddForm(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              {t.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map(product => (
            <div key={product.id} className="border rounded-lg p-4">
              {editingProduct === product.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    defaultValue={product.name}
                    onBlur={(e) => onUpdateProduct(product.id, { name: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                  <input
                    type="text"
                    defaultValue={product.nameAr}
                    onBlur={(e) => onUpdateProduct(product.id, { nameAr: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                  <input
                    type="number"
                    defaultValue={product.price}
                    onBlur={(e) => onUpdateProduct(product.id, { price: parseFloat(e.target.value) })}
                    className="border rounded px-2 py-1 w-full"
                  />
                  <input
                    type="text"
                    defaultValue={product.category}
                    onBlur={(e) => onUpdateProduct(product.id, { category: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                  <button
                    onClick={() => onSetEditingProduct(null)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    {t.save}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-3xl text-center mb-2">{product.image}</div>
                  <h3 className="font-bold text-center">
                    {isRTL ? product.nameAr : product.name}
                  </h3>
                  <p className="text-center text-blue-600 font-bold">{product.price} DH</p>
                  <p className="text-center text-sm text-gray-500">{product.category}</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <button
                      onClick={() => onSetEditingProduct(product.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
