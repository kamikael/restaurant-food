import React, { useState } from 'react';
import { ShoppingBag, User, Mail, Phone, CheckCircle, Lock, Shield, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { HandleCheckout } from '../components/payer';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
  apartment?: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  street?: string;
  streetNumber?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

interface Message {
  type: 'success' | 'error';
  text: string;
}

const CheckoutForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    streetNumber: '',
    city: '',
    postalCode: '',
    country: 'France',
    apartment: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);

  const { getCartSummary } = useCart();
  const cartSummary = getCartSummary();

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
        const cleanPhone = value.replace(/[\s\-().+]/g, '');
        if (cleanPhone.length < 10) {
          return 'Le numéro doit contenir au moins 10 chiffres';
        }
        if (cleanPhone.length > 15) {
          return 'Le numéro ne peut pas dépasser 15 chiffres';
        }
        if (!/^[0-9+]+$/.test(cleanPhone)) {
          return 'Format de numéro invalide';
        }
        return undefined;

      case 'streetNumber':
        if (!value.trim()) {
          return 'Le numéro de rue est requis';
        }
        if (!/^[0-9]+[a-zA-Z]?$/.test(value.trim())) {
          return 'Format invalide (ex: 123, 45bis)';
        }
        return undefined;

      case 'street':
        if (!value.trim()) {
          return 'Le nom de rue est requis';
        }
        if (value.trim().length < 2) {
          return 'Le nom de rue doit contenir au moins 2 caractères';
        }
        return undefined;

      case 'city':
        if (!value.trim()) {
          return 'La ville est requise';
        }
        if (value.trim().length < 2) {
          return 'La ville doit contenir au moins 2 caractères';
        }
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
          return 'Format de ville invalide';
        }
        return undefined;

      case 'postalCode':
        if (!value.trim()) {
          return 'Le code postal est requis';
        }
        // Accepte format français (5 chiffres) et autres formats internationaux
        if (!/^[0-9A-Z\s-]{3,10}$/.test(value.toUpperCase())) {
          return 'Format de code postal invalide';
        }
        return undefined;

      case 'country':
        if (!value.trim()) {
          return 'Le pays est requis';
        }
        return undefined;

      case 'apartment':
        // Champ optionnel, pas d'erreur
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let cleanedValue = value;
    
    if (name === 'firstName' || name === 'lastName' || name === 'city') {
      cleanedValue = value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '');
    } else if (name === 'phone') {
      cleanedValue = value.replace(/[^\d\s\-+().]/g, '');
    } else if (name === 'postalCode') {
      cleanedValue = value.replace(/[^0-9A-Za-z\s-]/g, '').toUpperCase();
    } else if (name === 'streetNumber') {
      cleanedValue = value.replace(/[^0-9a-zA-Z]/g, '');
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      if (key !== 'apartment') { // Ignorer le champ optionnel
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      setMessage({
        type: 'error',
        text: 'Veuillez corriger les erreurs ci-dessus'
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      if (cartSummary.totalItems === 0) {
        setMessage({
          type: 'error',
          text: 'Votre panier est vide'
        });
        setLoading(false);
        return;
      }

      const cleanPhone = formData.phone.replace(/[\s\-().]/g, '');
      let normalizedPhone = cleanPhone;
      if (cleanPhone.startsWith('0')) {
        normalizedPhone = '+33' + cleanPhone.substring(1);
      }

      const fullAddress = [
        formData.streetNumber,
        formData.street,
        formData.apartment ? `Apt ${formData.apartment}` : ''
      ].filter(Boolean).join(' ');

      const customerData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: normalizedPhone,
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        address: {
          street: fullAddress,
          city: formData.city.trim(),
          postalCode: formData.postalCode.trim(),
          country: formData.country.trim()
        }
      };
      

      // Appel au checkout
      await HandleCheckout(cartSummary, customerData);
      
      setMessage({
        type: 'success',
        text: 'Redirection vers le paiement en cours...'
      });
      
    
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'Une erreur est survenue. Veuillez réessayer.'
      });
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
            </div>
          </div>

          {/* Formulaire */}
          <div className="p-8">
            {/* Message d'erreur/succès */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-start border-l-4 ${
                message.type === 'error'
                  ? 'bg-red-50 border-red-500'
                  : 'bg-green-50 border-green-500'
              }`}>
                {message.type === 'error' ? (
                  <svg className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                )}
                <p className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                  {message.text}
                </p>
              </div>
            )}

            <div className="space-y-5">
              {/* Section Informations personnelles */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-orange-500" />
                  Informations personnelles
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Prénom */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jean"
                      maxLength={50}
                      className={`w-full py-3 px-4 border-2 rounded-lg text-gray-700 focus:outline-none transition-all ${
                        errors.firstName 
                          ? 'border-red-300 bg-red-50 focus:border-red-500' 
                          : 'border-gray-200 bg-gray-50 focus:border-orange-500'
                      } hover:border-orange-300`}
                      disabled={loading}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Nom */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Dupont"
                      maxLength={50}
                      className={`w-full py-3 px-4 border-2 rounded-lg text-gray-700 focus:outline-none transition-all ${
                        errors.lastName 
                          ? 'border-red-300 bg-red-50 focus:border-red-500' 
                          : 'border-gray-200 bg-gray-50 focus:border-orange-500'
                      } hover:border-orange-300`}
                      disabled={loading}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-orange-500" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre.email@exemple.com"
                    maxLength={100}
                    className={`w-full py-3 px-4 border-2 rounded-lg text-gray-700 focus:outline-none transition-all ${
                      errors.email 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 bg-gray-50 focus:border-orange-500'
                    } hover:border-orange-300`}
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                  {!errors.email && (
                    <p className="text-xs text-gray-500 mt-1">Confirmation de commande envoyée à cette adresse</p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-orange-500" />
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                    maxLength={20}
                    className={`w-full py-3 px-4 border-2 rounded-lg text-gray-700 focus:outline-none transition-all ${
                      errors.phone 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 bg-gray-50 focus:border-orange-500'
                    } hover:border-orange-300`}
                    disabled={loading}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                  {!errors.phone && formData.phone && (
                    <p className="text-xs text-green-600 mt-1">Numéro valide</p>
                  )}
                </div>
              </div>

              {/* Section Adresse de livraison */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                  Adresse de livraison
                </h3>

                {/* Numéro et rue */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      N° <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="streetNumber"
                      value={formData.streetNumber}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={10}
                      className={`w-full py-3 px-4 border-2 rounded-lg text-gray-700 focus:outline-none transition-all ${
                        errors.streetNumber 
                          ? 'border-red-300 bg-red-50 focus:border-red-500' 
                          : 'border-gray-200 bg-gray-50 focus:border-orange-500'
                      } hover:border-orange-300`}
                      disabled={loading}
                    />
                    {errors.streetNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.streetNumber}</p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Rue <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="Rue de la Paix"
                      maxLength={100}
                      className={`w-full py-3 px-4 border-2 rounded-lg text-gray-700 focus:outline-none transition-all ${
                        errors.street 
                          ? 'border-red-300 bg-red-50 focus:border-red-500' 
                          : 'border-gray-200 bg-gray-50 focus:border-orange-500'
                      } hover:border-orange-300`}
                      disabled={loading}
                    />
                    {errors.street && (
                      <p className="text-red-500 text-xs mt-1">{errors.street}</p>
                    )}
                  </div>
                </div>

                {/* Appartement (optionnel) */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Appartement / Complément d'adresse
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="Apt 5, Bâtiment B (optionnel)"
                    maxLength={50}
                    className="w-full py-3 px-4 border-2 border-gray-200 bg-gray-50 rounded-lg text-gray-700 focus:outline-none focus:border-orange-500 transition-all hover:border-orange-300"
                    disabled={loading}
                  />
                </div>

                {/* Ville et code postal */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Ville <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Paris"
                      maxLength={50}
                      className={`w-full py-3 px-4 border-2 rounded-lg text-gray-700 focus:outline-none transition-all ${
                        errors.city 
                          ? 'border-red-300 bg-red-50 focus:border-red-500' 
                          : 'border-gray-200 bg-gray-50 focus:border-orange-500'
                      } hover:border-orange-300`}
                      disabled={loading}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Code postal <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="75001"
                      maxLength={10}
                      className={`w-full py-3 px-4 border-2 rounded-lg text-gray-700 focus:outline-none transition-all ${
                        errors.postalCode 
                          ? 'border-red-300 bg-red-50 focus:border-red-500' 
                          : 'border-gray-200 bg-gray-50 focus:border-orange-500'
                      } hover:border-orange-300`}
                      disabled={loading}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                {/* Pays */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Pays <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full py-3 px-4 border-2 rounded-lg text-gray-700 focus:outline-none transition-all ${
                      errors.country 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 bg-gray-50 focus:border-orange-500'
                    } hover:border-orange-300`}
                    disabled={loading}
                  >
                    <option>France</option>
                    <option>Belgique</option>
                    <option>Suisse</option>
                    <option>Luxembourg</option>
                    <option>Autres</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bouton Commander */}
            <button
              onClick={handleCheckout}
              disabled={loading || cartSummary.totalItems === 0}
              className={`w-full mt-8 py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform flex items-center justify-center space-x-2 ${
                loading || cartSummary.totalItems === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
              }`}
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
          <p>Mama Food's - Cuisine africaine authentique</p>
          <p className="mt-2">Livraison gratuite • Paiement sécurisé</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;