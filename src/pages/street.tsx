import React, { useState } from "react";
import {
  ShoppingCartIcon,
  SparklesIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { NavLink } from "react-router-dom";
// Interface pour simuler le context

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Menu poulet" | "Sauces gratuites";
  isPopular?: boolean;
  isNew?: boolean;
}

const dishes: Dish[] = [
  {
    id: "61",
    name: "10 ailes pannées +",
    description:
      "10 wings (ailes et pilons) marinés (épicé). Avec : une sauces au choix, 1 portion de frite, 1 boisson 33 cl.",
    price: 8.5,
    image: "./kids.png",
    category: "Menu poulet",
    isPopular: true,
  },
  {
    id: "62",
    name: "10 ailes pannées",
    description: "10 ailes pannées marinés (épicé)",
    price: 6.5,
    image: "./hot.png",
    category: "Menu poulet",
    isPopular: true,
  },
  {
    id: "65",
    name: "3 ailes de poulet ",
    description: "3 ailes de poulet frites",
    price: 3,
    image: "./ailepoulet.jpg",
    category: "Menu poulet",
  },
  {
    id: "66",
    name: "3 pilon de poulet",
    description: "3 pilons de poulet marinés",
    price: 3,
    image: "./pilon.jpg",
    category: "Menu poulet",
  },
  {
    id: "67",
    name: "2 Haut de poulet",
    description: "2 hauts de cuisse de poulet marinés",
    price: 3,
    image: "./hautpoulet.jpg",
    category: "Menu poulet",
  },
  {
    id: "68",
    name: "6 saucisses",
    description: "6 saucisses, sauces offertes au choix",
    price: 5,
    image: "./saucisse.png",
    category: "Menu poulet",
  },
  {
    id: "100",
    name: "1 saucisses",
    description: "1 saucisses, sauces offertes au choix",
    price: 1,
    image: "./saucisse.png",
    category: "Menu poulet",
  },
  {
    id: "101",
    name: "Pate viande hachée",
    description: "pate avec viande hachée sans boisson",
    price: 4,
    image: "./patviande.jpg",
    category: "Menu poulet",
  },
  {
    id: "102",
    name: "Pate viande hachée +",
    description: "pate avec viande hachée avec une cannette",
    price: 5,
    image: "./patviande.jpg",
    category: "Menu poulet",
  },
  {
    id: "103",
    name: "spaghetti boullettes +",
    description: "spaghetti boullettes avec une cannette",
    price: 5,
    image: "./spatboulete.jpg",
    category: "Menu poulet",
  },
  {
    id: "106",
    name: "spaghetti boullettes",
    description: "spaghetti boullettes sans boisson",
    price: 4,
    image: "./spatboulete.jpg",
    category: "Menu poulet",
  },
  {
    id: "104",
    name: "spaghetti viande hachée",
    description: "spaghetti avec viande hachée",
    price: 4,
    image: "./spatviande.png",
    category: "Menu poulet",
  },
  {
    id: "105",
    name: "spaghetti viande hachée +",
    description: "spaghetti avec viande hachée avec une cannetten",
    price: 5,
    image: "./spatviande.png",
    category: "Menu poulet",
  },
  {
    id: "107",
    name: "pain viande hachée",
    description: "pain avec viande hachée sans boisson",
    price: 3,
    image: "./painviande.jpeg",
    category: "Menu poulet",
  },
  {
    id: "108",
    name: "pain viande hachée +",
    description: "pain avec viande hachée avec une cannette",
    price: 4,
    image: "./painviande.jpeg",
    category: "Menu poulet",
  },
  {
    id: "109",
    name: "pain omelette",
    description: "pain avec viande hachée sans boisson",
    price: 3,
    image: "./painboulette.png",
    category: "Menu poulet",
  },
  {
    id: "110",
    name: "pain omelette +",
    description: "pain avec viande hachée avec une cannette",
    price: 4,
    image: "./painboulette.png",
    category: "Menu poulet",
  },
  {
    id: "111",
    name: "beignet haricot bouilli",
    description: "uniquement le dimanche",
    price: 8,
    image: "./baignetbouilli.jpeg",
    category: "Menu poulet",
  },
  {
    id: "69",
    name: "sauce oignon",
    description: "accompagnement offert",
    price: 0,
    image: "./sauceoigon.jpg",
    category: "Sauces gratuites",
  },
  {
    id: "70",
    name: "sauce verte",
    description: "accompagnement offert",
    price: 0,
    image: "./sauceveerte.jpg",
    category: "Sauces gratuites",
  },
  {
    id: "71",
    name: "sauce piquante",
    description: "accompagnement offert",
    price: 0,
    image: "./piquante.jpg",
    category: "Sauces gratuites",
  },
];

const categories = ["Tout", "Menu poulet", "Sauces gratuites"];

const MenuPage: React.FC = () => {
  const { addToCart } = useCart();

  const [activeCategory, setActiveCategory] = useState("Tout");
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const filteredDishes =
    activeCategory === "Tout"
      ? dishes
      : dishes.filter((dish) => dish.category === activeCategory);

  const handleAddToCart = (dish: Dish) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      description: dish.description,
      price: dish.price,
      quantity: 1,
      image: dish.image,
      link: "/menu",
    });

    // Animation visuelle
    setAddedItems((prev) => new Set(prev).add(dish.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(dish.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#0a1a05] via-[#020701] to-[#0a1a05] text-white py-40 overflow-hidden">
        {/* Patterns décoratifs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Menu Food's Street
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
            L’esprit street food, revisité avec passion et authenticité.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Navigation Catégories améliorée */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`group relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#4bb930] to-[#5cd93e] text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg"
              }`}
            >
              {/* Fond animé */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#4bb930] to-[#5cd93e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>

              {/* Texte */}
              <span
                className={`relative z-10 ${
                  activeCategory !== cat ? "group-hover:text-white" : ""
                } transition-colors duration-300`}
              >
                {cat}
              </span>

              {/* Badge compteur */}
              {cat !== "Tout" && (
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeCategory === cat
                      ? "bg-white/20"
                      : "bg-gray-200 group-hover:bg-white/20"
                  }`}
                >
                  {dishes.filter((d) => d.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Nombre de résultats */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            <span className="font-bold text-[#4bb930] text-xl">
              {filteredDishes.length}
            </span>{" "}
            plat{filteredDishes.length > 1 ? "s" : ""} disponible
            {filteredDishes.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Liste des plats avec animations */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDishes.map((dish, index) => (
            <div
              key={dish.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-[#4bb930]/30"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Badges */}
              <div className="absolute top-3 left-3 z-20 flex gap-2">
                {dish.isPopular && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                    <FireIcon className="w-3 h-3" />
                    Populaire
                  </span>
                )}
                {dish.isNew && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#4bb930] to-[#5cd93e] text-white text-xs font-bold rounded-full shadow-lg">
                    <SparklesIcon className="w-3 h-3" />
                    Nouveau
                  </span>
                )}
              </div>

              {/* Image avec overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay dégradé */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Prix qui apparaît sur l'image */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transform translate-y-0 md:translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xl font-bold text-[#4bb930]">
                    {dish.price.toFixed(2)} €
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#4bb930] transition-colors duration-300">
                  {dish.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {dish.description || "Délicieux plat préparé avec soin"}
                </p>

                {/* Bouton d'ajout au panier */}
                <button
                  onClick={() => handleAddToCart(dish)}
                  disabled={addedItems.has(dish.id)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden relative ${
                    addedItems.has(dish.id)
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-[#4bb930] to-[#5cd93e] text-white hover:shadow-xl hover:shadow-[#4bb930]/30 hover:scale-105"
                  }`}
                >
                  {addedItems.has(dish.id) ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Ajouté !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>Ajouter au panier</span>
                    </>
                  )}

                  {/* Effet de brillance */}
                  {!addedItems.has(dish.id) && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  )}
                </button>
              </div>

              {/* Bordure lumineuse au survol */}
              <div className="absolute inset-0 border-2 border-[#4bb930] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredDishes.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gray-100 rounded-2xl">
              <p className="text-gray-600 text-lg mb-4">
                Aucun plat trouvé dans cette catégorie
              </p>
              <button
                onClick={() => setActiveCategory("Tout")}
                className="px-6 py-3 bg-[#4bb930] text-white rounded-full hover:bg-[#3a9606] transition-all duration-300"
              >
                Voir tous les plats
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Section CTA en bas */}
      <div className="bg-gradient-to-r from-[#4bb930] to-[#2a7506] text-white py-16 mt-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Une question sur notre menu ?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Notre équipe est là pour vous conseiller et personnaliser votre
            commande
          </p>
          <NavLink
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-[#4bb930] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Nous contacter
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
