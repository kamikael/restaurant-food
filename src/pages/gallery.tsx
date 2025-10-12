import { useState } from "react";
import { X, ZoomIn, Camera, Sparkles, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";


type GalleryImage = { src: string; category: string; title: string };

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const galleryImages: GalleryImage[] = [
    // Images décoratives du restaurant
  { src: "./porte.png", category: "Restaurant", title: "Notre espace" },
  { src: "./yassa.jpg", category: "Viande", title: "Poulet Yassa" },
  { src: "./mafé.jpg", category: "Viande", title: "Poulet Mafé" },
  { src: "./pouletBraisé.jpg", category: "Viande", title: "Poulet Braisé" },
  { src: "./ailepoulet.jpg", category: "Viande", title: "Ailes de Poulet" },
  { src: "./porcbraisé.jpg", category: "Viande", title: "Porc Braisé" },
  { src: "./porcBongo.jpg", category: "Viande", title: "Porc Bongo" },
  { src: "./bongoviande.jpg", category: "Viande", title: "Bongo Viande" },
  { src: "./poisson.jpg", category: "Poisson", title: "Maquereau Braisé" },
  { src: "./doradeBraisé.jpg", category: "Poisson", title: "Dorade Braisée" },
  { src: "./tilapiaBraisé.jpg", category: "Poisson", title: "Tilapia Braisé" },
  { src: "./barBraisé.jpg", category: "Poisson", title: "Bar Braisé" },
  { src: "./riz.jpg", category: "Accompagnement", title: "Riz Blanc Nature" },
  { src: "./aloko.jpg", category: "Accompagnement", title: "Aloko" },
  { src: "./atiéké.png", category: "Accompagnement", title: "Attiéké" },
  { src: "./ignameFri.jpg", category: "Accompagnement", title: "Igname Frit" },
  { src: "./plantaintapé.jpg", category: "Accompagnement", title: "Plantain Tapé/Bouilli" },
  { src: "./manioc.jpg", category: "Accompagnement", title: "Manioc" },
  { src: "./baton.jpg", category: "Accompagnement", title: "Bâton de Manioc" },
  { src: "./gari.jpg", category: "Accompagnement", title: "Futu de Gari" },
  { src: "./semoule.jpg", category: "Accompagnement", title: "Semoule" },
  { src: "./foufou.jpg", category: "Accompagnement", title: "Foufou" },
  { src: "./bissap.jpg", category: "Boisson", title: "Bissap" },
  { src: "./vin.jpg", category: "Boisson", title: "Vin" },
  { src: "./jusGingembre.jpg", category: "Boisson", title: "Jus de Gingembre" },
  { src: "./samoussa.jpg", category: "Entrée", title: "Samoussa d'Agneau" },
  { src: "./samoussaPoulet.jpg", category: "Entrée", title: "Samoussa Poulet" },
  { src: "./samoussaLegume.jpg", category: "Entrée", title: "Samoussa aux Légumes" },
  { src: "./boulette.jpg", category: "Entrée", title: "Boulette de Viande" },
  { src: "./beignet.jpg", category: "Entrée", title: "Beignet de Morue" },
  { src: "./roulo.jpg", category: "Entrée", title: "Rouleaux de Légumes" },
  { src: "./boeuf.jpg", category: "Viande", title: "Brochette de Bœuf" },
  { src: "./bporc.jpg", category: "Viande", title: "Brochette de Porc" },
  
];


  return (
    <main className="bg-gradient-to-b from-[#0a1a05] via-[#020701] to-[#0a1a05]">
      {/* Hero Section Enhanced */}
      <section
        className="relative h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/resto.jpg')" }}
      >
        {/* Overlay avec gradient complexe */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        
        {/* Effet de grille animée */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 text-center py-15 px-6 max-w-5xl mx-auto">
          {/* Badge décoratif */}
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#218808]/20 backdrop-blur-md rounded-full border border-[#218808]/40 mb-6 animate-pulse">
            <Camera className="w-5 h-5 text-[#218808]" />
            <span className="text-[#218808] font-medium tracking-wide">Explorez notre univers</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Notre Galerie
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Plongez dans l'univers de notre restaurant à travers des images qui
            racontent notre histoire et nos saveurs.
          </p>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#218808]" />
            <Sparkles className="w-5 h-5 text-[#218808] animate-pulse" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#218808]" />
          </div>
        </div>

        {/* Flèche de défilement */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Grid Gallery Enhanced */}
      <section className="container mx-auto px-6 py-24">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-[#218808] via-green-500 to-[#218808] bg-clip-text mb-4">
            Moments Capturés
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Chaque image raconte une histoire, chaque plat est une œuvre d'art
          </p>
        </div>

        {/* Grille masonry-style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
              style={{
                animation: `fadeInScale 0.8s ease-out ${idx * 0.1}s both`
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedImage(item)}
            >
              {/* Image avec effet de zoom */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-125"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Overlay de couleur au survol */}
                <div className="absolute inset-0 bg-[#218808]/0 group-hover:bg-[#218808]/30 transition-all duration-500"></div>
              </div>

              {/* Contenu superposé */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Badge catégorie */}
                <div className="mb-3 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  <span className="inline-block px-3 py-1 bg-[#218808]/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-bold text-white mb-2 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {item.title}
                </h3>

                {/* Bouton d'action */}
                <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <ZoomIn className="w-5 h-5" />
                  <span className="text-sm font-medium">Agrandir</span>
                </div>
              </div>

              {/* Effet de brillance */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ${
                  hoveredIndex === idx ? 'translate-x-full' : '-translate-x-full'
                }`}
                style={{ width: '50%' }}
              />

              {/* Bordure animée */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#218808]/50 transition-all duration-500"></div>

              {/* Coins décoratifs */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          <div className="max-w-5xl max-h-[90vh] animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-2 bg-[#218808]/90 text-white text-sm font-semibold rounded-full mb-3">
                {selectedImage.category}
              </span>
              <h3 className="text-3xl font-bold text-white">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section Enhanced */}
      <section className="relative bg-gradient-to-br from-[#218808] via-green-700 to-[#1a6b06] text-white py-24 overflow-hidden">
        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Formes décoratives */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium tracking-wide">Expérience unique</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Une ambiance qui n'attend que vous
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto mb-10 text-white/90 leading-relaxed">
            Découvrez par vous-même et vivez l'expérience culinaire unique que
            nous offrons. Chaque visite est une nouvelle histoire.
          </p>
          
          <NavLink
            to="/reservation"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#218808] font-bold text-lg shadow-2xl hover:shadow-3xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 group"
          >
            <span>Réserver une table</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </NavLink>

          {/* Badges informatifs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <div className="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm">🍽️ Cuisine raffinée</span>
            </div>
            <div className="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm">✨ Ambiance chaleureuse</span>
            </div>
            <div className="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm">🎵 Moments inoubliables</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </main>
  );
}