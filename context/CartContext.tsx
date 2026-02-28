import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as api from '../services/api';

type CartItem = any;

export type CartContextType = {
  items: CartItem[];
  cart?: any;
  subTotal?: number;
  totalItems?: number;
  loading: boolean;
  fetchCart: () => Promise<CartItem[] | null>;
  addItem: (payload: any) => Promise<any>;
  updateItem: (itemId: string, payload: any) => Promise<any>;
  removeItem: (itemId: string) => Promise<any>;
  clearCart: () => Promise<any>;
};

const defaultValue: CartContextType = {
  items: [],
  cart: undefined,
  subTotal: 0,
  totalItems: 0,
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
  const [cart, setCart] = useState<any>(null);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function fetchCart() {
    setLoading(true);
    try {
      console.log('[CartContext] fetching cart');
      const r = await api.getCart();
      if (r.ok) {
        const payload = r.data?.data ?? r.data ?? null;
        console.log({ cartItems: r.data.data.items });
        // payload might be an array of items or a cart object with { items, subTotal, totalItems }
        if (Array.isArray(payload)) {
          setItems(payload);
          setCart(null);
          setSubTotal(0);
          setTotalItems(payload.length);
          if (payload.length) console.log('[CartContext] first cart item', payload);
        } else if (payload && typeof payload === 'object') {
          const itemsArr = payload.items ?? [];
          setItems(itemsArr);
          setCart(payload);
          setSubTotal(payload.subTotal ?? payload.subtotal ?? 0);
          setTotalItems(payload.totalItems ?? payload.total_items ?? itemsArr.length);
          if (itemsArr && itemsArr.length) console.log('[CartContext] first cart item', itemsArr[0]);
        } else {
          setItems([]);
          setCart(null);
          setSubTotal(0);
          setTotalItems(0);
        }
        return payload;
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
    <CartContext.Provider value={{ items, cart, subTotal, totalItems, loading, fetchCart, addItem, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartContext;
