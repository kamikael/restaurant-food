import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Star } from "lucide-react";
import {
  ChevronDownIcon,
  SparklesIcon,
  FireIcon,
  ClockIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import FloatingMenuSection from "../components/menuSection";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home: React.FC = () => {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const testimonials = [
    {
      id: 1,
      name: "Sophie Martin",
      comment:
        "Une expérience culinaire exceptionnelle ! Les plats sont délicieux et authentiques. L'ambiance chaleureuse et le service impeccable font de ce restaurant mon préféré à Cotonou.",
      rating: 5,
      avatar: "./avatar.png",
    },
    {
      id: 2,
      name: "Jean Kouassi",
      comment:
        "J'y vais régulièrement et je ne suis jamais déçu. Le yassa poulet est un délice et les portions sont généreuses. L'équipe est accueillante et professionnelle.",
      rating: 5,
      avatar: "./avatar.png",
    },
    {
      id: 3,
      name: "Marie Dosso",
      comment:
        "Restaurant à découvrir absolument ! La qualité des ingrédients, la préparation soignée et les saveurs authentiques en font une adresse incontournable. Bravo au chef !",
      rating: 5,
      avatar: "./avatar.png",
    },
  ];
  useEffect(() => {
    imagesRef.current.forEach((img) => {
      if (img && img.naturalHeight > img.naturalWidth) {
        // Si l'image est plus haute que large, on la tourne en rectangle
        img.classList.add("rotate-90", "scale-105");
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('./home.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay avec gradients multiples */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>

        {/* Effet de grille subtile */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>

        {/* Particules flottantes décoratives */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-400/20 rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-amber-300/20 rounded-full animate-pulse delay-200"></div>
          <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-green-300/20 rounded-full animate-pulse delay-300"></div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-4xl">
            {/* Titre principal avec animation */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-none mb-6 animate-slide-up">
              <span className="block bg-gradient-to-r from-white via-amber-50 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Cuisine
              </span>
              <span className="block bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl mt-2">
                Africaine
              </span>
            </h1>

            {/* Sous-titre élégant */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mb-10 leading-relaxed animate-fade-in-delay">
              Découvrez l'authenticité des saveurs africaines dans une
              expérience culinaire unique et raffinée.
            </p>

            {/* Informations rapides */}
            <div className="flex flex-wrap items-center gap-6 mb-12 animate-fade-in-delay-2">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPinIcon className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">40 Rue de Thermes, 62100 Calais, France</span>
              </div>
              <div className="w-px h-6 bg-gray-600 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-gray-300">
                <ClockIcon className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Ouvert 7j/7</span>
              </div>
              <div className="w-px h-6 bg-gray-600 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-gray-300">
                <FireIcon className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-medium">
                  Cuisine traditionnelle
                </span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
              <NavLink
                to="/menu"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#218808] to-green-700 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 overflow-hidden"
              >
                {/* Effet de brillance au survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <SparklesIcon className="w-5 h-5" />
                  Découvrir le menu
                </span>
              </NavLink>

              <NavLink
                to="/reservation"
                className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-bold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-500 shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  Réserver une table
                  <ChevronDownIcon className="w-5 h-5 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                </span>
              </NavLink>
            </div>

            {/* Indicateurs sociaux */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10 animate-fade-in-delay-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-400">Clients satisfaits</div>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">4.8★</div>
                <div className="text-sm text-gray-400">Note moyenne</div>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-sm text-gray-400">Plats signature</div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Défiler
            </span>
            <ChevronDownIcon className="w-6 h-6 text-white/60" />
          </div>
        </div>

        {/* Décorations géométriques */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-amber-400/10 rounded-full animate-spin-slow hidden lg:block"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border-2 border-green-400/10 rounded-full animate-spin-slow-reverse hidden lg:block"></div>
      </section>

      {/* Section Mission */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* Décorations de fond */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            {/* Texte */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <HeartIcon className="w-5 h-5 text-[#218808]" />
                <span className="text-[#218808] font-semibold text-sm">
                  Notre engagement
                </span>
              </div>

              {/* Titre */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
                Notre{" "}
                <span className="bg-gradient-to-r from-[#218808] to-green-600 bg-clip-text text-transparent">
                  Mission
                </span>
              </h2>

              {/* Description principale */}
              <p className="text-lg text-gray-700 leading-relaxed">
                Chez <strong className="text-[#218808]">Mama Food's</strong>,
                notre mission est de faire voyager vos papilles à travers
                l'authenticité des plats africains. Nous nous engageons à
                partager la richesse culinaire du continent.
              </p>

              {/* Points clés avec icônes */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#218808] flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    <strong className="text-gray-900">
                      Authenticité garantie
                    </strong>{" "}
                    - Recettes traditionnelles préparées avec des ingrédients
                    frais et locaux
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#218808] flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    <strong className="text-gray-900">
                      Expérience gastronomique
                    </strong>{" "}
                    - Goût, convivialité et générosité dans chaque plat
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#218808] flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    <strong className="text-gray-900">
                      Lien culturel fort
                    </strong>{" "}
                    - Une atmosphère chaleureuse où hospitalité et partage sont
                    au cœur
                  </p>
                </div>
              </div>

              {/* Citation mise en avant */}
              <div className="relative pl-6 border-l-4 border-[#218808] py-2">
                <p className="text-xl italic text-gray-800 font-medium">
                  "Chaque plat raconte une histoire, inspirée des saveurs
                  transmises de génération en génération."
                </p>
              </div>

              {/* Bouton CTA */}
              <div className="flex items-center gap-4 pt-4">
                <NavLink
                  to="/about"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#218808] text-white font-bold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  En savoir plus
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>

                {/* Statistique */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
                      <StarIcon className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-400 border-2 border-white flex items-center justify-center">
                      <HeartIcon className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      500+ clients
                    </p>
                    <p className="text-xs text-gray-600">satisfaits</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image avec effets */}
            <div className="w-full md:w-1/2">
              <div className="relative group">
                {/* Cadre décoratif */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#218808] to-green-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>

                {/* Image principale */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="/porte.png"
                    alt="Restaurant Mama Food's - Ambiance chaleureuse"
                    loading="lazy"
                    className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay avec dégradé */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Badge sur l'image */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Depuis 2015</p>
                        <p className="text-xl font-bold text-[#218808]">
                          Tradition & Qualité
                        </p>
                      </div>
                      <SparklesIcon className="w-8 h-8 text-amber-500" />
                    </div>
                  </div>
                </div>

                {/* Éléments décoratifs flottants */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400 rounded-full opacity-30 blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-400 rounded-full opacity-30 blur-2xl animate-pulse delay-100"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Cuisine */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Décorations de fond */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl"></div>

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-16">
            {/* Texte */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full">
                <FireIcon className="w-5 h-5 text-orange-600" />
                <span className="text-orange-600 font-semibold text-sm">
                  Saveurs authentiques
                </span>
              </div>

              {/* Titre */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
                Notre{" "}
                <span className="bg-gradient-to-r from-orange-600 to-[#218808] bg-clip-text text-transparent">
                  Cuisine
                </span>
              </h2>

              {/* Description principale */}
              <p className="text-lg text-gray-700 leading-relaxed">
                La cuisine africaine est un art qui puise sa force dans la
                terre, les traditions et le partage. Chez{" "}
                <strong className="text-[#218808]">Mama Food's</strong>, nous
                faisons revivre cette richesse culinaire à travers des plats
                authentiques.
              </p>

              {/* Caractéristiques en grille */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <SparklesIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Épices parfumées
                  </h3>
                  <p className="text-sm text-gray-600">Sélection rigoureuse</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <HeartIcon className="w-6 h-6 text-[#218808]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Préparation passionnée
                  </h3>
                  <p className="text-sm text-gray-600">
                    Savoir-faire traditionnel
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                    <FireIcon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Cuisson maîtrisée
                  </h3>
                  <p className="text-sm text-gray-600">
                    Techniques ancestrales
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <StarIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Présentation soignée
                  </h3>
                  <p className="text-sm text-gray-600">Expérience unique</p>
                </div>
              </div>

              {/* Citation */}
              <div className="relative pl-6 border-l-4 border-orange-500 py-2">
                <p className="text-xl italic text-gray-800 font-medium">
                  "Une cuisine originale, vivante et généreuse qui raconte
                  l'Afrique et son goût incomparable."
                </p>
              </div>

              {/* Bouton CTA */}
              <div className="flex items-center gap-4 pt-4">
                <NavLink
                  to="/menu"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-[#218808] text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Découvrir le menu
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>

                {/* Note */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-5 h-5 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">4.8/5</span>
                </div>
              </div>
            </div>

            {/* Image avec effets */}
            <div className="w-full md:w-1/2">
              <div className="relative group">
                {/* Cadre décoratif */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-[#218808] rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>

                {/* Image principale */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="/poisson.jpg"
                    alt="Poisson grillé - Spécialité Mama Food's"
                    loading="lazy"
                    className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay avec dégradé */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Badge sur l'image */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Plat signature</p>
                        <p className="text-xl font-bold text-[#218808]">
                          Poisson Braisé
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <FireIcon className="w-6 h-6 text-orange-500" />
                        <span className="text-2xl">🔥</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges flottants */}
                <div className="absolute top-6 right-6 bg-white rounded-full px-4 py-2 shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <p className="text-sm font-bold text-[#218808]">100% Frais</p>
                </div>

                {/* Éléments décoratifs flottants */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-orange-400 rounded-full opacity-30 blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-400 rounded-full opacity-30 blur-2xl animate-pulse delay-100"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-20 overflow-hidden">
        {/* Fond avec gradient complexe */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a6606] via-[#218808] to-[#2a9a0f]"></div>

        {/* Motif de fond décoratif */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Éléments décoratifs animés */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl animate-pulse delay-100"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse delay-200"></div>

        {/* Formes géométriques */}
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white/20 rounded-lg rotate-12 hidden lg:block"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 border-2 border-white/20 rounded-full hidden lg:block"></div>

        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Contenu textuel */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              {/* Badge décoratif */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <SparklesIcon className="w-5 h-5 text-amber-300" />
                <span className="text-white font-semibold text-sm">
                  Expérience authentique
                </span>
              </div>

              {/* Titre principal */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Venez déguster les{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">meilleurs plats</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-amber-400/40 -rotate-1"></span>
                </span>{" "}
                d'Afrique
              </h2>

              {/* Sous-titre */}
              <p className="text-lg sm:text-xl text-green-50 max-w-2xl mx-auto lg:mx-0">
                Une cuisine authentique, des saveurs inoubliables et une
                ambiance chaleureuse vous attendent
              </p>

              {/* Informations complémentaires */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2">
                <div className="flex items-center gap-2 text-white/90">
                  <MapPinIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">40 Rue de Thermes, 62100 Calais, France</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-white/30"></div>
                <div className="flex items-center gap-2 text-white/90">
                  <CalendarDaysIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Ouvert 7j/7</span>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Bouton principal */}
              <NavLink
                to="/reservation"
                className="group relative px-8 py-5 bg-white text-[#218808] font-bold rounded-2xl shadow-2xl hover:shadow-white/30 transition-all duration-300 overflow-hidden"
              >
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                <span className="relative flex items-center justify-center gap-2 text-lg">
                  <CalendarDaysIcon className="w-6 h-6" />
                  Réserver une table
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </NavLink>

              {/* Bouton secondaire */}
              <NavLink
                to="/menu"
                className="group px-8 py-5 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-[#218808] transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2 text-lg">
                  Voir le menu
                  <SparklesIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </NavLink>
            </div>
          </div>

          {/* Section statistiques en bas */}
          <div className="mt-16 pt-10 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-white">500+</div>
                <div className="text-sm text-green-100">Clients satisfaits</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-white">15+</div>
                <div className="text-sm text-green-100">Plats signature</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-white">4.8★</div>
                <div className="text-sm text-green-100">Note moyenne</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-white">100%</div>
                <div className="text-sm text-green-100">Produits frais</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vague décorative en bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 fill-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full h-full py-2">
        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Colonne gauche */}
          <div className="grid grid-rows-3 gap-2">
            {/* Grande image avec overlay */}
            <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
              <img
                src="/inter.png"
                alt="Restaurant intérieur"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-4 left-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-lg font-semibold">Notre Restaurant</p>
                </div>
              </div>
            </div>

            {/* Deux petites images côte à côte */}
            <div className="grid grid-cols-2 gap-2">
              <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
                <img
                  src="/tartecitron.jpg"
                  alt="Yassa poulet"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-125 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                    tarte au citron
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
                <img
                  src="/mouellecholocalt.jpg"
                  alt="Porc Bongo"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-125 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                    mouelle au chocola
                  </span>
                </div>
              </div>
            </div>

            {/* Moyenne image */}
            <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
              <img
                src="/pouletBraisé.jpg"
                alt="Poulet braisé"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-4 left-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-lg font-semibold">Poulet Braisé</p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="grid grid-rows-2 gap-2">
            {/* Deux petites images côte à côte */}
            <div className="grid grid-cols-2 gap-2">
              <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
                <img
                  src="/porcbraisé.jpg"
                  alt="Porc braisé"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-125 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                    Porc Braisé
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
                <img
                  src="/saucisse.png"
                  alt="Samoussa"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-125 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                   saucisse
                  </span>
                </div>
              </div>
            </div>

            {/* Grande image qui prend deux hauteurs */}
            <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
              <img
                src="/poisson.jpg"
                alt="Poisson grillé"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xl font-semibold">Poisson Grillé</p>
                  <p className="text-sm opacity-90 mt-1">Fraîchement préparé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section de preuve */}
      <section
        id="products"
        className="container mx-auto px-4 py-16 flex flex-col gap-12 mb-16"
      >
        {/* Title avec animation subtile */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#218808] mb-4 hover:scale-105 transition-transform duration-300 inline-block">
            Avis de nos Clients
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#218808] to-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Voici ce que disent nos clients à propos de leur expérience.
          </p>
        </div>

        {/* Avis avec effets améliorés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative flex flex-col items-center justify-center gap-4 px-6 py-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100 hover:border-[#218808]/30"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Effet de brillance au survol */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#218808]/0 via-[#218808]/5 to-[#218808]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icône de citation décorative */}
              <div className="absolute top-4 right-4 text-[#218808]/10 group-hover:text-[#218808]/20 transition-colors duration-300">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
              </div>

              {/* Avatar avec animation */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#218808] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="relative w-20 h-20 rounded-full border-4 border-[#218808] shadow-md object-cover transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                />
              </div>

              {/* Étoiles de notation */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400 transform group-hover:scale-125 transition-transform duration-300"
                    style={{
                      transitionDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>

              {/* Commentaire */}
              <p className="relative z-10 text-center text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                {testimonial.comment}
              </p>

              {/* Nom avec effet souligné */}
              <div className="relative">
                <h3 className="text-[#218808] text-xl font-semibold group-hover:text-[#1a6606] transition-colors duration-300">
                  {testimonial.name}
                </h3>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#218808] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>

              {/* Badge "Client vérifié" qui apparaît au survol */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1">
                <span className="bg-[#218808] text-white text-xs px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                  ✓ Client vérifié
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <FloatingMenuSection />
    </div>
  );
};

export default Home;
