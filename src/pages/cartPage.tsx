import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon, TagIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';


function Panier() {
  const { cart, removeFromCart, updateQuantity, addCartSummary } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ percent: number; name: string } | null>(null);
const [incorrectCode, setIncorrectCode] = useState(false);
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    const subtotal = calculateSubtotal();
    return subtotal * (appliedPromo.percent / 100);
  };

  const calculateDeliveryFee = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 30 ? 0 : 5;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const delivery = calculateDeliveryFee();
    const total = subtotal - discount + delivery;
    return isNaN(total) ? '0.00' : total.toFixed(2);
  };

  const applyPromoCode = () => {
    // Simulation de codes promo
    const promoCodes: Record<string, { percent: number; name: string }> = {
      "BIENVENUE10": { percent: 10, name: "BIENVENUE10"},
      "FIDELE15": { percent: 15, name: "FIDELE15" }
    };
    
    if (!promoCode.trim()) {
  setIncorrectCode(true);
  return;
}

    if (promoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo(promoCodes[promoCode.toUpperCase()]);
      setIncorrectCode(false);
    }else{
        setIncorrectCode(true);
    }
  };

  const getItemTotal = (item: { price: number; quantity?: number }) => {
    return (item.price * (item.quantity || 1)).toFixed(2);
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
useEffect(() => {
  if (!Array.isArray(cart)) return;

  addCartSummary({
    total: parseFloat(calculateTotal()) || 0,
    totalItems: totalItems,
    delivery: calculateDeliveryFee(),
    discount: calculateDiscount(),
    items: cart.map(item => ({
      name: item.name ?? "inconnu",
      description: item.description ?? "",
      price: item.price,
      quantity: item.quantity || 1
    }))
  });
}, [cart, appliedPromo])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* En-tête avec compteur */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Votre Panier</h1>
            {cart.length > 0 && (
              <div className="flex items-center bg-[#4bb930] text-white px-4 py-2 rounded-full">
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                <span className="font-semibold">{totalItems} article{totalItems > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          <p className="text-gray-600">Gérez vos plats et passez à la caisse en toute simplicité.</p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl shadow-lg text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCartIcon className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Votre panier est vide</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Découvrez notre délicieux menu et ajoutez vos plats préférés pour commencer votre commande.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center bg-[#4bb930] text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
            >
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              Découvrir le menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bannière livraison gratuite */}
              {calculateSubtotal() < 30 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4">
                  <div className="flex items-center">
                    <TruckIcon className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-amber-900">
                        Plus que {(30 - calculateSubtotal()).toFixed(2)} € pour la livraison gratuite !
                      </p>
                      <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((calculateSubtotal() / 30) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Articles du panier */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {Array.isArray(cart) && cart.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 hover:bg-gray-50 transition-colors ${
                      index !== cart.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className="relative group flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-28 h-28 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow"
                      />
                      {item.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 bg-[#4bb930] text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                          ×{item.quantity}
                        </div>
                      )}
                    </div>

                    {/* Infos produit */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name} <p className="text-lg font-semibold text-gray-900 mb-1" >{item.description}</p></h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {item.price.toFixed(2)} € / unité
                      </p>
                      
                      {/* Contrôles quantité mobile/desktop */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 rounded-lg shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="p-2.5 text-gray-600 hover:text-[#4bb930] hover:bg-white transition-all rounded-l-lg"
                            aria-label="Diminuer la quantité"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity || 1}
                            onChange={(e) => {
                              const value = parseInt(e.target.value || "1", 10);
                              updateQuantity(item.id, isNaN(value) ? 1 : value);
                            }}
                            className="w-14 text-center bg-transparent border-none focus:ring-0 font-semibold text-gray-900"
                            min="1"
                            autoComplete="off"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="p-2.5 text-gray-600 hover:text-[#4bb930] hover:bg-white transition-all rounded-r-lg"
                            aria-label="Augmenter la quantité"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <span className="text-lg font-bold text-gray-900">
                          {getItemTotal(item)} €
                        </span>
                      </div>
                    </div>

                    {/* Bouton supprimer */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all self-start sm:self-center"
                      aria-label="Supprimer l'article"
                      title="Supprimer"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Continuer les achats */}
              <Link
                to="/menu"
                className="flex items-center justify-center text-[#4bb930] hover:text-green-700 font-semibold transition-colors py-3"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Ajouter d'autres plats
              </Link>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Récapitulatif</h2>
                
              {/* Code promo */}
<div className="w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
    <TagIcon className="h-4 w-4 mr-2 text-[#4bb930]" />
    Code promo
  </label>

  {/* Champ + bouton */}
  <div className="flex flex-col sm:flex-row gap-3">
    <input
      type="text"
      value={promoCode}
      onChange={(e) => {
        setPromoCode(e.target.value);
        setIncorrectCode(false);
      }}
      placeholder="Entrez le code"
      className="w-full sm:flex-1 px-4 py-2.5 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-[#4bb930] focus:border-transparent
                 text-sm sm:text-base"
      disabled={!!appliedPromo}
    />

    {!appliedPromo ? (
      <button
        onClick={applyPromoCode}
        className="w-full sm:w-auto px-5 py-2.5 bg-gray-900 text-white 
                   rounded-lg hover:bg-gray-800 transition font-medium 
                   text-sm sm:text-base"
      >
        Appliquer
      </button>
    ) : (
      <button
        onClick={() => {
          setAppliedPromo(null);
          setPromoCode('');
        }}
        className="w-full sm:w-auto px-5 py-2.5 bg-red-500 text-white 
                   rounded-lg hover:bg-red-600 transition font-medium 
                   text-sm sm:text-base"
      >
        Retirer
      </button>
    )}
  </div>

  {/* Messages */}
  {appliedPromo && (
    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-sm sm:text-base font-medium text-green-800">
        ✓ Code {appliedPromo.name} appliqué (-{appliedPromo.percent}%)
      </p>
    </div>
  )}

  {!appliedPromo && incorrectCode && (
    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm sm:text-base font-medium text-red-800">
        Code promo incorrect ou vide
      </p>
    </div>
  )}
</div>


                {/* Détails financiers */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span className="font-semibold">{calculateSubtotal().toFixed(2)} €</span>
                  </div>
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction ({appliedPromo.percent}%)</span>
                      <span className="font-semibold">-{calculateDiscount().toFixed(2)} €</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center">
                      <TruckIcon className="h-4 w-4 mr-1" />
                      Livraison
                    </span>
                    <span className="font-semibold">
                      {calculateDeliveryFee() === 0 ? (
                        <span className="text-green-600">Gratuit</span>
                      ) : (
                        `${calculateDeliveryFee().toFixed(2)} €`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-2xl font-bold text-gray-900 pt-4 border-t-2">
                    <span>Total</span>
                    <span className="text-[#4bb930]">{calculateTotal()} €</span>
                  </div>
                </div>

                {/* Temps de livraison estimé */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                  <ClockIcon className="h-5 w-5 text-[#4bb930] mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Livraison estimée</p>
                    <p className="text-sm font-bold text-gray-900">30-45 minutes</p>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col items-center space-y-3 pt-2">
                  <Link
                    className="flex items-center justify-center bg-[#4bb930] p-4  text-white py-4 rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 font-bold shadow-lg text-lg"
                    to="/commander"
                  >
                    Passer la commande
                  </Link>
                  <Link
                    to="/menu"
                    className="block text-center text-gray-600 hover:text-[#4bb930] font-medium transition py-2"
                  >
                    ← Retour au menu
                  </Link>
                </div>

                {/* Badge sécurisé */}
                <div className="pt-4 border-t text-center">
                  <p className="text-xs text-gray-500 flex items-center justify-center">
                    🔒 Paiement 100% sécurisé
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Panier;