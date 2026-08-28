# ShipNow API - Refactorización a Arquitectura por Capas

Proyecto de backend refactorizado desde una arquitectura monolítica a un patrón profesional de 3 capas (**Controller - Service - Repository**) con inyección y validación estricta de variables de entorno.
API REST para la gestión de envíos, mocking, logging con rotación, documentación interactiva y subida de comprobantes.

## 🚀 Instrucciones para ejecutar localmente

1. **Clonar el repositorio:**
   ```bash
   npm install
   git clone https://github.com/JuanMeza1996/backend3
   cd shipnow-api

## 🧪 Documentación de Endpoints Mock (`/api/mocks`)

La API permite simular y poblar datos en memoria o persistirlos en MongoDB de manera controlada.

### 1. Obtener Usuarios Simulados
- **Ruta:** `GET /api/mocks/users?qty=5`
- **Descripción:** Devuelve una lista de usuarios ficticios sin tocar la base de datos.
- **Parámetros Query:** `qty` (opcional, por defecto 5).

### 2. Obtener Repartidores Simulados
- **Ruta:** `GET /api/mocks/drivers?qty=5`
- **Descripción:** Devuelve una lista de repartidores con vehículo y disponibilidad simulados.
- **Parámetros Query:** `qty` (opcional, por defecto 5).

### 3. Obtener Pedidos Simulados
- **Ruta:** `GET /api/mocks/orders?qty=5`
- **Descripción:** Genera pedidos simulados con direcciones y montos aleatorios.
- **Parámetros Query:** `qty` (opcional, por defecto 5).

### 4. Poblar la Base de Datos (Seeding)
- **Ruta:** `POST /api/mocks/seed`
- **Body (JSON):**
  ```json
  {
    "usersQty": 10,
    "ordersQty": 10,
    "driversQty": 5
  }

## ⚠️ Ejemplos de Respuestas de Error (Middleware Global)

La API procesa todas las excepciones y las estandariza utilizando el diccionario de errores.

### 1. Cantidad Inválida en Mocks (`MOCK_001`)
- **Petición:** `GET /api/mocks/users?qty=0` o `GET /api/mocks/users?qty=-5`
- **Respuesta (400 Bad Request):**
```json
{
  "status": "error",
  "statusCode": 400,
  "errorCode": "MOCK_001",
  "message": "La cantidad enviada no es un número entero positivo válido."
}

