// Fonctions utilitaires pour l'application POS

export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

export const formatDate = (date: string, language: 'fr' | 'ar'): string => {
  return new Date(date).toLocaleString(language === 'ar' ? 'ar-MA' : 'fr-FR');
};

export const generateOrderId = (): number => {
  return Date.now();
};

export const generateShortOrderId = (fullId: number): string => {
  return fullId.toString().slice(-6);
};

// Fonction pour sauvegarder dans localStorage
export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
};

// Fonction pour charger depuis localStorage
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return defaultValue;
  }
};
