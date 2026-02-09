import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as api from '../services/api';

type Order = any;

export type OrdersContextType = {
  orders: Order[];
  loading: boolean;
  fetchMyOrders: () => Promise<Order[] | null>;
  getOrder: (id: string) => Promise<Order | null>;
  createOrder: (payload: any) => Promise<any>;
  cancelOrder: (orderId: string, payload?: any) => Promise<any>;
  fetchOrders: () => Promise<Order[] | null>;
  getAdminOrder: (id: string) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, payload: any) => Promise<any>;
  updateOrderPayment: (orderId: string, payload: any) => Promise<any>;
};

const defaultValue: OrdersContextType = {
  orders: [],
  loading: false,
  fetchMyOrders: async () => null,
  getOrder: async () => null,
  createOrder: async () => null,
  cancelOrder: async () => null,
  fetchOrders: async () => null,
  getAdminOrder: async () => null,
  updateOrderStatus: async () => null,
  updateOrderPayment: async () => null,
};

const OrdersContext = createContext<OrdersContextType>(defaultValue);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchMyOrders() {
    setLoading(true);
    try {
      const r = await api.getMyOrders();
      if (r.ok) {
        const data = r.data?.data ?? r.data ?? [];
        setOrders(data);
        return data;
      }
    } finally {
      setLoading(false);
    }
    return null;
  }

  async function getOrder(id: string) {
    setLoading(true);
    try {
      const r = await api.getOrderById(id);
      if (r.ok) return r.data?.data ?? r.data ?? null;
    } finally {
      setLoading(false);
    }
    return null;
  }

  async function createOrder(payload: any) {
    setLoading(true);
    try {
      const r = await api.createOrder(payload);
      await fetchMyOrders();
      return r;
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrders() {
    setLoading(true);
    try {
      const r = await api.getOrders();
      if (r.ok) {
        const data = r.data?.data ?? r.data ?? [];
        setOrders(data);
        return data;
      }
    } finally {
      setLoading(false);
    }
    return null;
  }

  async function getAdminOrder(id: string) {
    setLoading(true);
    try {
      const r = await api.getAdminOrder(id);
      if (r.ok) return r.data?.data ?? r.data ?? null;
    } finally {
      setLoading(false);
    }
    return null;
  }

  async function updateOrderStatus(orderId: string, payload: any) {
    setLoading(true);
    try {
      const r = await api.updateOrderStatus(orderId, payload);
      await fetchMyOrders();
      return r;
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderPayment(orderId: string, payload: any) {
    setLoading(true);
    try {
      const r = await api.updateOrderPayment(orderId, payload);
      await fetchMyOrders();
      return r;
    } finally {
      setLoading(false);
    }
  }

  async function cancelOrder(orderId: string, payload?: any) {
    setLoading(true);
    try {
      const r = await api.cancelOrder(orderId, payload);
      await fetchMyOrders();
      return r;
    } finally {
      setLoading(false);
    }
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        fetchMyOrders,
        getOrder,
        createOrder,
        cancelOrder,
        fetchOrders,
        getAdminOrder,
        updateOrderStatus,
        updateOrderPayment,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}

export default OrdersContext;
