import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { Camera, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon, ClockIcon, UserGroupIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, CheckCircleIcon, SparklesIcon, GiftIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function ReservationPage() {
  const [date, setDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedPeople, setSelectedPeople] = useState(2);
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: ""
  });

  const formRef = useRef<HTMLFormElement>(null);

  // Configuration EmailJS - À remplacer par vos propres identifiants
  const EMAILJS_SERVICE_ID = "service_alseuoi";
  const EMAILJS_TEMPLATE_ID = "template_58ubfb6";
  const EMAILJS_PUBLIC_KEY = "VBmtMMPVU3-HxWlVP";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setLoading(true);
    setMessage("");

    // Préparer les données du template EmailJS
    const templateParams = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      people: selectedPeople,
      date: date ? date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) : '',
      occasion: selectedOccasion || 'Non spécifiée',
      message: formData.message || 'Aucune demande spéciale',
      // Champs calculés pour le template
      full_name: `${formData.firstname} ${formData.lastname}`,
      reservation_details: `${selectedPeople} personne(s) - ${date ? date.toLocaleString('fr-FR') : 'Date non définie'}`
    };


    interface EmailJSSuccess {
      status: number;
      text: string;
    }

    try {
      // Envoi via EmailJS
      const result: EmailJSSuccess = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email envoyé avec succès:', result);
      setLoading(false);
      setMessage("success");

      // Reset du formulaire après 3 secondes
      setTimeout(() => {
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: ""
        });
        setDate(null);
        setSelectedPeople(2);
        setSelectedOccasion("");
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setLoading(false);
      setMessage("error");
      
      // Afficher le message d'erreur pendant 5 secondes
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const occasions = [
    { value: "anniversaire", label: "🎂 Anniversaire" },
    { value: "romantique", label: "💕 Dîner romantique" },
    { value: "affaires", label: "💼 Repas d'affaires" },
    { value: "famille", label: "👨‍👩‍👧‍👦 Réunion familiale" },
    { value: "autre", label: "✨ Autre occasion" }
  ];

  return (
    <main className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen ">
      {/* Hero Section */}
      <section
              className=" relative py-12 h-[90vh] flex items-center justify-center  bg-cover bg-center"
              style={{ backgroundImage: "url('/resto.jpg')" }}
            >
              {/* Overlay avec gradient complexe */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a05] via-[#020701] to-[#0a1a05]"></div>
              
              {/* Effet de grille animée */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }}></div>
              </div>
      
              <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Badge décoratif */}
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#218808]/20 backdrop-blur-md rounded-full border border-[#218808]/40 mb-6 animate-pulse">
                  <Camera className="w-5 h-5 text-[#218808]" />
                  <span className="text-[#218808] font-medium tracking-wide">  Réservation en lign</span>
                </div>
      
                <h1 className="text-6xl md:text-8xl font-extrabold mb-6">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                     Réservez Votre Table
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                  Une expérience culinaire exceptionnelle vous attend. Réservez dès maintenant et laissez-vous surprendre.
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
       

      {/* Bande d'avantages */}
      <section className="bg-white border-y border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <CheckCircleIcon className="h-10 w-10 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Confirmation Instantanée</h3>
              <p className="text-sm text-gray-600">Recevez votre confirmation par email et SMS</p>
            </div>
            <div className="flex flex-col items-center">
              <GiftIcon className="h-10 w-10 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Offres Spéciales</h3>
              <p className="text-sm text-gray-600">Profitez d'avantages exclusifs pour vos occasions</p>
            </div>
            <div className="flex flex-col items-center">
              <ClockIcon className="h-10 w-10 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Modification Gratuite</h3>
              <p className="text-sm text-gray-600">Changez votre réservation jusqu'à 2h avant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire Principal */}
      <section className="container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <form
            ref={formRef}
            onSubmit={handleReservation}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Complétez votre réservation
              </h2>
              <p className="text-gray-600">Tous les champs sont obligatoires</p>
            </div>

            {/* Message de succès */}
            {message === "success" && (
              <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-2xl flex items-start gap-4">
                <CheckCircleIcon className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-green-900 text-lg mb-1">Réservation confirmée !</h3>
                  <p className="text-green-700 mb-2">
                    Votre table a été réservée avec succès. Vous recevrez un email de confirmation dans quelques instants.
                  </p>
                  <p className="text-sm text-green-600">
                    💡 Pensez à consulter vos spams si vous ne recevez pas l'email
                  </p>
                </div>
              </div>
            )}

            {/* Message d'erreur */}
            {message === "error" && (
              <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-4">
                <XCircleIcon className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 text-lg mb-1">Erreur d'envoi</h3>
                  <p className="text-red-700">
                    Une erreur s'est produite lors de l'envoi de votre réservation. Veuillez réessayer ou nous contacter directement par téléphone au +229 90 00 00 00.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-8">
              {/* Informations personnelles */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 pb-3 border-b">
                  <UserGroupIcon className="h-6 w-6 text-green-600" />
                  Vos informations
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstname" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Prénom *
                    </Label>
                    <Input 
                      type="text" 
                      id="firstname" 
                      name="firstname" 
                      placeholder="Mama" 
                      required 
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className="h-12 border-2 focus:border-green-600 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Nom *
                    </Label>
                    <Input 
                      type="text" 
                      id="lastname" 
                      name="lastname" 
                      placeholder="food's" 
                      required 
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className="h-12 border-2 focus:border-green-600 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <EnvelopeIcon className="h-4 w-4" />
                      Email *
                    </Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="mamafood.s@yahoo.com" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 border-2 focus:border-green-600 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4" />
                      Téléphone *
                    </Label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="+33 6 41 92 48 03" 
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12 border-2 focus:border-green-600 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Détails de réservation */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 pb-3 border-b">
                  <CalendarIcon className="h-6 w-6 text-green-600" />
                  Détails de la réservation
                </h3>

                {/* Nombre de personnes */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Nombre de personnes *
                  </Label>
                  <div className="grid grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSelectedPeople(num)}
                        className={`h-16 rounded-xl font-bold text-lg transition-all border-2 ${
                          selectedPeople === num
                            ? 'bg-green-600 text-white border-green-600 shadow-lg scale-105'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-green-600 hover:bg-gray-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Pour plus de 5 personnes, contactez-nous au +33 6 41 92 48 03
                  </p>
                </div>

                {/* Date et heure */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Date & Heure *
                    </Label>
                    <DatePicker
                      selected={date}
                      onChange={(d) => setDate(d)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="Heure"
                      dateFormat="dd/MM/yyyy HH:mm"
                      minDate={new Date()}
                      className="w-full border-2 rounded-xl p-3 h-12 focus:border-green-600 focus:outline-none"
                      placeholderText="Sélectionner date et heure"
                      required
                    />
                  </div>

                  {/* Type d'occasion */}
                  <div>
                    <Label htmlFor="occasion" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <SparklesIcon className="h-4 w-4" />
                      Occasion (optionnel)
                    </Label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={selectedOccasion}
                      onChange={(e) => setSelectedOccasion(e.target.value)}
                      className="w-full h-12 border-2 rounded-xl px-3 focus:border-green-600 focus:outline-none bg-white"
                    >
                      <option value="">Sélectionner une occasion</option>
                      {occasions.map((occ) => (
                        <option key={occ.value} value={occ.value}>
                          {occ.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message spécial */}
                <div>
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Demandes spéciales (optionnel)
                  </Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Ex: allergie aux fruits de mer, chaise haute pour bébé, coin tranquille..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="min-h-[120px] border-2 focus:border-green-600 rounded-xl resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Nous ferons de notre mieux pour répondre à vos demandes
                  </p>
                </div>
              </div>

              {/* Bouton */}
              <Button
                type="submit"
                disabled={loading}
                className={`w-full h-14 text-lg font-bold rounded-xl transition-all transform ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-green-600 hover:bg-green-700 hover:scale-105 shadow-lg hover:shadow-xl text-white"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircleIcon className="h-6 w-6" />
                    Confirmer ma réservation
                  </span>
                )}
              </Button>

              <p className="text-center text-sm text-gray-500">
                En confirmant, vous acceptez nos conditions générales
              </p>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-3xl shadow-xl text-white  top-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <PhoneIcon className="h-7 w-7" />
              Besoin d'aide ?
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <PhoneIcon className="h-6 w-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Téléphone</p>
                  <a href="tel:+22990000000" className="text-green-50 hover:text-white transition">
                    +33 6 41 92 48 03
                  </a>
                  <p className="text-sm text-green-100 mt-1">Lun-Dim: 10h-23h</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="h-6 w-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <a href="mailto:contact@restaurant.com" className="text-green-50 hover:text-white transition">
                    mamafood.s@yahoo.com
                  </a>
                  <p className="text-sm text-green-100 mt-1">Réponse sous 24h</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-6 w-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Adresse</p>
                  <p className="text-green-50">40 Rue de Thermes, 62100 Calais, France</p>
                </div>
              </div>

              <div className="pt-5 border-t border-green-400">
                <p className="text-sm text-green-100 flex items-center gap-2">
                  <span className="text-2xl">💬</span>
                  Contactez-nous sur WhatsApp pour une confirmation rapide !
                </p>
              </div>
            </div>
          </div>

          {/* Carte */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MapPinIcon className="h-6 w-6 text-green-600" />
                Notre emplacement
              </h3>
            </div>
            <div className="h-80">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.0223214445564!2d1.8504222763262304!3d50.960291550524126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dc3fc6602a661d%3A0xaa65abb4f08a0317!2sMAMA%20FOOD&#39;S!5e0!3m2!1sfr!2sbj!4v1759453396704!5m2!1sfr!2sbj" 
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
              />
            </div>
          </div>

          {/* Horaires */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ClockIcon className="h-6 w-6 text-green-600" />
              Horaires d'ouverture
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Lundi - Vendredi</span>
                <span className="text-green-600 font-semibold">11h - 23h</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Samedi</span>
                <span className="text-green-600 font-semibold">12h - 00h</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-700">Dimanche</span>
                <span className="text-green-600 font-semibold">12h - 22h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#0a1a05] via-[#020701] to-[#0a1a05] text-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Questions fréquentes</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-3 text-green-400">Puis-je modifier ma réservation ?</h3>
              <p className="text-gray-300 text-sm">Oui, vous pouvez modifier ou annuler gratuitement jusqu'à 2 heures avant votre arrivée.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-3 text-green-400">Acceptez-vous les groupes ?</h3>
              <p className="text-gray-300 text-sm">Absolument ! Pour les groupes de plus de 5 personnes, contactez-nous directement pour un service personnalisé.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-3 text-green-400">Faut-il un acompte ?</h3>
              <p className="text-gray-300 text-sm">Non, la réservation est gratuite et sans engagement. Vous payez uniquement sur place après votre repas.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}