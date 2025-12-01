
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL
export const http = axios.create({ baseURL })
const mock = !baseURL

// Masters
let categories = [
  { id: 'cat_apparel', name: 'Apparel' },
  { id: 'cat_footwear', name: 'Footwear' },
  { id: 'cat_accessories', name: 'Accessories' },
]

let subcategories = [
  { id: 'sub_tshirts', name: 'T-Shirts', categoryId: 'cat_apparel' },
  { id: 'sub_running', name: 'Running Shoes', categoryId: 'cat_footwear' },
  { id: 'sub_backpacks', name: 'Backpacks', categoryId: 'cat_accessories' },
]

let brands = [
  { id: 'brand_nike', name: 'Nike' },
  { id: 'brand_puma', name: 'Puma' },
  { id: 'brand_wildcraft', name: 'Wildcraft' },
]

// Products now reference categoryId, subcategoryId, brandId
let products = [
  { id: 'p1', name: 'Classic Tee', sku: 'TS-001', price: 499, stock: 120, active: true,
    slug: 'classic-tee', metaTitle: 'Classic Tee', metaDescription: 'Comfortable cotton t-shirt', metaKeywords: 'tshirt, cotton, apparel',
    categoryId: 'cat_apparel', subcategoryId: 'sub_tshirts', brandId: 'brand_puma' },
  { id: 'p2', name: 'Road Runner', sku: 'SN-002', price: 2999, stock: 35, active: true,
    slug: 'road-runner', metaTitle: 'Road Runner', metaDescription: 'Lightweight running sneakers', metaKeywords: 'shoes, sneakers, running',
    categoryId: 'cat_footwear', subcategoryId: 'sub_running', brandId: 'brand_nike' },
  { id: 'p3', name: 'Trail Backpack', sku: 'BP-003', price: 1499, stock: 60, active: false,
    slug: 'trail-backpack', metaTitle: 'Trail Backpack', metaDescription: 'Durable travel backpack', metaKeywords: 'bag, backpack, travel',
    categoryId: 'cat_accessories', subcategoryId: 'sub_backpacks', brandId: 'brand_wildcraft' },
]

let orders = [
  { id: 'o1', orderNo: 'ORD-1001', date: '2025-11-01', customerName: 'Asha', status: 'Delivered', total: 4499 },
  { id: 'o2', orderNo: 'ORD-1002', date: '2025-11-12', customerName: 'Vijay', status: 'Shipped', total: 2999 },
  { id: 'o3', orderNo: 'ORD-1003', date: '2025-11-23', customerName: 'Meera', status: 'Pending', total: 499 },
]

let customers = [
  { id: 'c1', name: 'Asha', email: 'asha@example.com', phone: '9876543210', joined: '2024-03-10' },
  { id: 'c2', name: 'Vijay', email: 'vijay@example.com', phone: '9876501234', joined: '2024-05-22' },
  { id: 'c3', name: 'Meera', email: 'meera@example.com', joined: '2024-09-14' },
]

let payments = [
  { id: 'pay_1', orderNo: 'ORD-1002', gateway: 'razorpay', amount: 2999, status: 'Captured', createdAt: '2025-11-12' },
  { id: 'pay_2', orderNo: 'ORD-1003', gateway: 'stripe', amount: 499, status: 'Authorized', createdAt: '2025-11-23' },
  { id: 'pay_3', orderNo: 'ORD-1001', gateway: 'razorpay', amount: 4499, status: 'Captured', createdAt: '2025-11-01' },
]

let paymentSettings = { gateway: 'razorpay', testMode: true, publishableKey: '', secretKey: '' }

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms))

export const MastersAPI = {
  async listCategories() { if (!mock) { const { data } = await http.get('/categories'); return data } await delay(); return categories },
  async createCategory(input) { if (!mock) { const { data } = await http.post('/categories', input); return data } await delay(); const c = { id: `cat_${Date.now()}`, ...input }; categories.push(c); return c },
  async updateCategory(id, input) { if (!mock) { const { data } = await http.put(`/categories/${id}`, input); return data } await delay(); categories = categories.map(c => c.id === id ? { ...c, ...input } : c); return categories.find(c => c.id === id) },
  async removeCategory(id) { if (!mock) { await http.delete(`/categories/${id}`); return } await delay(); categories = categories.filter(c => c.id !== id); subcategories = subcategories.filter(sc => sc.categoryId !== id) },

  async listSubcategories() { if (!mock) { const { data } = await http.get('/subcategories'); return data } await delay(); return subcategories },
  async createSubcategory(input) { if (!mock) { const { data } = await http.post('/subcategories', input); return data } await delay(); const s = { id: `sub_${Date.now()}`, ...input }; subcategories.push(s); return s },
  async updateSubcategory(id, input) { if (!mock) { const { data } = await http.put(`/subcategories/${id}`, input); return data } await delay(); subcategories = subcategories.map(s => s.id === id ? { ...s, ...input } : s); return subcategories.find(s => s.id === id) },
  async removeSubcategory(id) { if (!mock) { await http.delete(`/subcategories/${id}`); return } await delay(); subcategories = subcategories.filter(s => s.id !== id) },

  async listBrands() { if (!mock) { const { data } = await http.get('/brands'); return data } await delay(); return brands },
  async createBrand(input) { if (!mock) { const { data } = await http.post('/brands', input); return data } await delay(); const b = { id: `brand_${Date.now()}`, ...input }; brands.push(b); return b },
  async updateBrand(id, input) { if (!mock) { const { data } = await http.put(`/brands/${id}`, input); return data } await delay(); brands = brands.map(b => b.id === id ? { ...b, ...input } : b); return brands.find(b => b.id === id) },
  async removeBrand(id) { if (!mock) { await http.delete(`/brands/${id}`); return } await delay(); brands = brands.filter(b => b.id !== id) },
}

export const ProductsAPI = {
  async list() { if (!mock) { const { data } = await http.get('/products'); return data } await delay(); return products },
  async get(id) { if (!mock) { const { data } = await http.get(`/products/${id}`); return data } await delay(); return products.find(p => p.id === id) },
  async create(input) { if (!mock) { const { data } = await http.post('/products', input); return data } await delay(); const p = { id: `p${Date.now()}`, ...input }; products.push(p); return p },
  async update(id, input) { if (!mock) { const { data } = await http.put(`/products/${id}`, input); return data } await delay(); products = products.map(p => p.id === id ? { ...p, ...input } : p); return products.find(p => p.id === id) },
  async remove(id) { if (!mock) { await http.delete(`/products/${id}`); return } await delay(); products = products.filter(p => p.id !== id) },
}

export const OrdersAPI = { async list() { if (!mock) { const { data } = await http.get('/orders'); return data } await delay(); return orders } }
export const CustomersAPI = { async list() { if (!mock) { const { data } = await http.get('/customers'); return data } await delay(); return customers } }

export const PaymentsAPI = {
  async list() { if (!mock) { const { data } = await http.get('/payments'); return data } await delay(); return payments },
  async refund(id) { if (!mock) { const { data } = await http.post(`/payments/${id}/refund`); return data } await delay(); payments = payments.map(p => p.id === id ? { ...p, status: 'Refunded' } : p); return payments.find(p => p.id === id) },
  async getSettings() { if (!mock) { const { data } = await http.get('/settings/payments'); return data } await delay(); return paymentSettings },
  async saveSettings(input) { if (!mock) { const { data } = await http.put('/settings/payments', input); return data } await delay(); paymentSettings = { ...paymentSettings, ...input }; return paymentSettings },
}

export const StatsAPI = {
  async overview() {
    if (!mock) { const { data } = await http.get('/stats/overview'); return data }
    await delay();
    const revenueTrend = [
      { month: 'Dec', revenue: 12000 }, { month: 'Jan', revenue: 15000 }, { month: 'Feb', revenue: 9800 }, { month: 'Mar', revenue: 17300 },
      { month: 'Apr', revenue: 16200 }, { month: 'May', revenue: 18250 }, { month: 'Jun', revenue: 14000 }, { month: 'Jul', revenue: 19500 },
      { month: 'Aug', revenue: 21000 }, { month: 'Sep', revenue: 19900 }, { month: 'Oct', revenue: 22300 }, { month: 'Nov', revenue: 24500 }
    ]
    const categoryBreakdown = [
      { category: 'Apparel', sales: 5400 }, { category: 'Footwear', sales: 7600 }, { category: 'Accessories', sales: 3200 }
    ]
    return { revenueTrend, categoryBreakdown }
  }
}
