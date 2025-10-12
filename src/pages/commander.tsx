import React, { useState } from 'react';
import { ShoppingBag, User, Mail, Phone, CheckCircle, Lock, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import {HandleCheckout} from '../components/payer';
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}



const CheckoutForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Données du panier (exemple - remplacer par vos vraies données)
  const {getCartSummary} = useCart()
  const cartSummary = getCartSummary()

  // Validation des champs
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          return `${name === 'firstName' ? 'Le prénom' : 'Le nom'} est requis`;
        }
        if (value.trim().length < 2) {
          return `${name === 'firstName' ? 'Le prénom' : 'Le nom'} doit contenir au moins 2 caractères`;
        }
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
          return 'Seules les lettres, espaces, apostrophes et tirets sont autorisés';
        }
        return undefined;

      case 'email':
        if (!value.trim()) {
          return 'L\'adresse email est requise';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Veuillez entrer une adresse email valide';
        }
        return undefined;

      case 'phone':
        if (!value.trim()) {
          return 'Le numéro de téléphone est requis';
        }
        // Nettoyer: supprimer espaces, tirets, parenthèses, points
        const cleanPhone = value.replace(/[\s\-().]/g, '');
        
        // Vérifier la longueur minimale/maximale
        if (cleanPhone.length < 10) {
          return 'Le numéro doit contenir au moins 10 chiffres';
        }
        if (cleanPhone.length > 15) {
          return 'Le numéro ne peut pas dépasser 15 chiffres';
        }
        
        // Formats acceptés pour la France
        const frenchMobileRegex = /^(0[6-7]\d{8})$/; // 06 ou 07 + 8 chiffres
        const frenchLandlineRegex = /^(0[1-5,9]\d{8})$/; // 01-05, 09 + 8 chiffres
        const internationalRegex = /^\+33[1-9]\d{8}$/; // +33 + 9 chiffres
        const genericInternationalRegex = /^\+[1-9]\d{8,14}$/; // Autres pays
        
        const isValidFrenchMobile = frenchMobileRegex.test(cleanPhone);
        const isValidFrenchLandline = frenchLandlineRegex.test(cleanPhone);
        const isValidFrenchIntl = internationalRegex.test(cleanPhone);
        const isValidOtherIntl = genericInternationalRegex.test(cleanPhone);
        
        if (!isValidFrenchMobile && !isValidFrenchLandline && !isValidFrenchIntl && !isValidOtherIntl) {
          return 'Format invalide. Exemples: 06 12 34 56 78, +33 6 12 34 56 78';
        }
        
        // Vérifications supplémentaires pour numéros français sans indicatif
        if (cleanPhone.startsWith('0')) {
          // Vérifier que ce n'est pas un numéro invalide (ex: 00, 08)
          if (cleanPhone.startsWith('00') || cleanPhone.startsWith('08')) {
            return 'Numéro invalide. Utilisez un numéro mobile (06/07) ou fixe (01-05, 09)';
          }
        }
        
        return undefined;

      default:
        return undefined;
    }
  };

  // Gérer les changements de champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let cleanedValue = value;
    
    if (name === 'firstName' || name === 'lastName') {
      cleanedValue = value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '');
    } else if (name === 'phone') {
      // Autoriser chiffres, +, espaces, tirets, parenthèses, points
      cleanedValue = value.replace(/[^\d\s\-+().]/g, '');
      
      // Auto-formater pour la France si commence par 0 ou +33
      if (cleanedValue.startsWith('0') && cleanedValue.length === 10) {
        // Format: 06 12 34 56 78
        cleanedValue = cleanedValue.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
      } else if (cleanedValue.startsWith('+33') && cleanedValue.replace(/[\s\-().]/g, '').length === 12) {
        // Format: +33 6 12 34 56 78
        const digits = cleanedValue.replace(/[\s\-().]/g, '');
        cleanedValue = digits.replace(/(\+33)(\d)(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
      }
    } else if (name === 'email') {
      cleanedValue = value.replace(/\s/g, '').toLowerCase();
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: cleanedValue
    }));
    
    const error = validateField(name as keyof FormData, cleanedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Valider tous les champs
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Gérer la soumission
  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (cartSummary.totalItems === 0) {
        setErrors({ email: 'Votre panier est vide' });
        setLoading(false);
        return;
      }

      const cleanPhone = formData.phone.replace(/[\s\-().]/g, '');

      // Normaliser le numéro français vers le format international
      let normalizedPhone = cleanPhone;
      if (cleanPhone.startsWith('0')) {
        // Convertir 06... en +336...
        normalizedPhone = '+33' + cleanPhone.substring(1);
      }

      const customerData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: normalizedPhone, // Toujours au format international
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`
      };

      // Simuler l'appel API (remplacer par votre HandleCheckout)
      await HandleCheckout(cartSummary, customerData);
      
      console.log('Données envoyées:', { cartSummary, customerData });
      
      setMessage('✅ Redirection vers le paiement...');
      
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        });
      }, 1000);
      
    } catch (err) {
      setErrors({ email: 'Une erreur est survenue. Veuillez réessayer.' });
      console.error('Erreur checkout:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto max-w-2xl">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <ShoppingBag className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Finaliser ma commande
          </h1>
          <p className="text-gray-600">
            Remplissez vos informations pour continuer
          </p>
        </div>

        {/* Carte principale */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Résumé du panier */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Résumé de la commande</h2>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {cartSummary.totalItems} article{cartSummary.totalItems > 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="space-y-2 text-white/90">
              {cartSummary.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/30">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total</span>
                <span className="text-3xl font-bold">{cartSummary.total.toFixed(2)}€</span>
              </div>
              {cartSummary.delivery > 0 && (
                <p className="text-xs text-white/80 mt-1">
                  (incluant {cartSummary.delivery.toFixed(2)}€ de livraison)
                </p>
              )}
              {cartSummary.discount > 0 && (
                <p className="text-xs text-white/80">
                  Réduction appliquée : -{cartSummary.discount.toFixed(2)}€
                </p>
              )}
            </div>
          </div>

          {/* Formulaire */}
          <div className="p-8">
            {/* Message de succès */}
            {message && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-green-700 font-medium">{message}</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Prénom */}
              <div>
                <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <User className="h-5 w-5 mr-2 text-orange-500" />
                  Prénom <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jean"
                  maxLength={50}
                  className={`w-full py-3 px-4 border-2 rounded-xl text-gray-700 
                    focus:outline-none transition-all
                    ${errors.firstName 
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 bg-gray-50 focus:border-orange-500'}
                    hover:border-orange-300`}
                  disabled={loading}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠️</span> {errors.firstName}
                  </p>
                )}
              </div>

              {/* Nom */}
              <div>
                <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <User className="h-5 w-5 mr-2 text-orange-500" />
                  Nom <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Dupont"
                  maxLength={50}
                  className={`w-full py-3 px-4 border-2 rounded-xl text-gray-700 
                    focus:outline-none transition-all
                    ${errors.lastName 
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 bg-gray-50 focus:border-orange-500'}
                    hover:border-orange-300`}
                  disabled={loading}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠️</span> {errors.lastName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <Mail className="h-5 w-5 mr-2 text-orange-500" />
                  Adresse email <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@exemple.com"
                  maxLength={100}
                  className={`w-full py-3 px-4 border-2 rounded-xl text-gray-700 
                    focus:outline-none transition-all
                    ${errors.email 
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 bg-gray-50 focus:border-orange-500'}
                    hover:border-orange-300`}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠️</span> {errors.email}
                  </p>
                )}
                {!errors.email && (
                  <p className="text-xs text-gray-500 mt-2">
                    📧 Confirmation de commande envoyée à cette adresse
                  </p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <Phone className="h-5 w-5 mr-2 text-orange-500" />
                  Numéro de téléphone <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="06 12 34 56 78 ou +33 6 12 34 56 78"
                  maxLength={20}
                  className={`w-full py-3 px-4 border-2 rounded-xl text-gray-700 
                    focus:outline-none transition-all
                    ${errors.phone 
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 bg-gray-50 focus:border-orange-500'}
                    hover:border-orange-300`}
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠️</span> {errors.phone}
                  </p>
                )}
                {!errors.phone && formData.phone && (
                  <p className="text-xs text-green-600 mt-2 flex items-center">
                    <span className="mr-1">✓</span> Numéro valide
                  </p>
                )}
                {!errors.phone && !formData.phone && (
                  <p className="text-xs text-gray-500 mt-2">
                    📱 Mobile (06/07) ou fixe (01-05/09) • Format international accepté
                  </p>
                )}
              </div>
            </div>

            {/* Bouton Commander */}
            <button
              onClick={handleCheckout}
              disabled={loading || cartSummary.totalItems === 0}
              className={`w-full mt-8 py-4 px-6 rounded-xl font-bold text-lg
                transition-all duration-300 transform
                ${loading || cartSummary.totalItems === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                }
                flex items-center justify-center space-x-2`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Traitement en cours...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-6 w-6" />
                  <span>Commander {cartSummary.total.toFixed(2)}€</span>
                </>
              )}
            </button>

            {/* Informations de sécurité */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-1 text-green-500" />
                Paiement sécurisé
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-blue-500" />
                Données protégées
              </div>
            </div>
          </div>
        </div>

        {/* Note de bas de page */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>🍽️ <strong>Mama Food's</strong> - Cuisine africaine authentique</p>
          <p className="mt-2">Livraison gratuite • Paiement sécurisé par Stripe</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;