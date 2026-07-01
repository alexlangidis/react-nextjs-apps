import { create } from "zustand";
import type { Product } from "../data/products";

export type CartItem = Product & {
  quantity: number;
};

type CardStore = {
  items: CartItem[];
  addItem: (product: Product) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearItems: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
};

export const useCardStore = create<CardStore>((set, get) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),
  incrementItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    })),
  decrementItem: (id) =>
    set((state) => {
      const targetItem = state.items.find((item) => item.id === id);

      if (!targetItem) {
        return state;
      }

      if (targetItem.quantity === 1) {
        return {
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearItems: () => set({ items: [] }),
  getItemCount: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),
  getTotalPrice: () =>
    get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ),
}));
