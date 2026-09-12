export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  DRIVER: 'repartidor'
};

export const PRODUCT_STATUS = {
  AVAILABLE: 'AVAILABLE',
  OUT_OF_STOCK: 'OUT_OF_STOCK'
};

export const ORDER_STATUS = {
  PENDING: 'pendiente',
  IN_TRANSIT: 'en_camino',
  DELIVERED: 'entregado',
  CANCELLED: 'cancelado'
};

export const DELIVERY_STATUS = {
  ASSIGNED: 'asignado',
  IN_PROGRESS: 'en_curso',
  COMPLETED: 'completado'
};

export const ORDER_PRIORITY = {
  LOW: 'baja',
  MEDIUM: 'media',
  HIGH: 'alta'
};

export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf'
];

export const MAX_MOCK_QUANTITY = 100;