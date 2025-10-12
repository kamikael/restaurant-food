import { useRef, useState } from 'react'; 
import emailjs from '@emailjs/browser';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  web?: { label: string; url: string };
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
}

export const Contact2 = ({
  title = "Contactez-nous",
  description = "Une question ? Une suggestion ? Notre équipe est à votre écoute pour vous répondre dans les plus brefs délais.",
  phone = "+33 6 41 92 48 03",
  email = "mamafood.s@yahoo.com",
  address = "40 Rue de Thermes, 62100 Calais, France",
  web = { label: "www.mamafoods.com", url: "https://mamafoods.com" },
  serviceId = "service_alseuoi",
  templateId = "template_4y6qli9",
  publicKey = "VBmtMMPVU3-HxWlVP"
}: Contact2Props) => {

  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setLoading(true);
    setMessage('');
    setMessageType('');

    interface EmailJSError {
      text: string;
    }

    interface EmailJSSuccess {
      status: number;
      text: string;
    }

    emailjs
      .sendForm(
        serviceId,
        templateId,
        formRef.current as HTMLFormElement,
        publicKey
      )
      .then(
        (_result: EmailJSSuccess) => {
          setMessage('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
          setMessageType('success');
          setFormData({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
          formRef.current?.reset();
          setLoading(false);
          
          // Masquer le message après 5 secondes
          setTimeout(() => {
            setMessage('');
            setMessageType('');
          }, 5000);
        },
        (error: EmailJSError) => {
          setMessage("Une erreur s'est produite lors de l'envoi. Veuillez réessayer ou nous contacter directement par téléphone.");
          setMessageType('error');
          console.error(error);
          setLoading(false);
        }
      );
  };

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: "Téléphone",
      value: phone,
      link: `tel:${phone.replace(/\s/g, '')}`,
      subtitle: "Lun-Dim: 10h-23h",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: EnvelopeIcon,
      title: "Email",
      value: email,
      link: `mailto:${email}`,
      subtitle: "Réponse sous 24h",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: MapPinIcon,
      title: "Adresse",
      value: address,
      link: "https://maps.google.com",
      subtitle: "Voir sur la carte",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: GlobeAltIcon,
      title: "Site Web",
      value: web.label,
      link: web.url,
      subtitle: "Visitez notre site",
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Décoration de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16 max-w-3xl py-15 mx-auto px-6">
          <div className="inline-block mb-4 px-6 py-2 bg-green-100 rounded-full">
            <span className="text-green-700 font-semibold flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              Nous sommes là pour vous
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            {title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mx-auto flex max-w-screen-xl flex-col lg:flex-row justify-between gap-12 px-6">
          
          {/* Bloc Informations */}
          <div className="flex flex-col gap-8 lg:w-5/12">
            {/* Carte principale des moyens de contact */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <PhoneIcon className="h-6 w-6 text-green-600" />
                </div>
                Moyens de contact
              </h3>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
                  >
                    <div className={`w-14 h-14 ${method.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <method.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-500 mb-1">
                        {method.title}
                      </p>
                      <p className="text-gray-900 font-semibold mb-1 break-words">
                        {method.value}
                      </p>
                      <p className="text-xs text-gray-500">
                        {method.subtitle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Horaires d'ouverture */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <ClockIcon className="h-7 w-7" />
                Horaires d'ouverture
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-green-400/30">
                  <span className="font-medium">Lundi - Vendredi</span>
                  <span className="font-bold">11h - 23h</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-green-400/30">
                  <span className="font-medium">Samedi</span>
                  <span className="font-bold">12h - 00h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Dimanche</span>
                  <span className="font-bold">12h - 22h</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-green-400/30">
                <p className="text-sm text-green-100 flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  Service client disponible aux horaires d'ouverture
                </p>
              </div>
            </div>

            {/* Call to action rapide */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border-2 border-blue-100">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Besoin d'une réponse rapide ?
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Contactez-nous sur WhatsApp pour une réponse immédiate !
              </p>
              <a
                href={`https://wa.me/${phone.replace(/\s|\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:w-7/12">
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <PaperAirplaneIcon className="h-8 w-8 text-green-600" />
                  Envoyez-nous un message
                </h2>
                <p className="text-gray-600">
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </p>
              </div>

              {/* Message de retour */}
              {message && (
                <div className={`mb-8 p-6 rounded-2xl border-2 flex items-start gap-4 animate-fade-in ${
                  messageType === 'success' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  {messageType === 'success' ? (
                    <CheckCircleIcon className="h-8 w-8 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircleIcon className="h-8 w-8 text-red-600 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className={`font-bold text-lg mb-1 ${
                      messageType === 'success' ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {messageType === 'success' ? 'Message envoyé !' : 'Erreur'}
                    </h3>
                    <p className={messageType === 'success' ? 'text-green-700' : 'text-red-700'}>
                      {message}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Nom et prénom */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstname" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Prénom *
                    </Label>
                    <Input
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="mama"
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

                {/* Email et téléphone */}
                <div className="grid sm:grid-cols-2 gap-6">
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
                      Téléphone (optionnel)
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+33 6 41 92 48 03"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12 border-2 focus:border-green-600 rounded-xl"
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <Label htmlFor="subject" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Sujet *
                  </Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Ex: Demande d'information sur le menu"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="h-12 border-2 focus:border-green-600 rounded-xl"
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Votre message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Écrivez votre message ici..."
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="min-h-[180px] border-2 focus:border-green-600 rounded-xl resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Minimum 10 caractères
                  </p>
                </div>

                {/* Bouton d'envoi */}
                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full h-14 text-lg font-bold rounded-xl transition-all transform shadow-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 hover:scale-105 hover:shadow-xl text-white"
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
                      <PaperAirplaneIcon className="h-6 w-6" />
                      Envoyer le message
                    </span>
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  🔒 Vos informations sont sécurisées et ne seront jamais partagées
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Section carte Google Maps */}
        <div className="mt-16 px-6">
          <div className="max-w-screen-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-b">
              <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <MapPinIcon className="h-8 w-8 text-green-600" />
                Trouvez-nous facilement
              </h3>
              <p className="text-gray-600 mt-2">
                {address}
              </p>
            </div>
            <div className="h-96">
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
        </div>
      </div>
    </section>
  );
};

export default Contact2;