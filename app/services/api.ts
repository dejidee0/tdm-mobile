import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = (process.env.EXPO_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
const ACCESS_KEY = '@app_access_token';

type ApiResult<T = any> = { ok: boolean; status: number; data: T | null };

async function parseResponse(res: Response): Promise<any> {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<ApiResult> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(options.headers as any) };
  try {
    const token = await AsyncStorage.getItem(ACCESS_KEY);
    if (token) headers.Authorization = `Bearer ${token}`;
  } catch {
    // ignore
  }

  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetch(url, { ...options, headers });
  const data = await parseResponse(res);
  return { ok: res.ok, status: res.status, data };
}

// Products helpers
export async function getProducts(query = '') {
  return apiFetch(`/Products${query ? `?${query}` : ''}`);
}

export async function getFeaturedProducts() {
  return apiFetch('/Products/featured');
}

export async function getProductById(id: string) {
  return apiFetch(`/Products/${id}`);
}

export async function getProductBySlug(slug: string) {
  return apiFetch(`/Products/slug/${encodeURIComponent(slug)}`);
}

export async function getRelatedProducts(id: string) {
  return apiFetch(`/Products/${id}/related`);
}

export async function createProduct(payload: any) {
  return apiFetch('/Products', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateProduct(id: string, payload: any) {
  return apiFetch(`/Products/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function deleteProduct(id: string) {
  return apiFetch(`/Products/${id}`, { method: 'DELETE' });
}

export async function addProductImage(productId: string, payload: any) {
  return apiFetch(`/Products/${productId}/images`, { method: 'POST', body: JSON.stringify(payload) });
}

export async function deleteProductImage(imageId: string) {
  return apiFetch(`/Products/images/${imageId}`, { method: 'DELETE' });
}

export async function setPrimaryProductImage(productId: string, imageId: string) {
  return apiFetch(`/Products/${productId}/images/${imageId}/primary`, { method: 'PUT' });
}

// Categories
export async function getCategories() {
  return apiFetch('/Categories');
}

export async function getCategoryBySlug(slug: string) {
  return apiFetch(`/Categories/slug/${encodeURIComponent(slug)}`);
}

export async function getCategoryById(id: string) {
  return apiFetch(`/Categories/${id}`);
}

export async function getCategoriesByBrand(brandType: string) {
  return apiFetch(`/Categories/brand/${encodeURIComponent(brandType)}`);
}

export async function createCategory(payload: any) {
  return apiFetch('/Categories', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateCategory(id: string, payload: any) {
  return apiFetch(`/Categories/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function deleteCategory(id: string) {
  return apiFetch(`/Categories/${id}`, { method: 'DELETE' });
}

// Cart
export async function getCart() {
  return apiFetch('/Cart');
}

export async function clearCart() {
  return apiFetch('/Cart', { method: 'DELETE' });
}

export async function addCartItem(payload: any) {
  return apiFetch('/Cart/items', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateCartItem(itemId: string, payload: any) {
  return apiFetch(`/Cart/items/${itemId}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function removeCartItem(itemId: string) {
  return apiFetch(`/Cart/items/${itemId}`, { method: 'DELETE' });
}

// Orders
export async function getMyOrders() {
  return apiFetch('/Orders/my-orders');
}

export async function getOrderById(orderId: string) {
  return apiFetch(`/Orders/${orderId}`);
}

export async function getOrderByNumber(orderNumber: string) {
  return apiFetch(`/Orders/number/${encodeURIComponent(orderNumber)}`);
}

export async function createOrder(payload: any) {
  return apiFetch('/Orders', { method: 'POST', body: JSON.stringify(payload) });
}

export async function cancelOrder(orderId: string, payload?: any) {
  return apiFetch(`/Orders/${orderId}/cancel`, { method: 'POST', body: JSON.stringify(payload ?? {}) });
}

export async function getOrders() {
  return apiFetch('/Orders');
}

export async function getAdminOrder(orderId: string) {
  return apiFetch(`/Orders/admin/${orderId}`);
}

export async function updateOrderStatus(orderId: string, payload: any) {
  return apiFetch(`/Orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function updateOrderPayment(orderId: string, payload: any) {
  return apiFetch(`/Orders/${orderId}/payment`, { method: 'PUT', body: JSON.stringify(payload) });
}

export default { apiFetch };
