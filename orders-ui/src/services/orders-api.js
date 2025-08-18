import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getOrders = () => api.get('/');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getFileById = (id) => api.get(`/orders/files/${id}`, { responseType: 'arraybuffer' });
export const createOrder = (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return api.post('/', formData, config);
};

export default api;