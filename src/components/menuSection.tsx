import React from "react";
import { NavLink } from "react-router-dom";
import {Sparkles } from "lucide-react";

type MenuCardProps = {
  title: string;
  subtitle?: string;
  image: string;
  link: string;
};

const MenuCard: React.FC<MenuCardProps> = ({
  title,
  subtitle,
  image,
  link,
}) => {
  return (
    <NavLink
      to={link}
      className="group relative block overflow-hidden rounded-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      style={{
        animation: "float 6s ease-in-out infinite",
        animationDelay: `${Math.random() * 2}s`,
      }}
    >
      {/* Image de fond avec overlay sombre */}
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
       
        {/* Overlay gradient dynamique */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />


        {/* Texte centré */}
        <div className="absolute inset-0 flex flex-col gap-1  items-center justify-center text-white">
           
          
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
          <h3 className="text-3xl font-bold uppercase tracking-wider transition-transform duration-500 group-hover:scale-110">
            {title}
          </h3>
        </div>

        {/* Effet de brillance au survol */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </NavLink>
  );
};

const FloatingMenuSection = () => {
  const menuItems = [
    {
      title: "Africain",
      subtitle: "MENU",
      image: "./menuAfricain.jpg",
      link: "/menuafricain",
    },
    {
      title: "food's street",
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
      image: "./mouellecholocalt.png",
      link: "/dessert",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#75db5b] to-[#0a1a05] py-16 px-4">
      <style>{`
        @keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(0.5deg);
  }
  50% {
    transform: translateY(-5px) rotate(-0.5deg);
  }
  75% {
    transform: translateY(-15px) rotate(0.3deg);
  }
}

/* Par défaut : animation active */
.float {
  animation: float 4s ease-in-out infinite;
}

/* 🔴 Sur mobile (largeur <= 768px), on désactive */
@media (max-width: 768px) {
  .float {
    animation: none !important;
    transform: none !important;
  }
}

      `}</style>

      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-5xl font-bold text-[#272926]">
          Nos Menus
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#272926] to-transparent mx-auto mb-4"></div>
        </h2>

        {/* Grille responsive des cartes */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 hover:z-10"
            >
              <MenuCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingMenuSection;
