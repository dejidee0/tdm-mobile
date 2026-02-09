import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as api from '../services/api';

type Product = any;
type Category = any;

export type ProductsContextType = {
  products: Product[];
  featured: Product[];
  categories: Category[];
  loading: boolean;
  fetchProducts: (query?: string) => Promise<Product[] | null>;
  fetchProduct: (id: string) => Promise<Product | null>;
  fetchFeatured: () => Promise<Product[] | null>;
  fetchCategories: () => Promise<Category[] | null>;
  fetchProductBySlug: (slug: string) => Promise<Product | null>;
};

const defaultValue: ProductsContextType = {
  products: [],
  featured: [],
  categories: [],
  loading: false,
  fetchProducts: async () => null,
  fetchProduct: async () => null,
  fetchFeatured: async () => null,
  fetchCategories: async () => null,
  fetchProductBySlug: async () => null,
};

const ProductsContext = createContext<ProductsContextType>(defaultValue);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts(query = '') {
    setLoading(true);
    try {
      const r = await api.getProducts(query);
      if (r.ok) {
        const data = r.data?.data ?? r.data ?? [];
        setProducts(data);
        return data;
      }
    } finally {
      setLoading(false);
    }
    return null;
  }

  async function fetchProduct(id: string) {
    setLoading(true);
    try {
      const r = await api.getProductById(id);
      if (r.ok) return r.data?.data ?? r.data ?? null;
    } finally {
      setLoading(false);
    }
    return null;
  }

  async function fetchFeatured() {
    setLoading(true);
    try {
      const r = await api.getFeaturedProducts();
      if (r.ok) {
        const data = r.data?.data ?? r.data ?? [];
        setFeatured(data);
        return data;
      }
    } finally {
      setLoading(false);
    }
    return null;
  }

  async function fetchCategories() {
    setLoading(true);
    try {
      const r = await api.getCategories();
      if (r.ok) {
        const data = r.data?.data ?? r.data ?? [];
        setCategories(data);
        return data;
      }
    } finally {
      setLoading(false);
    }
    return null;
  }

  async function fetchProductBySlug(slug: string) {
    setLoading(true);
    try {
      const r = await api.getProductBySlug(slug);
      if (r.ok) return r.data?.data ?? r.data ?? null;
    } finally {
      setLoading(false);
    }
    return null;
  }

  return (
    <ProductsContext.Provider
      value={{ products, featured, categories, loading, fetchProducts, fetchProduct, fetchFeatured, fetchCategories, fetchProductBySlug }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}

export default ProductsContext;
