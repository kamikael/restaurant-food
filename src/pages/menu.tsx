import React, { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

type MenuCardProps = {
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  index: number;
};

const MenuCard: React.FC<MenuCardProps> = ({
  title,
  subtitle,
  image,
  link,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={link}
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-3xl group cursor-pointer"
        style={{
          animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
        }}
      >
        {/* Image de fond avec zoom au survol */}
        <div
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Overlay gradient dynamique */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />

        {/* Overlay de couleur subtile au survol */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-600/0 group-hover:from-amber-500/20 group-hover:to-orange-600/20 transition-all duration-500" />

        {/* Contenu centré */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {/* Badge subtitle avec animation */}
          {subtitle && (
            <div className="mb-4 transform transition-all duration-500 group-hover:-translate-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-white/90 tracking-widest uppercase">
                  {subtitle}
                </span>
              </div>
            </div>
          )}

          {/* Titre principal */}
          <h3 className="text-5xl md:text-6xl font-bold text-white mb-6 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110">
            <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              {title}
            </span>
          </h3>

          {/* Bouton CTA animé */}
          <div className="transform transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-amber-50 transition-all duration-300">
              <span>Découvrir</span>
              <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Effet de brillance diagonal au survol */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ${
            isHovered ? "translate-x-full" : "-translate-x-full"
          }`}
          style={{ width: "50%" }}
        />

        {/* Bordure lumineuse au survol */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500" />

        {/* Coins décoratifs */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>
    </NavLink>
  );
};

const Menu = () => {
  const menuItems = [
    {
      title: "Africain",
      subtitle: "MENU",
      image: "./menuAfricain.jpg",
      link: "/menuafricain",
    },
    {
      title: "Food's Street",
      subtitle: "MENU",
      image: "./foodstreet.jpg",
      link: "/street",
    },
    {
      title: "DRINK",
      subtitle: "MENU",
      image: "./menuDrink.jpg",
      link: "/drink",
    },
    {
      title: "Dessert",
      subtitle: "MENU",
      image: "./annaconiac.jpg",
      link: "/dessert",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1a05] via-[#020701] to-[#0a1a05] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl py-12 mx-auto">
        {/* En-tête de section avec animation */}
        <div className="text-center mb-16 space-y-6">
          {/* Badge décoratif */}
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500/10 backdrop-blur-sm rounded-full border border-amber-500/20 mb-4 animate-pulse">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-medium tracking-wide">
              Découvrez nos saveurs
            </span>
          </div>

          {/* Titre principal */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent animate-gradient">
              Nos Menus
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Une expérience culinaire unique qui célèbre les saveurs authentiques
            et la créativité gastronomique
          </p>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-500" />
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
        </div>

        {/* Grille responsive des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {menuItems.map((item, index) => (
            <MenuCard key={index} {...item} index={index} />
          ))}
        </div>

        {/* Section CTA bas de page */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 text-lg mb-6">
            Laissez-vous transporter par nos créations culinaires
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <span className="text-white/70 text-sm">
                🌟 Ingrédients frais
              </span>
            </div>
            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <span className="text-white/70 text-sm">👨‍🍳 Chefs passionnés</span>
            </div>
            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <span className="text-white/70 text-sm">
                🔥 Saveurs authentiques
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Menu;
