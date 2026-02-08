import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialItems } from "../lib/constants";

const getItemsMeta = (items) => ({
  items,
  totalNumberOfItems: items.length,
  numberOfItemsPacked: items.filter((item) => item.packed).length,
});

export const useItemsStore = create(
  persist(
    (set) => ({
      ...getItemsMeta(initialItems),
      addItem: (newItemText) => {
        const newItem = {
          id: new Date().getTime(),
          name: newItemText,
          packed: false,
        };
        set((state) => {
          const newItems = [...state.items, newItem];
          return getItemsMeta(newItems);
        });
      },
      deleteItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return getItemsMeta(newItems);
        });
      },
      toggleItem: (id) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            return item.id === id ? { ...item, packed: !item.packed } : item;
          });
          return getItemsMeta(newItems);
        });
      },
      removeAllItems: () => {
        set(() => getItemsMeta([]));
      },
      resetToInitial: () => {
        set(() => getItemsMeta(initialItems));
      },
      markAllAsComplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => {
            return { ...item, packed: true };
          });
          return getItemsMeta(newItems);
        });
      },
      markAllAsIncomplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => {
            return { ...item, packed: false };
          });
          return getItemsMeta(newItems);
        });
      },
    }),
    {
      name: "items",
    },
  ),
);
