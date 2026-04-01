import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

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
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<any>(null);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function syncAndFetch() {
      if (user) {
        try {
          const localCartStr = await AsyncStorage.getItem('@app_local_cart');
          const localCart = localCartStr ? JSON.parse(localCartStr) : [];
          if (Array.isArray(localCart) && localCart.length > 0) {
            console.log('[CartContext] Syncing offline cart to server...');
            for (const item of localCart) {
              if (item.productId) {
                await api.addCartItem({ productId: item.productId, quantity: item.quantity || 1 });
              }
            }
            await AsyncStorage.removeItem('@app_local_cart');
            console.log('[CartContext] Offline cart synced and cleared.');
          }
        } catch (err) {
          console.warn('[CartContext] Sync offline cart failed', err);
        }
      }
      fetchCart();
    }
    syncAndFetch();
  }, [user]);

  async function fetchCart() {
    setLoading(true);
    try {
      console.log('[CartContext] fetching cart');
      if (user) {
        const r = await api.getCart();
        if (r.ok) {
          const payload = r.data?.data ?? r.data ?? null;
          if (Array.isArray(payload)) {
            setItems(payload);
            setCart(null);
            setSubTotal(0);
            setTotalItems(payload.length);
          } else if (payload && typeof payload === 'object') {
            const itemsArr = payload.items ?? [];
            setItems(itemsArr);
            setCart(payload);
            setSubTotal(payload.subTotal ?? payload.subtotal ?? 0);
            setTotalItems(payload.totalItems ?? payload.total_items ?? itemsArr.length);
          } else {
            setItems([]);
            setCart(null);
            setSubTotal(0);
            setTotalItems(0);
          }
          return payload;
        }
      } else {
        const localCartStr = await AsyncStorage.getItem('@app_local_cart');
        const localCart = localCartStr ? JSON.parse(localCartStr) : [];
        setItems(localCart);
        setCart(null);
        let sub = 0;
        localCart.forEach((item: any) => {
          let p = item.unitPrice ?? item.price ?? 0;
          if (typeof p === 'string') p = parseFloat(p.replace(/[^0-9.]/g, '')) || 0;
          sub += p * (item.quantity || 1);
        });
        setSubTotal(sub);
        setTotalItems(localCart.length);
        return localCart;
      }
    } finally {
      setLoading(false);
    }
    return null;
  }

  async function addItem(payload: any) {
    setLoading(true);
    try {
      if (user) {
        const r = await api.addCartItem({ productId: payload.productId, quantity: payload.quantity });
        await fetchCart();
        return r;
      } else {
        let productData = payload.product;
        if (!productData) {
          const r = await api.getProductById(payload.productId);
          if (r.ok) productData = r.data?.data ?? r.data;
        }
        const localCartStr = await AsyncStorage.getItem('@app_local_cart');
        let localCart = localCartStr ? JSON.parse(localCartStr) : [];
        let existingItem = localCart.find((i: any) => i.product?.id === payload.productId || i.productId === payload.productId);
        if (existingItem) {
          existingItem.quantity += payload.quantity;
        } else {
          localCart.push({
            id: String(Date.now()),
            productId: payload.productId,
            quantity: payload.quantity,
            productName: productData?.title || productData?.name,
            unitPrice: productData?.price,
            product: productData,
            deliveryEstimate: productData?.deliveryEstimate || '15 working days'
          });
        }
        await AsyncStorage.setItem('@app_local_cart', JSON.stringify(localCart));
        await fetchCart();
        return { ok: true, data: localCart };
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateItem(itemId: string, payload: any) {
    setLoading(true);
    try {
      if (user) {
        const r = await api.updateCartItem(itemId, payload);
        await fetchCart();
        return r;
      } else {
        const localCartStr = await AsyncStorage.getItem('@app_local_cart');
        let localCart = localCartStr ? JSON.parse(localCartStr) : [];
        const index = localCart.findIndex((i: any) => i.id === itemId || i.productId === itemId);
        if (index > -1) {
          localCart[index] = { ...localCart[index], ...payload };
          await AsyncStorage.setItem('@app_local_cart', JSON.stringify(localCart));
        }
        await fetchCart();
        return { ok: true, data: localCart };
      }
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(itemId: string) {
    setLoading(true);
    try {
      if (user) {
        const r = await api.removeCartItem(itemId);
        await fetchCart();
        return r;
      } else {
        const localCartStr = await AsyncStorage.getItem('@app_local_cart');
        let localCart = localCartStr ? JSON.parse(localCartStr) : [];
        localCart = localCart.filter((i: any) => String(i.id) !== String(itemId) && String(i.productId) !== String(itemId));
        await AsyncStorage.setItem('@app_local_cart', JSON.stringify(localCart));
        await fetchCart();
        return { ok: true, data: localCart };
      }
    } finally {
      setLoading(false);
    }
  }

  async function clearCart() {
    setLoading(true);
    try {
      if (user) {
        const r = await api.clearCart();
        await fetchCart();
        return r;
      } else {
        await AsyncStorage.removeItem('@app_local_cart');
        await fetchCart();
        return { ok: true, data: [] };
      }
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
