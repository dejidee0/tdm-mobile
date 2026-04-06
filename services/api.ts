import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const API_BASE = (API_BASE_URL as string).replace(/\/$/, '');
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
  const headers: Record<string, string> = { ...(options.headers as any) };

  // Only set application/json if body is not FormData
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const token = await AsyncStorage.getItem(ACCESS_KEY);
    if (token) headers.Authorization = `Bearer ${token}`;
  } catch {
    // ignore
  }

  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

  const method = (options.method || 'GET').toUpperCase();
  try {
    console.log(`[apiFetch] => ${method} ${url}`);
  } catch {}

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await parseResponse(res);

    try {
      const size = data && data.data && Array.isArray(data.data) ? data.data.length : undefined;
      console.log(`[apiFetch] <= ${method} ${url} ${res.status}${size !== undefined ? ` items=${size}` : ''}`);
    } catch {}

    if (!res.ok) {
      console.error(`[apiFetch] error response ${method} ${url} ${res.status}:`, JSON.stringify(data, null, 2));
    }

    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.warn(`[apiFetch] network error ${method} ${url}`, err);
    return { ok: false, status: 503, data: { error: 'network_error', message: String(err) } };
  }
}

// AI - Project & Visualizer
export async function createAIProject(payload: any) {
  return apiFetch('/ai/projects', { method: 'POST', body: JSON.stringify(payload) });
}

export async function uploadRoomImage(formData: FormData) {
  return apiFetch('/ai/upload-room', { method: 'POST', body: formData });
}

export async function getAIProjects() {
  return apiFetch('/ai/projects');
}

export async function generateAIImage(payload: any) {
  return apiFetch('/ai/generate/image', { method: 'POST', body: JSON.stringify(payload) });
}

export async function transformAIImage(payload: any) {
  return apiFetch('/ai/transform/image', { method: 'POST', body: JSON.stringify(payload) });
}

// AI - Renovation Estimator
export async function createRenovationEstimate(payload: any) {
  return apiFetch('/ai/renovation/estimate', { method: 'POST', body: JSON.stringify(payload) });
}

export async function getRenovationEstimates() {
  return apiFetch('/ai/renovation/estimates');
}

export async function getRenovationEstimateById(estimateId: string) {
  return apiFetch(`/ai/renovation/estimates/${estimateId}`);
}

// AI - Design Sessions
export async function createDesignSession(payload: any) {
  return apiFetch('/designs/sessions', { method: 'POST', body: JSON.stringify(payload) });
}

export async function getDesignSessions() {
  return apiFetch('/designs/sessions');
}

export async function uploadSessionImage(sessionId: string, formData: FormData) {
  return apiFetch(`/designs/sessions/${sessionId}/upload`, {
    method: 'POST',
    body: formData,
  });
}

export async function generateSessionDesign(sessionId: string, payload: any) {
  return apiFetch(`/designs/sessions/${sessionId}/generate`, { method: 'POST', body: JSON.stringify(payload) });
}

export async function getSessionStatus(sessionId: string) {
  return apiFetch(`/designs/sessions/${sessionId}/status`);
}

// Designs Catalog
export async function getDesigns(query = '') {
  return apiFetch(`/designs${query ? `?${query}` : ''}`);
}

// Projects
// --- AI Visualizer & Image Generation ---
export async function generateAIImageV2(data: { prompt: string; roomType?: string; style?: string; aspect_ratio?: string }) {
  return apiFetch('/ai/generate/image', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function transformAIImageV2(formData: FormData) {
  return apiFetch('/ai/transform/image', {
    method: 'POST',
    body: formData,
  });
}

export async function getAIUsageSummary(year?: number, month?: number) {
  let url = '/ai/usage/summary';
  const params = new URLSearchParams();
  if (year) params.append('year', year.toString());
  if (month) params.append('month', month.toString());
  if (params.toString()) url += `?${params.toString()}`;
  return apiFetch(url);
}

export async function getAICreditsBalance() {
  return apiFetch('/ai/credits/balance');
}

export async function getProjects() {
  return apiFetch('/projects');
}

export async function getProjectById(projectId: string) {
  return apiFetch(`/projects/${projectId}`);
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
  return apiFetch('/cart');
}

export async function clearCart() {
  return apiFetch('/cart', { method: 'DELETE' });
}

export async function addCartItem(payload: any) {
  return apiFetch('/cart/items', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateCartItem(itemId: string, payload: any) {
  return apiFetch(`/cart/items/${itemId}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function removeCartItem(itemId: string) {
  return apiFetch(`/cart/items/${itemId}`, { method: 'DELETE' });
}

// Checkout
export async function getCheckoutSummary(promoCode?: string) {
  return apiFetch(`/checkout${promoCode ? `?promoCode=${encodeURIComponent(promoCode)}` : ''}`);
}

export async function initiatePayment(payload: any) {
  return apiFetch('/checkout/payment', { method: 'POST', body: JSON.stringify(payload) });
}

export async function verifyPaystackPayment(ref: string) {
  return apiFetch(`/checkout/payment/paystack/verify/${encodeURIComponent(ref)}`);
}

// AI Assistant
export async function sendAIAssistantMessage(payload: { sessionId?: string | null, message: string, enableToolPlanning: boolean }) {
  return apiFetch('/ai/assistant/message', { method: 'POST', body: JSON.stringify(payload) });
}

// Orders
export async function getMyOrders() {
  return apiFetch('/orders/my-orders');
}

export async function getOrderById(orderId: string) {
  return apiFetch(`/orders/${orderId}`);
}

export async function getOrderByNumber(orderNumber: string) {
  return apiFetch(`/orders/number/${encodeURIComponent(orderNumber)}`);
}

export async function createOrder(payload: any) {
  return apiFetch('/orders', { method: 'POST', body: JSON.stringify(payload) });
}

export async function cancelOrder(orderId: string, payload?: any) {
  return apiFetch(`/orders/${orderId}/cancel`, { method: 'POST', body: JSON.stringify(payload ?? {}) });
}

export async function getOrders() {
  return apiFetch('/orders');
}

export async function getAdminOrder(orderId: string) {
  return apiFetch(`/orders/admin/${orderId}`);
}

export async function updateOrderStatus(orderId: string, payload: any) {
  return apiFetch(`/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function updateOrderPayment(orderId: string, payload: any) {
  return apiFetch(`/orders/${orderId}/payment`, { method: 'PUT', body: JSON.stringify(payload) });
}

// Removed duplicate checkout stuff
// Saved Items
export async function getSavedItems() {
  return apiFetch('/saved');
}

export async function saveItem(itemId: string) {
  return apiFetch('/saved', { method: 'POST', body: JSON.stringify({ itemId }) });
}

export async function removeSavedItem(savedItemId: string) {
  return apiFetch(`/saved/${savedItemId}`, { method: 'DELETE' });
}

export default { apiFetch };
