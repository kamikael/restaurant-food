import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "../Product_type";

// On définit un type CartItem qui étend Product avec quantity obligatoire
type CartItem = Product & { quantity: number };
interface prod {
  name: string;
  description?: string,
  quantity: number;
}

interface CartSummary {
  total: number;
  totalItems: number;
  delivery: number;
  discount: number;
  items: prod[];
}
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getCount: () => number;
  addCartSummary: (cart: CartSummary) => void;
  getCartSummary: () => CartSummary;
}


const getdefaultLocalstorage = (key: string) => {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return null;
  }
  try {
    return JSON.parse(storedValue);
  } catch {
    return null;
  }
};

const useStikyState = (localstorage: string, defaultValue: CartItem[]) => {
  const [cart, setCart] = useState(
    getdefaultLocalstorage(localstorage) ?? defaultValue
  );
  //useEffet ? localstorage = side effect en dehors de react :
  useEffect(() => {
    localStorage.setItem(localstorage, JSON.stringify(cart));
    // when the state change
  }, [localstorage, cart]);

  return [cart, setCart];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useStikyState("cart", []);
  const [cartSummary, setCartSummary] = useState<CartSummary>({
  total: 0,
  totalItems: 0,
  delivery: 0,
  discount: 0,
  items: []
});

const addCartSummary = (carte: CartSummary) => {
  setCartSummary({
    total: carte.total,
    totalItems: carte.totalItems,
    delivery: carte.delivery,
    discount: carte.discount,
    items: carte.items
  });
};

const getCartSummary = () => {
  return cartSummary;
};
  function Interger(value: string | number): number {
    return parseInt(value as string, 10);
  }
  const addToCart = (product: Product) => {
    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find(
        (item) => Interger(item.id) === Interger(product.id)
      );
      if (existingItem) {
        return prevCart.map((item) =>
          Interger(item.id) === Interger(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart: CartItem[]) =>
      prevCart.filter((item) => Interger(item.id) !== Interger(id))
    );
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart: CartItem[]) =>
      prevCart.map((item) =>
        Interger(item.id) === Interger(id) ? { ...item, quantity } : item
      )
    );
  };

  const getCount = () =>
    cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCount,
        addCartSummary,
        getCartSummary
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
