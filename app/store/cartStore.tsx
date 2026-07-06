import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "../types/types";

// Товар в корзине хранится как данные продукта + количество выбранных единиц.
export type CartItem = Product & {
  quantity: number;
};

type CartLastAction = "add" | "remove" | "clear" | null;

type CartState = {
  cartItems: CartItem[];
  lastAction: CartLastAction;
  lastChangedItem: Product | null;
};

type CartActions = {
  clearLastAction: () => void;
  increaseQuantity: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
};

type CartStore = CartState & CartActions;

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      lastAction: null,
      lastChangedItem: null,

      // Сбрасывает маркер последнего действия после показа UI-уведомления.
      clearLastAction: () => set({ lastAction: null, lastChangedItem: null }),

      increaseQuantity: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
          )
        })),

      decreaseQuantity: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) => {
            if (item.id !== itemId) return item;
            const newQuantity = Math.max(1, item.quantity - 1);
            return { ...item, quantity: newQuantity };
          })
        })),

      // Если товар уже есть в корзине, увеличиваем количество вместо дубля.
      addToCart: (product) =>
        set((state) => {
          if (product.id == null) return state;

          const existingItem = state.cartItems.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) => {
                return item.id === product.id
                  ? { ...item, quantity: (item.quantity || 0) + 1 }
                  : item;
              }), 
              lastAction: 'add',
              lastChangedItem: product
            };
          }

          return {
            cartItems: [
              ...state.cartItems, 
              { 
                ...product, 
                quantity: 1 
              }
            ],
            lastAction: 'add',
            lastChangedItem: product
          };
      }),
      
      removeFromCart: (itemId) =>
        set((state) => {
          if (itemId == null) return state;
          const removedItem = state.cartItems.find((item) => item.id === itemId) ?? null;
          
          return {
            cartItems: state.cartItems.filter((item) => item.id !== itemId),
            lastAction: 'remove',
            lastChangedItem: removedItem
          };
        }),

      clearCart: () => set({
        cartItems: [],
        lastAction: 'clear',
        lastChangedItem: null
      }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      // В localStorage сохраняем только содержимое корзины, без transient UI-состояния.
      partialize: (state) => ({
        cartItems: state.cartItems,
      }),
    }
  )

);

export default useCartStore;

