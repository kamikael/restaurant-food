import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SEY8MLlaBlntEPj6fnJIO3Ai6a5uok7rLT3Yz7eAhlDoGKJ0KC0ukxUsZl49Q7WqgjXtfSiV0gYEHxQ7WtRsQtE00NysOthpS");

interface CartItem {
  name: string;
  quantity: number;
  description?: string; // Description optionnelle
}

interface CartSummary {
  total: number;
  totalItems: number;
  delivery: number;
  discount: number;
  items: CartItem[];
}
interface address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fullName: string;
  address: address;
}

export async function HandleCheckout(cartSummary: CartSummary, customerData: CustomerData) {
  try {
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error("Stripe n'a pas pu être initialisé");
    }

    // Créer la description détaillée avec les quantités, noms et descriptions
    const description = cartSummary.items
      .map(item => {
        const baseInfo = `${item.quantity}x ${item.name}`;
        // Ajouter la description si elle existe
        return item.description 
          ? `${baseInfo} (${item.description})` 
          : baseInfo;
      })
      .join(", ");

    // Ajouter les infos de livraison et réduction
    const fullDescription = `${description} | Livraison: ${cartSummary.delivery}€ | Réduction: ${cartSummary.discount}€`;
    
    const response = await fetch("https://backend-restaurant-ml36.onrender.com/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmount: cartSummary.total,
        quantity: cartSummary.totalItems,
        description: fullDescription,
        delivery: cartSummary.delivery,
        discount: cartSummary.discount,
        items: cartSummary.items.map(item => ({
          name: item.name,
          quantity: item.quantity
          
        })).slice(0, 500),
        customerEmail: customerData.email,
        customerName: customerData.fullName,
        customerPhone: customerData.phone,
        customerFirstName: customerData.firstName,
        customerLastName: customerData.lastName,
        customercity: customerData.address.city,
        customerstreet: customerData.address.street,
        customerpostalCode: customerData.address.postalCode,
        customercountry: customerData.address.country
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Impossible de créer la session de paiement");
    }

    const { url } = await response.json();
    
    if (!url) {
      throw new Error("Aucune URL de session reçue du backend");
    }

    // Redirection vers Stripe Checkout
    window.location.href = url;
  } catch (error) {
    console.error("Erreur lors du checkout :", error);
    alert(
      error instanceof Error 
        ? error.message 
        : "Une erreur est survenue. Veuillez réessayer."
    );
    throw error;
  }
}

export default HandleCheckout;