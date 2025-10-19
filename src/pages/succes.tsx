import { useEffect, useState } from 'react';
import { 
  CheckCircleIcon, 
  EnvelopeIcon, 
  TruckIcon, 
  ClockIcon,
  HomeIcon,
  ShoppingBagIcon 
} from '@heroicons/react/24/outline';
import { NavLink } from "react-router-dom";

export default function Success() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer le session_id de l'URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('session_id');
    setSessionId(id);
  }, []);

  // Animation de confetti (effet visuel)
  useEffect(() => {
    const colors = ['#ff6b35', '#f7931e', '#fdc500', '#4ecdc4'];
    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      document.getElementById('confetti-container')?.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 5000);
    };

    const interval = setInterval(createConfetti, 100);
    setTimeout(() => clearInterval(interval), 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Conteneur de confettis */}
      <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50" />

      <style>{`
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          top: -10px;
          z-index: 9999;
          animation: fall linear forwards;
        }
        
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(-45deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(-45deg);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-checkmark {
          animation: checkmark 0.6s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full">
          {/* Carte principale */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp">
            {/* En-tête avec icône de succès */}
            <div className="bg-gradient-to-r from-[#4bb930] to-[#6dc757] p-8 text-center relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 shadow-lg">
                  <CheckCircleIcon className="h-16 w-16 text-green-500 animate-checkmark" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Paiement réussi ! 🎉
                </h1>
                <p className="text-green-100 text-lg">
                  Votre commande a été confirmée avec succès
                </p>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-8">
              {/* Message de remerciement */}
              <div className="text-center mb-8">
                <p className="text-gray-700 text-lg mb-2">
                  Merci pour votre confiance ! 🙏
                </p>
                <p className="text-gray-600">
                  Nous préparons votre commande avec soin et amour
                </p>
              </div>

              {/* Numéro de commande */}
              {sessionId && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Numéro de commande</p>
                  <p className="font-mono text-sm text-gray-800 break-all">
                    {sessionId.substring(0, 30)}...
                  </p>
                </div>
              )}

              {/* Étapes suivantes */}
              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Que se passe-t-il maintenant ?
                </h2>

                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email de confirmation</h3>
                    <p className="text-sm text-gray-600">
                      Vous allez recevoir un email avec tous les détails de votre commande
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Préparation</h3>
                    <p className="text-sm text-gray-600">
                      Notre équipe commence immédiatement à préparer vos plats
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <TruckIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Livraison gratuite</h3>
                    <p className="text-sm text-gray-600">
                      Votre commande sera livrée dans les meilleurs délais
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3">
                <NavLink
                  to="/"
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Retour à l'accueil</span>
                </NavLink>

                <NavLink
                  to="/menu"
                  className="w-full flex items-center justify-center space-x-2 bg-white text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 transition-all duration-300"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>Continuer mes achats</span>
                </NavLink>
              </div>

              
            </div>
          </div>

          {/* Message de bas de page */}
          <div className="text-center mt-8 text-gray-600">
            <p className="text-sm">
              🍽️ <strong>Mama Food's</strong> - Merci de nous faire confiance
            </p>
            <p className="text-xs mt-2">
              Besoin d'aide ? Contactez-nous à support@mamafoods.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}