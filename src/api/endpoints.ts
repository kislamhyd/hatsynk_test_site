export const ENDPOINTS = {
  // Contact endpoints
  CONTACT: {
    SUBMIT: '/contact',
    GET_ALL: '/contact/all',
  },

  // Services endpoints
  SERVICES: {
    GET_ALL: '/services',
    GET_BY_ID: (id: string) => `/services/${id}`,
  },

  // Products endpoints
  PRODUCTS: {
    GET_ALL: '/products',
    GET_BY_ID: (id: string) => `/products/${id}`,
  },

  // Newsletter endpoints
  NEWSLETTER: {
    SUBSCRIBE: '/newsletter/subscribe',
    UNSUBSCRIBE: '/newsletter/unsubscribe',
  },

  // General
  HEALTH: '/health',
} as const;
