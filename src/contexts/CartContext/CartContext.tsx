import { createContext, useContext, useEffect, useState } from "react";
import { Cart, CartItem } from "../../utilities/utils";
import { CART_KEY } from "../../env";

const cartContext = createContext<
  [cart: CartItem[], setCart: (items: CartItem[]) => void]
>([null!, null!]);
type CartContextProps = {
  children: React.ReactNode;
};
function CartContext({ children }: CartContextProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    const itemsInCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    setCart(itemsInCart as CartItem[]);
  }, []);
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
    return () => {
      if (cart.length > 0) {
        if (cart.length == 1 && cart[0].quantity == 0) {
          localStorage.setItem(CART_KEY, "");
        } else {
          localStorage.setItem(CART_KEY, JSON.stringify(cart));
        }
      }
    };
  }, [cart]);
  return (
    <cartContext.Provider value={[cart, setCart]}>
      {children}
    </cartContext.Provider>
  );
}
export function useCart() {
  return useContext(cartContext);
}
export default CartContext;
