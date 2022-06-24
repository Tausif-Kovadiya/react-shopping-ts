import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

type CartContextProviderProps = {
  children: ReactNode;
};

type ShoppingCartContextProps = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  RemoveCartItem: (id: number) => void;
  cartQuantity: number;
  cartItems: cartItem[];
  openCart: () => void;
  closeCart: () => void;
};

type cartItem = {
  id: number;
  quantity: number;
};

const CartContext = createContext({} as ShoppingCartContextProps);

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<cartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity:any, item:any) => quantity + item.quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) =>
    cartItems.find((item:any) => item.id === id)?.quantity || 0;

  const increaseCartQuantity = (id: number) => {
    if (cartItems.find((item:any) => item.id === id) == null) {
      setCartItems([...cartItems, { id, quantity: 1 }]);
    } else {
      setCartItems(
        cartItems.map((item:any) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  const decreaseCartQuantity = (id: number) => {
    if (cartItems.find((item:any) => item.id === id)?.quantity === 1) {
      setCartItems(cartItems.filter((item:any) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item:any) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const RemoveCartItem = (id: number) => {
    setCartItems(cartItems.filter((item:any) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        RemoveCartItem,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </CartContext.Provider>
  );
};
