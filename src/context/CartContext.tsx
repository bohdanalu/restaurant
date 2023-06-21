import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { CartItem, MenuType } from "../types";

type CartProviderProps = {
  children: ReactNode;
};

type CartContext = {
  handleAddtoCart: (menuItem: MenuType) => void;
  handleRemoveFromCart: (menuItem: MenuType) => void;
  handleClearCart: () => void;
  cartItems: CartItem[];
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const updateLocalStorage = (items: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const handleAddtoCart = (menuItem: MenuType) => {
    const existingItem = cartItems.find(
      (item) => item.menuItem.id === menuItem.id
    );
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.menuItem.id === menuItem.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    } else {
      const newCartItem: CartItem = {
        menuItem,
        quantity: 1,
      };

      setCartItems([...cartItems, newCartItem]);
      updateLocalStorage([...cartItems, newCartItem]);
    }
  };

  const handleRemoveFromCart = (menuItem: MenuType) => {
    const existingItem = cartItems.find(
      (item) => item.menuItem.id === menuItem.id
    );

    if (existingItem) {
      if (existingItem.quantity > 1) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.menuItem.id === menuItem.id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });

        setCartItems(updatedCartItems);
        updateLocalStorage(updatedCartItems);
      } else {
        const updatedCartItems = cartItems.filter(
          (item) => item.menuItem.id !== menuItem.id
        );

        setCartItems(updatedCartItems);
        updateLocalStorage(updatedCartItems);
      }
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{
        handleAddtoCart,
        handleRemoveFromCart,
        handleClearCart,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
