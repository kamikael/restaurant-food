import { Award, Heart, Users, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function About() {
  const teamMembers = [
    {
      name: "Jean Dupont",
      role: "Notre Chef",
      image: "./avatar.png",
      description: "15 ans d'expérience culinaire",
    },
    {
      name: "marlyse kend",
      role: "Gérante du Restaurant",
      image: "./avatar.png",
      description: "Passionnée par la cuisine africaine",
    }
  
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Chaque plat est préparé avec amour et dévouement",
    },
    {
      icon: Award,
      title: "Qualité",
      description: "Des ingrédients frais et sélectionnés avec soin",
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Un lieu de partage et de convivialité",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Une cuisine qui évolue tout en respectant la tradition",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Section Hero avec parallaxe */}
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/porte.png')" }}
      >
        {/* Overlay dégradé amélioré */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a05] via-[#020701] to-[#0a1a05]"></div>

        {/* Effet de particules */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-[#4bb930] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#5cd93e] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in">
            À propos de{" "}
            <span className="bg-gradient-to-r from-[#4bb930] to-[#5cd93e] bg-clip-text text-transparent">
              Mama Food's
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#4bb930] to-[#5cd93e] mx-auto mb-6"></div>
          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Découvrez l'histoire, la passion et l'engagement qui se cachent
            derrière notre cuisine authentique africaine.
          </p>

          {/* Bouton CTA Hero */}
          <div className="mt-10">
            <button className="inline-block px-8 py-4 bg-gradient-to-r from-[#4bb930] to-[#5cd93e] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#4bb930]/50 hover:scale-105 transition-all duration-300">
              Découvrir notre histoire
            </button>
          </div>
        </div>

        {/* Flèche scroll */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Notre histoire */}
      <section id="histoire" className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="./porte.png"
                alt="Notre restaurant"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-center">
            <span className="inline-block px-4 py-2 bg-[#4bb930]/10 text-[#4bb930] rounded-full text-sm font-semibold mb-4 w-fit">
              Notre Histoire
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Une histoire de <span className="text-[#4bb930]">passion</span> et
              de <span className="text-[#4bb930]">saveurs</span>
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed text-lg">
              Depuis notre ouverture, nous avons toujours eu une mission simple
              : proposer une expérience culinaire authentique inspirée des
              saveurs d'Afrique et d'ailleurs.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Chaque plat raconte une histoire, chaque ingrédient est choisi
              avec soin pour vous offrir le meilleur. Notre voyage culinaire
              commence dans les marchés locaux et se termine dans votre
              assiette.
            </p>
            <NavLink
              to="/menu"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#4bb930] text-white rounded-full hover:bg-[#3a9606] transition-all duration-300 hover:shadow-xl hover:shadow-[#4bb930]/30 w-fit overflow-hidden"
            >
              <span className="relative z-10">Découvrir notre menu</span>
              <svg
                className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-gradient-to-br from-gray-100 to-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#4bb930]/10 text-[#4bb930] rounded-full text-sm font-semibold mb-4">
              Nos Valeurs
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce qui nous rend <span className="text-[#4bb930]">uniques</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des principes qui guident chacune de nos actions au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-[#4bb930]/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#4bb930] to-[#5cd93e] rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4bb930] transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre mission */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 flex flex-col justify-center order-2 md:order-1">
            <span className="inline-block px-4 py-2 bg-[#4bb930]/10 text-[#4bb930] rounded-full text-sm font-semibold mb-4 w-fit">
              Notre Mission
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Plus qu'un repas, une{" "}
              <span className="text-[#4bb930]">expérience</span>
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              Nous croyons qu'un bon repas est plus qu'une simple nourriture. Il
              s'agit d'un moment de partage, d'un voyage des sens et d'une
              célébration de la culture.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Notre équipe s'engage à vous offrir des plats créés à partir
              d'ingrédients frais, locaux et importés avec soin. Chaque assiette
              est une œuvre d'art culinaire.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-[#4bb930]/5 rounded-xl hover:bg-[#4bb930]/10 transition-colors duration-300">
                <p className="text-3xl font-bold text-[#4bb930] mb-1">500+</p>
                <p className="text-sm text-gray-600">Plats servis/mois</p>
              </div>
              <div className="text-center p-4 bg-[#4bb930]/5 rounded-xl hover:bg-[#4bb930]/10 transition-colors duration-300">
                <p className="text-3xl font-bold text-[#4bb930] mb-1">4.8</p>
                <p className="text-sm text-gray-600">Note moyenne</p>
              </div>
              <div className="text-center p-4 bg-[#4bb930]/5 rounded-xl hover:bg-[#4bb930]/10 transition-colors duration-300">
                <p className="text-3xl font-bold text-[#4bb930] mb-1">15+</p>
                <p className="text-sm text-gray-600">Années d'expérience</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 order-1 md:order-2 group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="./foodstreet.jpg"
                alt="Mission"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* L'équipe */}
      <section className="bg-gradient-to-br from-white to-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#4bb930]/10 text-[#4bb930] rounded-full text-sm font-semibold mb-4">
              Notre Équipe
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Rencontrez les <span className="text-[#4bb930]">artistes</span>{" "}
              derrière les plats
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des professionnels passionnés qui travaillent ensemble pour votre
              satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
              >
                {/* Fond dégradé qui apparaît */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4bb930]/0 to-[#5cd93e]/0 group-hover:from-[#4bb930]/5 group-hover:to-[#5cd93e]/5 transition-all duration-500"></div>

                <div className="relative p-8 flex flex-col items-center text-center">
                  {/* Avatar avec bordure animée */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4bb930] to-[#5cd93e] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#4bb930] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[#4bb930] font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.description}</p>

                  {/* Badge décoratif */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-[#4bb930] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="relative bg-gradient-to-br from-[#4bb930] to-[#2a7506] text-white py-24 overflow-hidden">
        {/* Patterns décoratifs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Venez découvrir notre univers
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90">
            Réservez une table et plongez dans une expérience culinaire unique
            qui allie tradition et modernité.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/reservation"
              className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#4bb930] rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">Réserver maintenant</span>
              <svg
                className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4bb930]/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </NavLink>

            <NavLink
              to="/menu"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#4bb930] transition-all duration-300 hover:scale-105"
            >
              <span>Voir le menu</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
