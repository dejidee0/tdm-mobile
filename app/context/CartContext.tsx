import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as api from '../services/api';

type CartItem = any;

export type CartContextType = {
  items: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<CartItem[] | null>;
  addItem: (payload: any) => Promise<any>;
  updateItem: (itemId: string, payload: any) => Promise<any>;
  removeItem: (itemId: string) => Promise<any>;
  clearCart: () => Promise<any>;
};

const defaultValue: CartContextType = {
  items: [],
  loading: false,
  fetchCart: async () => null,
  addItem: async () => null,
  updateItem: async () => null,
  removeItem: async () => null,
  clearCart: async () => null,
};

const CartContext = createContext<CartContextType>(defaultValue);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchCart() {
    setLoading(true);
    try {
      const r = await api.getCart();
      if (r.ok) {
        const data = r.data?.data ?? r.data ?? [];
        setItems(data);
        return data;
      }
    } finally {
      setLoading(false);
    }
    return null;
  }

  async function addItem(payload: any) {
    setLoading(true);
    try {
      const r = await api.addCartItem(payload);
      await fetchCart();
      return r;
    } finally {
      setLoading(false);
    }
  }

  async function updateItem(itemId: string, payload: any) {
    setLoading(true);
    try {
      const r = await api.updateCartItem(itemId, payload);
      await fetchCart();
      return r;
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(itemId: string) {
    setLoading(true);
    try {
      const r = await api.removeCartItem(itemId);
      await fetchCart();
      return r;
    } finally {
      setLoading(false);
    }
  }

  async function clearCart() {
    setLoading(true);
    try {
      const r = await api.clearCart();
      await fetchCart();
      return r;
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider value={{ items, loading, fetchCart, addItem, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartContext;
