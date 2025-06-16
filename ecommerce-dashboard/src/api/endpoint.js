export const ENDPOINTS = {
  products: {
    getAll: '/products',
    create: '/products',
    delete: (id) => `/products/${id}`,
    update: (id) => `/products/${id}`,
  },

  users: {
    getAll: '/users',
    create: '/users',
    getById: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
    update: (id) => `/users/${id}`,
  },

  orders: {
    getAll: '/orders',
    getOne: (id) => `/orders/${id}`,
    updateStatus: (id) => `/orders/${id}`,
    delete: (id) => `/orders/${id}`,
  },
};
