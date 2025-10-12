import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Facebook, Instagram, Twitter } from 'lucide-react';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  MapPinIcon,
  PhoneIcon, 
  EnvelopeIcon
} from "@heroicons/react/24/solid";
import { useCart } from "./context/CartContext";

const navLinks = [
  { href: "/", label: "Accueil" },
  // { href: "#", label: "nos produits", hasSubmenu: true },
  { href: "/Menu", label: "Menu" },
  { href: "/Gallery", label: "Gallery" },
  { href: "/about", label: "à propos" },
  { href: "/contact", label: "contact" }
];
// const navprod = [
//   { href: "/sillure-chat", label: "Sillure" },
//   { href: "/crabe", label: "Crabe" },
//   { href: "/tilapia", label: "Tilapia" }
// ];

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
   const [scrolled, setScrolled] = useState(false);
  const cartItemCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  



  const toggleMenu = () => setIsOpen(!isOpen);

  
  // Ajout d'un event listener pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
   const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-blue-400" }
  ];

  const contactInfo = [
    { icon: MapPinIcon, text: "40 Rue de Thermes, 62100 Calais, France" },
    { icon: PhoneIcon, text: "+33 6 41 92 48 03" },
    { icon: EnvelopeIcon, text: "mamafood.s@yahoo.com" }
  ];

  return (
    <div className="flex flex-col min-h-screen">

      <div
        className={`flex flex-col min-h-screen `}
      >
       {/* Header principal */}
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#020701]/95 backdrop-blur-md shadow-2xl border-b border-[#4bb930]/30' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo premium avec animation */}
            <NavLink 
              to="/" 
              className="group relative"
            >
              <div className="relative z-10 flex items-center gap-3">
                {/* Icône décorative */}
                <div className="w-10 h-10 bg-gradient-to-br from-[#4bb930] to-[#5cd93e] rounded-lg flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                
                {/* Nom du restaurant */}
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#4bb930] to-[#5cd93e] bg-clip-text text-transparent group-hover:from-[#5cd93e] group-hover:to-[#4bb930] transition-all duration-500">
                  Mama Food's
                </span>
              </div>
              
              {/* Effet lumineux */}
              <div className="absolute inset-0 bg-[#4bb930]/20 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150"></div>
            </NavLink>

            {/* Navigation desktop avec largeur fixe */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className="group relative px-6 py-3 font-medium text-base overflow-hidden"
                  style={{
                    width: '140px',
                    textAlign: 'center'
                  }}
                >
                  {/* Fond animé au survol */}
                  <span className="absolute inset-0 bg-gradient-to-r from-[#4bb930] to-[#5cd93e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-xl"></span>
                  
                  {/* Point indicateur en haut */}
                  <span className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#4bb930] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></span>
                  
                  {/* Texte */}
                  <span className="relative z-10 text-[#4bb930] group-hover:text-white transition-colors duration-300">
                    {link.label}
                  </span>

                  {/* Effet de brillance */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </NavLink>
              ))}
            </nav>

            {/* Actions (Menu + Panier) */}
            <div className="flex items-center gap-3">
              {/* Bouton Menu Mobile */}
              <button
                onClick={toggleMenu}
                className="lg:hidden relative p-3 text-[#4bb930] hover:text-white focus:outline-none transition-all duration-300 group rounded-xl overflow-hidden"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {/* Fond au survol */}
                <span className="absolute inset-0 bg-gradient-to-br from-[#4bb930] to-[#5cd93e] transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
                
                {isOpen ? (
                  <XMarkIcon className="h-7 w-7 relative z-10 transform rotate-0 group-hover:rotate-90 transition-transform duration-500" />
                ) : (
                  <Bars3Icon className="h-7 w-7 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                )}
              </button>

              {/* Bouton Panier premium */}
              <NavLink
                to="/panier"
                className="group relative flex items-center gap-2 px-5 py-3 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl"
                style={{ minWidth: '120px' }}
              >
                {/* Fond dégradé au survol */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#4bb930] to-[#5cd93e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                
                {/* Bordure lumineuse */}
                <span className="absolute inset-0 border-2 border-[#4bb930] rounded-xl group-hover:border-transparent transition-colors duration-500"></span>
                
                {/* Contenu */}
                <div className="relative z-10 flex items-center gap-2">
                  {/* Icône panier */}
                  <div className="relative">
                    <ShoppingCartIcon className="h-6 w-6 text-[#4bb930] group-hover:text-white transform group-hover:scale-110 transition-all duration-500" />
                    
                    {/* Badge compteur */}
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform duration-300">
                        {cartItemCount}
                      </span>
                    )}
                  </div>

                  {/* Texte */}
                  <span className="font-semibold text-base text-[#4bb930] group-hover:text-white transition-colors duration-300">
                    Panier
                  </span>
                </div>

                {/* Effet de brillance */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </NavLink>
            </div>
          </div>
        </div>

      
      </header>

      {/* Menu latéral mobile fullscreen */}
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-500 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Menu latéral avec design amélioré */}
      <nav
        className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-gradient-to-br from-[#020701] via-[#0a1a05] to-[#020701] z-50 transform transition-all duration-500 shadow-2xl lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* En-tête du menu latéral */}
        <div className="border-b border-[#4bb930]/30 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4bb930] to-[#5cd93e] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-white">Menu</span>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#4bb930] hover:text-white hover:bg-[#4bb930]/20 rounded-lg transition-all duration-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Liens de navigation */}
        <div className="flex flex-col gap-2 p-6 overflow-y-auto h-[calc(100%-200px)]">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.href}
              to={link.href}
              className="group relative px-6 py-4 rounded-xl text-white font-medium text-lg transition-all duration-300 hover:translate-x-2 overflow-hidden"
              onClick={() => setIsOpen(false)}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              {/* Fond au survol */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#4bb930] to-[#5cd93e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-xl"></span>
              
              {/* Bordure */}
              <span className="absolute inset-0 border border-[#4bb930]/30 group-hover:border-transparent rounded-xl transition-colors duration-300"></span>
              
              {/* Texte */}
              <span className="relative z-10">{link.label}</span>
              
              {/* Flèche */}
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                →
              </span>
            </NavLink>
          ))}
        </div>

        {/* Boutons CTA en bas */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#4bb930]/30 bg-[#020701]/80 backdrop-blur-md">
          <div className="flex flex-col gap-3">
            <NavLink
              to="/reservation"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4bb930] to-[#5cd93e] text-white font-semibold text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Réserver une table
            </NavLink>
            <NavLink
              to="/menu"
              className="px-6 py-3 rounded-xl border-2 border-[#4bb930] text-[#4bb930] font-semibold text-center hover:bg-[#4bb930] hover:text-white transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Commander en ligne
            </NavLink>
          </div>
        </div>
      </nav>
        <main>
        <Outlet />
        </main>
      <footer className="relative bg-gradient-to-b from-[#0a1a05] via-[#020701] to-black text-white py-16 overflow-hidden">
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#4bb930] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#5cd93e] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#4bb930] rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Colonne 1: Logo et Description */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4bb930] to-[#5cd93e] rounded-lg flex items-center justify-center shadow-lg transform hover:rotate-12 hover:scale-110 transition-all duration-500">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4bb930] to-[#5cd93e] bg-clip-text text-transparent">
                Mama Food's
              </h2>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Découvrez l'authenticité de la cuisine africaine dans une ambiance chaleureuse et conviviale. Des saveurs qui racontent une histoire.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex justify-center lg:justify-start gap-3">
              {socialLinks.map((social) => (
                <NavLink
                  key={social.label}
                  to={social.href}
                  className={`group relative w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                  
                  {/* Effet de brillance */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-lg"></span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Colonne 2: Navigation rapide */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-6 text-[#4bb930]">Navigation Rapide</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className="group relative inline-block py-2 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Soulignement animé */}
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#4bb930] to-[#5cd93e] group-hover:w-full transition-all duration-300"></span>
                  
                  {/* Flèche qui apparaît */}
                  <span className="inline-block ml-1 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#4bb930]">
                    →
                  </span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Colonne 3: Contact */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold mb-6 text-[#4bb930]">Contactez-nous</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 text-gray-300 hover:text-white transition-all duration-300 justify-center lg:justify-start"
                >
                  <div className="w-10 h-10 bg-[#4bb930]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#4bb930]/40 transition-all duration-300">
                    <info.icon className="w-5 h-5 text-[#4bb930] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-sm leading-relaxed pt-2">{info.text}</span>
                </div>
              ))}
            </div>

            {/* Horaires d'ouverture */}
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-[#4bb930]/20 hover:border-[#4bb930]/50 transition-all duration-300">
              <h4 className="text-sm font-semibold text-[#4bb930] mb-2">Horaires d'ouverture</h4>
              <p className="text-xs text-gray-400">Lun - Dim: 11h00 - 23h00</p>
            </div>
          </div>
        </div>

        {/* Séparateur décoratif */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-[#4bb930]/50 to-transparent mb-8"></div>

        {/* Section CTA */}
        <div className="bg-gradient-to-r from-[#4bb930]/10 to-[#5cd93e]/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-[#4bb930]/20 hover:border-[#4bb930]/40 transition-all duration-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Prêt à savourer ?</h3>
              <p className="text-gray-400">Commandez en ligne ou réservez votre table dès maintenant</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink
                to="/menu"
                className="group relative px-8 py-3 bg-gradient-to-r from-[#4bb930] to-[#5cd93e] text-white font-semibold rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#4bb930]/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Commander</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </NavLink>

              <NavLink
                to="/reservation"
                className="group relative px-8 py-3 border-2 border-[#4bb930] text-[#4bb930] font-semibold rounded-xl overflow-hidden hover:bg-[#4bb930] hover:text-white transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Réserver</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Copyright et mentions légales */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#4bb930]/20">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} <span className="text-[#4bb930] font-semibold">Mama Food's</span>. Tous droits réservés.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-gray-400">
            <NavLink to="/privacy" className="hover:text-[#4bb930] transition-colors duration-300">
              Confidentialité
            </NavLink>
            <span className="text-gray-600">|</span>
            <NavLink to="/terms" className="hover:text-[#4bb930] transition-colors duration-300">
              Conditions d'utilisation
            </NavLink>
            <span className="text-gray-600">|</span>
            <NavLink to="/cookies" className="hover:text-[#4bb930] transition-colors duration-300">
              Cookies
            </NavLink>
          </div>
        </div>
      </div>

      {/* Pattern décoratif en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4bb930] via-[#5cd93e] to-[#4bb930]"></div>
    </footer>
      </div>
    </div>
  );
};
export default Layout;
