import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as api from '../services/api';

type SavedItem = any;

export type SavedContextType = {
  savedItems: SavedItem[];
  loading: boolean;
  fetchSavedItems: () => Promise<SavedItem[] | null>;
  addSavedItem: (itemId: string) => Promise<any>;
  removeSavedItem: (savedItemId: string) => Promise<any>;
  toggleSaved: (productId: string) => Promise<any>;
  isSaved: (productId: string) => boolean;
};

const defaultValue: SavedContextType = {
  savedItems: [],
  loading: false,
  fetchSavedItems: async () => null,
  addSavedItem: async () => null,
  removeSavedItem: async () => null,
  toggleSaved: async () => null,
  isSaved: () => false,
};

const SavedContext = createContext<SavedContextType>(defaultValue);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchSavedItems() {
    try {
      const r = await api.getSavedItems();
      if (r.ok) {
        let items = r.data?.data ?? r.data ?? [];
        if (!Array.isArray(items) && items && Array.isArray(items.items)) {
          items = items.items;
        }
        setSavedItems(Array.isArray(items) ? items : []);
        return items;
      }
    } catch {
        // ignore
    }
    return null;
  }

  async function addSavedItem(itemId: string) {
    setLoading(true);
    try {
      const r = await api.saveItem(itemId);
      await fetchSavedItems();
      return r;
    } finally {
      setLoading(false);
    }
  }

  async function removeSavedItem(savedItemId: string) {
    setLoading(true);
    try {
      const r = await api.removeSavedItem(savedItemId);
      await fetchSavedItems();
      return r;
    } finally {
      setLoading(false);
    }
  }

  function getSavedRecord(productId: string) {
    return savedItems.find(item => 
        String(item.id) === String(productId) || 
        String(item.productId) === String(productId) ||
        (item.item && String(item.item.id) === String(productId))
    );
  }

  function isSaved(productId: string) {
    return !!getSavedRecord(productId);
  }

  async function toggleSaved(productId: string) {
    const record = getSavedRecord(productId);
    if (record) {
        // The ID of the saved instance might be different, let's try `record.id` or `record.savedItemId` or `record.productId`
        const recordId = record.savedItemId ?? record.id;
        return await removeSavedItem(recordId);
    } else {
        return await addSavedItem(productId);
    }
  }

  useEffect(() => {
    fetchSavedItems();
  }, []);

  return (
    <SavedContext.Provider value={{ savedItems, loading, fetchSavedItems, addSavedItem, removeSavedItem, toggleSaved, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  return useContext(SavedContext);
}

export default SavedContext;
