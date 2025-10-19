
import { 
  XCircleIcon, 
  ArrowPathIcon,
  HomeIcon,
  ShoppingCartIcon,
  QuestionMarkCircleIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { NavLink } from "react-router-dom";

export default function Cancel() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 relative overflow-hidden">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
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

        @keyframes pulse-ring {
          0% {
            transform: scale(0.9);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .pulse-ring {
          animation: pulse-ring 1.5s ease-out infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full">
          {/* Carte principale */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp">
            {/* En-tête avec icône d'erreur */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                  <div className="absolute inset-0 bg-red-400 rounded-full pulse-ring"></div>
                  <div className="relative bg-white rounded-full p-4 shadow-lg animate-shake">
                    <XCircleIcon className="h-12 w-12 text-red-500" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Paiement annulé
                </h1>
                <p className="text-red-100 text-lg">
                  Votre commande n'a pas été finalisée
                </p>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-8">
              {/* Message principal */}
              <div className="text-center mb-8">
                <p className="text-gray-700 text-lg mb-2">
                  Pas de souci, ça arrive ! 😊
                </p>
                <p className="text-gray-600">
                  Votre panier est toujours sauvegardé et vous attend
                </p>
              </div>

              {/* Raisons possibles */}
              <div className="bg-orange-50 rounded-xl p-6 mb-8 border border-orange-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <QuestionMarkCircleIcon className="h-5 w-5 mr-2 text-orange-600" />
                  Pourquoi le paiement n'a pas fonctionné ?
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Vous avez cliqué sur "Retour" ou fermé la fenêtre de paiement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Informations de carte bancaire incorrectes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Fonds insuffisants ou limite de paiement atteinte</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Problème de connexion internet</span>
                  </li>
                </ul>
              </div>

              {/* Actions recommandées */}
              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Que faire maintenant ?
                </h2>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-shrink-0">
                    <CreditCardIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Vérifiez vos informations</h3>
                    <p className="text-sm text-gray-600">
                      Assurez-vous que votre carte bancaire est valide et qu'elle a des fonds suffisants
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-shrink-0">
                    <ArrowPathIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Réessayez</h3>
                    <p className="text-sm text-gray-600">
                      Votre panier est sauvegardé, vous pouvez réessayer le paiement à tout moment
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3">
                <NavLink
                  to="/panier"
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Retour au panier et réessayer</span>
                </NavLink>

                <NavLink
                  to="/"
                  className="w-full flex items-center justify-center space-x-2 bg-white text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 transition-all duration-300"
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Retour à l'accueil</span>
                </NavLink>

                <NavLink
                  to="/contact"
                  className="w-full flex items-center justify-center space-x-2 text-gray-600 font-medium py-3 px-6 rounded-xl hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                >
                  <QuestionMarkCircleIcon className="h-5 w-5" />
                  <span>Besoin d'aide ? Contactez-nous</span>
                </NavLink>
              </div>
              
              {/* Rassurance */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  🔒 <strong>Sécurité garantie</strong> - Aucun montant n'a été débité de votre compte
                </p>
              </div>
            </div>
          </div>

          {/* Message de bas de page */}
          <div className="text-center mt-8 text-gray-600">
            <p className="text-sm">
              🍽️ <strong>Mama Food's</strong> - À votre service
            </p>
            <p className="text-xs mt-2">
              Des questions ? Écrivez-nous à support@mamafoods.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}