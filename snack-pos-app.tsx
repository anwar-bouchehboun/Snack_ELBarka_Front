import { useState, useEffect } from 'react';
import { ShoppingCart, Package, History } from 'lucide-react';

// Imports des types et données
import { Product, CartItem, OrderData, NewProductForm } from './src/types';
import { defaultProducts } from './src/data';
import { translations } from './src/translations';
import { SnackLogo } from './src/components/SnackLogo';

// Import des pages
import { POSPage } from './src/pages/POSPage';
import { ProductsPage } from './src/pages/ProductsPage';
import { OrdersPage } from './src/pages/OrdersPage';

const SnackPOSApp = () => {
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');
  
  // Fonction pour charger les produits depuis localStorage
  const loadProducts = (): Product[] => {
    const savedProducts = localStorage.getItem('snack-pos-products');
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        return defaultProducts;
      }
    }
    return defaultProducts; // Utilise les nouvelles données par défaut
  };

  // Fonction pour réinitialiser les données avec les valeurs par défaut
  const resetToDefaultProducts = () => {
    setProducts(defaultProducts);
    localStorage.setItem('snack-pos-products', JSON.stringify(defaultProducts));
  };

  const [products, setProducts] = useState<Product[]>(loadProducts());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<'pos' | 'products' | 'orders'>('pos');
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState<NewProductForm>({ name: '', nameAr: '', price: '', category: '', image: '🍔' });
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Debug logging
  console.log('Total products loaded:', products.length);
  console.log('Selected category:', selectedCategory);
  console.log('Search term:', searchTerm);

  // Sauvegarder les produits dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('snack-pos-products', JSON.stringify(products));
  }, [products]);

  // Sauvegarder les commandes dans localStorage
  const saveOrder = (orderData: OrderData) => {
    const orders = JSON.parse(localStorage.getItem('snack-pos-orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('snack-pos-orders', JSON.stringify(orders));
  };

  const t = translations[language];
  const isRTL = language === 'ar';

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCart([]);
    setCustomerName('');
  };

  const printReceipt = () => {
    if (cart.length === 0) return;
    
    // Sauvegarder la commande avec plus de détails
    const orderData: OrderData = {
      id: Date.now(),
      customerName: customerName || 'Client',
      items: cart,
      total: getTotal(),
      date: new Date().toISOString(),
    };
    saveOrder(orderData);

    const printWindow = window.open('', '', 'width=400,height=700');
    if (!printWindow) return;
    
    const currentDate = new Date();
    const receiptContent = `
      <html>
        <head>
          <title>${t.receipt}</title>
          <meta charset="UTF-8">
          <style>
            @page { 
              margin: 3mm; 
              size: 80mm auto;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body { 
              font-family: 'Arial', 'Courier New', sans-serif; 
              font-size: 12px; 
              line-height: 1.3;
              color: #000;
              width: 72mm;
              margin: 0 auto;
              padding: 8px;
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            /* Optimisation pour impression papier */
            @media print {
              body {
                font-size: 11px;
                width: 75mm;
                padding: 5mm;
              }
              .logo {
                background: #1565c0 !important;
                -webkit-print-color-adjust: exact;
              }
              .header {
                page-break-inside: avoid;
              }
              .items-section {
                page-break-inside: avoid;
              }
              .total-section {
                page-break-inside: avoid;
              }
              .thanks {
                background: #e8f5e8 !important;
                border: 2px solid #4caf50 !important;
                -webkit-print-color-adjust: exact;
              }
              .order-info {
                background: #f8f9fa !important;
                border: 1px solid #ddd !important;
                -webkit-print-color-adjust: exact;
              }
              .customer-info {
                background: #e3f2fd !important;
                border-left: 4px solid #2196f3 !important;
                -webkit-print-color-adjust: exact;
              }
            }
            
            /* Header avec logo - Optimisé pour papier */
            .header { 
              text-align: center; 
              border-bottom: 3px double #000; 
              padding-bottom: 12px; 
              margin-bottom: 12px;
              page-break-after: avoid;
            }
            .logo {
              width: 55px;
              height: 55px;
              background: linear-gradient(135deg, #1565c0, #0d47a1);
              border-radius: 50%;
              margin: 0 auto 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 26px;
              border: 2px solid #0d47a1;
              color: white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            }
            .business-name {
              font-size: 17px;
              font-weight: bold;
              margin-bottom: 4px;
              letter-spacing: 0.5px;
              text-transform: uppercase;
            }
            .business-subtitle {
              font-size: 10px;
              color: #333;
              font-style: italic;
              margin-bottom: 6px;
              font-weight: 500;
            }
            .contact-info {
              font-size: 9px;
              color: #444;
              margin-bottom: 8px;
              line-height: 1.4;
            }
            
            /* Informations de commande - Version papier */
            .order-info {
              background: #f8f9fa;
              padding: 8px;
              margin: 8px 0;
              border-radius: 4px;
              border: 1px solid #ccc;
              page-break-inside: avoid;
            }
            .order-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
              font-weight: bold;
              font-size: 11px;
            }
            .order-details {
              font-size: 9px;
              color: #555;
              line-height: 1.3;
            }
            
            /* Client - Style papier */
            .customer-info {
              background: #e3f2fd;
              padding: 6px;
              margin: 8px 0;
              border-radius: 4px;
              text-align: center;
              border-left: 3px solid #1976d2;
              page-break-inside: avoid;
            }
            .customer-label {
              font-weight: bold;
              color: #0d47a1;
              font-size: 10px;
            }
            
            /* Articles - Optimisé impression */
            .items-section {
              margin: 10px 0;
              page-break-inside: avoid;
            }
            .items-header {
              background: #e0e0e0;
              padding: 4px;
              font-weight: bold;
              text-align: center;
              border: 1px solid #bbb;
              font-size: 10px;
              margin-bottom: 5px;
            }
            .item { 
              display: flex; 
              justify-content: space-between; 
              margin: 6px 0;
              padding: 4px 0;
              border-bottom: 1px dotted #999;
              align-items: flex-start;
            }
            .item:last-child {
              border-bottom: 2px solid #333;
            }
            .item-left {
              flex: 1;
            }
            .item-name {
              font-weight: bold;
              font-size: 11px;
              line-height: 1.2;
            }
            .item-details {
              font-size: 9px;
              color: #555;
              margin-top: 1px;
            }
            .item-price {
              font-weight: bold;
              font-size: 11px;
              min-width: 55px;
              text-align: right;
              margin-left: 8px;
            }
            
            /* Total - Version impression papier */
            .total-section { 
              border-top: 3px double #000; 
              padding: 8px; 
              margin-top: 10px; 
              background: #f8f9fa;
              border-radius: 4px;
              page-break-inside: avoid;
            }
            .total-line {
              display: flex;
              justify-content: space-between;
              margin: 4px 0;
              font-size: 13px;
              font-weight: bold;
            }
            .total-amount {
              font-size: 15px;
              color: #2e7d32;
              font-weight: 900;
            }
            
            /* Message de remerciement - Style papier */
            .thanks { 
              text-align: center; 
              margin: 15px 0 10px;
              padding: 10px;
              background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
              border-radius: 6px;
              border: 2px solid #4caf50;
              page-break-inside: avoid;
            }
            .thanks-text {
              font-weight: bold;
              color: #1b5e20;
              font-size: 12px;
            }
            .thanks-subtitle {
              font-size: 9px;
              color: #2e7d32;
              margin-top: 3px;
              font-style: italic;
            }
            
            /* Pied de page - Optimisé papier */
            .footer {
              text-align: center;
              margin-top: 12px;
              padding-top: 8px;
              border-top: 1px solid #999;
              font-size: 8px;
              color: #555;
              page-break-inside: avoid;
            }
            .footer-slogan {
              font-style: italic;
              margin-bottom: 4px;
              font-weight: 500;
            }
            .social-info {
              margin-top: 6px;
              line-height: 1.3;
            }
            
            /* ID de commande - Version papier */
            .order-id {
              text-align: center;
              margin-top: 10px;
              font-size: 7px;
              color: #777;
              font-family: 'Courier New', monospace;
              background: #f0f0f0;
              padding: 4px;
              border-radius: 2px;
              border: 1px solid #ddd;
              line-height: 1.3;
            }
            
            /* Séparateurs décoratifs */
            .separator {
              text-align: center;
              margin: 8px 0;
              font-size: 14px;
              color: #666;
            }
            
            /* Amélioration contraste pour impression */
            .high-contrast {
              color: #000 !important;
              font-weight: bold;
            }
          </style>
        </head>
        <body dir="${isRTL ? 'rtl' : 'ltr'}">
          <!-- En-tête avec logo professionnel -->
          <div class="header">
            <div class="logo">🥪</div>
            <div class="business-name">${t.snackName}</div>
            <div class="business-subtitle">*** Restaurant & Snack Premium ***</div>
            <div class="contact-info">
              📍 123 Rue Mohammed V, Casablanca<br>
              📞 +212 522 123 456 | 📧 contact@al-barakah.ma<br>
              🌐 www.snack-albarakah.ma
            </div>
          </div>
          
          <!-- Séparateur décoratif -->
          <div class="separator">═══════════════════════════</div>
          
          <!-- Informations de commande détaillées -->
          <div class="order-info">
            <div class="order-header">
              <span class="high-contrast">N° ${orderData.id.toString().slice(-6)}</span>
              <span class="high-contrast">${currentDate.toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-FR')}</span>
            </div>
            <div class="order-details">
              ⏰ Heure: ${currentDate.toLocaleTimeString(language === 'ar' ? 'ar-MA' : 'fr-FR')}<br>
              👤 Caissier: Admin | 🏪 Terminal: POS-001<br>
              📊 Mode: ${customerName ? 'Service Client' : 'Vente Directe'}
            </div>
          </div>
          
          ${customerName ? `
            <div class="customer-info">
              <span class="customer-label">👤 ${t.customer}:</span><br>
              <strong class="high-contrast">${customerName}</strong><br>
              <small>Merci de votre confiance</small>
            </div>
          ` : ''}
          
          <!-- Séparateur articles -->
          <div class="separator">• • • • • • • • • • • • • • • • • • • • • • • • •</div>
          
          <!-- Articles avec style professionnel -->
          <div class="items-section">
            <div class="items-header">📋 DÉTAIL DE VOTRE COMMANDE</div>
            ${cart.map((item, index) => `
              <div class="item">
                <div class="item-left">
                  <div class="item-name">${index + 1}. ${isRTL ? item.nameAr : item.name}</div>
                  <div class="item-details">Prix unitaire: ${item.price.toFixed(2)} DH × ${item.quantity} pièce${item.quantity > 1 ? 's' : ''}</div>
                </div>
                <div class="item-price high-contrast">${(item.price * item.quantity).toFixed(2)} DH</div>
              </div>
            `).join('')}
          </div>
          
          <!-- Séparateur total -->
          <div class="separator">═══════════════════════════</div>
          
          <!-- Total avec TVA -->
          <div class="total-section">
            <div style="display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 4px;">
              <span>Sous-total HT:</span>
              <span>${(getTotal() / 1.2).toFixed(2)} DH</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 6px;">
              <span>TVA (20%):</span>
              <span>${(getTotal() - (getTotal() / 1.2)).toFixed(2)} DH</span>
            </div>
            <div class="total-line">
              <span class="high-contrast">💰 TOTAL TTC:</span>
              <span class="total-amount high-contrast">${getTotal().toFixed(2)} DH</span>
            </div>
          </div>
          
          <!-- Message de remerciement personnalisé -->
          <div class="thanks">
            <div class="thanks-text">🙏 ${t.thanks}</div>
            <div class="thanks-subtitle">
              ${customerName ? `Merci ${customerName} pour votre visite` : 'Votre satisfaction est notre priorité'}
            </div>
            <div style="font-size: 8px; margin-top: 4px; color: #2e7d32;">
              ⭐ N'hésitez pas à nous laisser un avis ⭐
            </div>
          </div>
          
          <!-- Séparateur final -->
          <div class="separator">~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~</div>
          
          <!-- Pied de page complet -->
          <div class="footer">
            <div class="footer-slogan">🌟 "La qualité dans chaque bouchée" 🌟</div>
            <div style="margin: 4px 0; font-weight: bold;">
              Informations légales
            </div>
            <div>N° TVA: 123456789 | RC: 987654321</div>
            <div>IF: 98765432 | CNSS: 1122334455</div>
            <div class="social-info">
              📱 Facebook: SnackAlBarakah<br>
              📸 Instagram: @snack_albarakah<br>
              🎯 TikTok: @snackalbarakah
            </div>
            <div style="margin-top: 6px; font-size: 7px; font-style: italic;">
              Livraison disponible via Glovo & Jumia Food
            </div>
          </div>
          
          <!-- Séparateur sécurité -->
          <div class="separator">▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼</div>
          
          <!-- ID de commande sécurisé -->
          <div class="order-id">
            🔐 ID Transaction: ${orderData.id}<br>
            📅 Timestamp: ${currentDate.toISOString().slice(0, 19)}<br>
            💾 Sauvegarde: Automatique ✅<br>
            🔒 Hash: ${orderData.id.toString(16).toUpperCase().slice(-8)}
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    
    // Attendre que le contenu soit chargé avant d'imprimer
    setTimeout(() => {
      printWindow.print();
      // Vider le panier après impression réussie
      clearCart();
    }, 500);
  };

  // Fonction pour réimprimer une commande existante sans modifier le panier
  const printOrderReceipt = (order: OrderData) => {
    const printWindow = window.open('', '', 'width=400,height=700');
    if (!printWindow) return;
    
    const orderDate = new Date(order.date);
    const receiptContent = `
      <html>
        <head>
          <title>Réimpression - ${t.receipt}</title>
          <meta charset="UTF-8">
          <style>
            @page { 
              margin: 3mm; 
              size: 80mm auto;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body { 
              font-family: 'Arial', 'Courier New', sans-serif; 
              font-size: 12px; 
              line-height: 1.3;
              color: #000;
              width: 72mm;
              margin: 0 auto;
              padding: 8px;
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .header { 
              text-align: center; 
              border-bottom: 3px double #000; 
              padding-bottom: 12px; 
              margin-bottom: 12px;
            }
            .logo {
              width: 55px;
              height: 55px;
              background: linear-gradient(135deg, #1565c0, #0d47a1);
              border-radius: 50%;
              margin: 0 auto 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 26px;
              border: 2px solid #0d47a1;
              color: white;
            }
            .business-name {
              font-size: 17px;
              font-weight: bold;
              margin-bottom: 4px;
              letter-spacing: 0.5px;
              text-transform: uppercase;
            }
            .reprint-badge {
              background: #ff9800;
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 10px;
              font-weight: bold;
              margin: 8px 0;
              display: inline-block;
            }
            .items { 
              margin: 12px 0; 
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
              padding: 8px 0;
            }
            .item { 
              display: flex; 
              justify-content: space-between; 
              margin: 4px 0; 
              padding: 2px 0;
              border-bottom: 1px dotted #ccc;
            }
            .item:last-child {
              border-bottom: none;
            }
            .total { 
              font-weight: bold; 
              font-size: 14px; 
              text-align: center; 
              margin: 12px 0; 
              padding: 8px;
              background: #f5f5f5;
              border: 2px solid #333;
            }
            .thanks { 
              text-align: center; 
              margin-top: 12px; 
              padding: 8px;
              background: #e8f5e8;
              border: 2px solid #4caf50;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🍿</div>
            <div class="business-name">SNACK POS</div>
            <div class="business-subtitle">Système de Point de Vente</div>
            <div class="reprint-badge">RÉIMPRESSION</div>
          </div>
          
          <div style="text-align: center; margin: 8px 0; font-size: 11px;">
            <div><strong>📅 ${t.date}:</strong> ${orderDate.toLocaleDateString('fr-FR')}</div>
            <div><strong>🕐 Heure:</strong> ${orderDate.toLocaleTimeString('fr-FR')}</div>
            <div><strong>👤 Client:</strong> ${order.customerName}</div>
            <div><strong>🧾 Commande:</strong> #${order.id.toString().slice(-6)}</div>
          </div>
          
          <div class="items">
            <div style="font-weight: bold; text-align: center; margin-bottom: 8px; border-bottom: 1px solid #333; padding-bottom: 4px;">
              📋 DÉTAILS DE LA COMMANDE
            </div>
            ${order.items.map(item => `
              <div class="item">
                <div>
                  <div style="font-weight: bold;">${isRTL ? item.nameAr : item.name}</div>
                  <div style="font-size: 10px; color: #666;">${item.price.toFixed(2)} DH × ${item.quantity}</div>
                </div>
                <div style="font-weight: bold;">${(item.quantity * item.price).toFixed(2)} DH</div>
              </div>
            `).join('')}
          </div>
          
          <div class="total">
            💰 ${t.total}: ${order.total.toFixed(2)} DH
          </div>
          
          <div class="thanks">
            <div style="font-weight: bold; margin-bottom: 4px;">🙏 Merci pour votre visite !</div>
            <div style="font-size: 10px;">À bientôt chez SNACK POS</div>
          </div>
          
          <div style="text-align: center; margin-top: 12px; font-size: 10px; color: #666;">
            <div>🔄 Document réimprimé le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    
    // Attendre que le contenu soit chargé avant d'imprimer
    setTimeout(() => {
      printWindow.print();
      // Ne pas fermer automatiquement pour permettre de garder le reçu ouvert
    }, 500);
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        nameAr: newProduct.nameAr || newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        image: newProduct.image
      };
      const updatedProducts = [...products, product];
      setProducts(updatedProducts);
      setNewProduct({ name: '', nameAr: '', price: '', category: '', image: '🍔' });
      setShowAddForm(false);
    }
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    const updatedProducts = products.map(p => p.id === id ? { ...p, ...updatedProduct } : p);
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    setCart(cart.filter(item => item.id !== id));
  };

  const categories = [...new Set(products.map(p => p.category))];
  
  // Filtrer les produits par catégorie et recherche
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nameAr.includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Debug logging pour les produits filtrés
  console.log('Filtered products count:', filteredProducts.length);
  console.log('First 3 filtered products:', filteredProducts.slice(0, 3));

  // Fonction pour obtenir l'historique des commandes
  const getOrderHistory = (): OrderData[] => {
    const orders = localStorage.getItem('snack-pos-orders');
    return orders ? JSON.parse(orders) : [];
  };

  // Fonction pour vider l'historique des commandes
  const clearOrderHistory = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer tout l\'historique des commandes ?')) {
      localStorage.removeItem('snack-pos-orders');
      alert('Historique des commandes supprimé !');
    }
  };

  // Fonction pour obtenir les statistiques du stockage local
  const getStorageStats = () => {
    const orders = getOrderHistory();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      storageSize: new Blob([JSON.stringify(orders)]).size / 1024 // KB
    };
  };

  return (
    <div className={`min-h-screen bg-gray-100 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <SnackLogo size="md" />
            <h1 className="text-2xl font-bold">{t.snackName}</h1>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'fr' | 'ar')}
              className="bg-blue-500 text-white border border-blue-400 rounded px-2 py-1"
            >
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setActiveTab('pos')}
            className={`flex items-center gap-2 px-4 py-2 rounded ${activeTab === 'pos' ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`}
          >
            <ShoppingCart className="w-4 h-4" />
            {t.pos}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`}
          >
            <Package className="w-4 h-4" />
            {t.products}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`}
          >
            <History className="w-4 h-4" />
            {t.orderHistory}
          </button>
        </div>
      </div>

      {/* POS Tab */}
      {activeTab === 'pos' && (
        <POSPage
          products={products}
          filteredProducts={filteredProducts}
          cart={cart}
          customerName={customerName}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          isRTL={isRTL}
          t={t}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClearCart={clearCart}
          onPrintReceipt={printReceipt}
          onCustomerNameChange={setCustomerName}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchTerm}
          onResetToDefault={resetToDefaultProducts}
          categories={categories}
          getTotal={getTotal}
        />
      )}

      {/* Products Management Tab */}
      {activeTab === 'products' && (
        <ProductsPage
          products={products}
          editingProduct={editingProduct}
          newProduct={newProduct}
          showAddForm={showAddForm}
          isRTL={isRTL}
          t={t}
          onAddProduct={addProduct}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
          onSetEditingProduct={setEditingProduct}
          onSetNewProduct={setNewProduct}
          onSetShowAddForm={setShowAddForm}
          onResetToDefault={resetToDefaultProducts}
        />
      )}

      {/* Orders History Tab */}
      {activeTab === 'orders' && (
        <OrdersPage
          orders={getOrderHistory()}
          isRTL={isRTL}
          t={t}
          storageStats={getStorageStats()}
          onReprint={(order) => {
            // Réimpression directe sans modifier le panier actuel
            printOrderReceipt(order);
          }}
          onDuplicate={(order) => {
            const orderItems = order.items.map(item => ({...item}));
            setCart(orderItems);
            setCustomerName(order.customerName);
            setActiveTab('pos');
          }}
          onClearHistory={clearOrderHistory}
        />
      )}
    </div>
  );
};

export default SnackPOSApp;