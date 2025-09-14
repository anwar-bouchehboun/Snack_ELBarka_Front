# 🥪 Snack POS - Point de Vente

Une application moderne de point de vente pour snack/restaurant avec support bilingue (Français/Arabe).

## 🚀 Fonctionnalités

- ✅ **Interface bilingue** - Français et Arabe avec support RTL
- ✅ **Gestion des produits** - Ajout, modification, suppression
- ✅ **Filtrage avancé** - Par catégorie et recherche textuelle
- ✅ **Panier intelligent** - Gestion des quantités et calcul automatique
- ✅ **Impression de tickets** - Design professionnel optimisé
- ✅ **Historique des commandes** - Sauvegarde locale complète
- ✅ **Stockage local** - Toutes les données persistent localement

## 📁 Structure du Projet

```
snack-pos-app/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── ProductGrid.tsx  # Grille d'affichage des produits
│   │   ├── CategoryFilter.tsx # Filtrage par catégories
│   │   └── SearchBar.tsx    # Barre de recherche
│   ├── types.ts            # Types TypeScript
│   ├── data.ts             # Données des produits par défaut
│   ├── translations.ts     # Traductions FR/AR
│   └── utils.ts            # Fonctions utilitaires
├── snack-pos-app.tsx       # Composant principal
├── index.html              # Point d'entrée HTML
├── package.json            # Dépendances et scripts
└── README.md              # Documentation
```

## 🗂️ Catégories de Produits

L'application inclut **7 catégories** avec **40 produits** pré-configurés :

### ☕ Café (6 produits)
- Café Noir, Café au Lait, Cappuccino, Espresso, Latte, Café Turc

### 🥤 Boissons (7 produits)
- Sodas, Jus de fruits, Eau minérale, Thé à la menthe

### 🥪 Sandwichs (5 produits)
- Thon, Fromage, Poulet, Mixte, Croque Monsieur

### 🥐 Pâtisserie (6 produits)
- Croissants, Muffins, Donuts, Éclairs, Tartes

### 🍕 Pizza (5 produits)
- Margherita, 4 Fromages, Pepperoni, Thon, Royale

### 🍲 Plats (5 produits)
- Tajine, Couscous, Pastilla, Harira, Salade

### 🍰 Desserts (6 produits)
- Tiramisu, Crème Brûlée, Mousse, Glaces, Cheesecake

## 🎯 Fonctionnalités Avancées

### Filtrage Intelligent
- **Par catégorie** : Boutons de filtrage rapide
- **Par recherche** : Recherche dans nom français, arabe et catégorie
- **Affichage dynamique** : Indication quand aucun produit n'est trouvé

### Stockage Local
- **Produits** : `snack-pos-products`
- **Commandes** : `snack-pos-orders`
- **Persistance totale** : Toutes les modifications sont sauvegardées

### Impression Professionnelle
- **Design optimisé** : Ticket de caisse professionnel
- **Informations complètes** : ID commande, client, détails, total
- **Multi-langue** : Support complet FR/AR
- **Auto-clear** : Panier vidé après impression

## 🛠️ Installation et Démarrage

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Construction pour production
npm run build
```

## 🌐 Support Multilingue

L'application supporte complètement :
- **Français** : Interface par défaut
- **Arabe** : Avec support RTL complet
- **Commutation dynamique** : Changement de langue en temps réel

## 📱 Interface Responsive

- **Desktop** : Interface complète avec sidebar
- **Tablet** : Adaptation automatique des grilles
- **Mobile** : Interface optimisée pour écrans tactiles

## 🎨 Technologies Utilisées

- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Vite** pour le build et développement
- **localStorage** pour la persistance

---

**Développé avec ❤️ pour les professionnels de la restauration**
