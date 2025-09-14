import { ShoppingCart, Printer, History } from 'lucide-react';
import { OrderData } from '../types';

interface OrdersPageProps {
  orders: OrderData[];
  isRTL: boolean;
  t: any;
  onReprint: (order: OrderData) => void;
  onDuplicate: (order: OrderData) => void;
}

export const OrdersPage = ({
  orders,
  isRTL,
  t,
  onReprint,
  onDuplicate
}: OrdersPageProps) => {
  const reversedOrders = [...orders].reverse(); // Les plus récentes en premier

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{t.orderHistory}</h2>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="text-sm text-gray-600">Total commandes: </span>
              <span className="font-bold text-blue-600">{orders.length}</span>
            </div>
          </div>
        </div>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <History className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune commande trouvée</h3>
            <p className="text-gray-500">{t.noOrders}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {reversedOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* En-tête de la carte */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">
                        🧾 Commande #{order.id.toString().slice(-6)}
                      </h3>
                      <p className="text-blue-100 text-sm">
                        {new Date(order.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-blue-100 text-xs">
                        ⏰ {new Date(order.date).toLocaleTimeString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                        <span className="text-2xl font-bold">{order.total.toFixed(2)}</span>
                        <span className="text-sm"> DH</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informations client */}
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">👤</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{order.customerName}</p>
                      <p className="text-sm text-gray-500">
                        {order.items.length} article{order.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Liste des articles */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    📋 Détails de la commande
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <span className="font-medium text-gray-800 text-sm">
                            {isRTL ? item.nameAr : item.name}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.price.toFixed(2)} DH × {item.quantity}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gray-800">
                            {(item.quantity * item.price).toFixed(2)} DH
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total et actions */}
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-700">💰 {t.total}:</span>
                    <span className="text-xl font-bold text-green-600">
                      {order.total.toFixed(2)} DH
                    </span>
                  </div>
                  
                  {/* Boutons d'action */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onReprint(order)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      Réimprimer
                    </button>
                    <button
                      onClick={() => onDuplicate(order)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Dupliquer
                    </button>
                  </div>
                  
                  {/* Badge de statut */}
                  <div className="mt-3 flex justify-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                      ✅ Commande terminée
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
