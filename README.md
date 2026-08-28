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
## 🧪 Testing Funcional Automatizado

Las pruebas integradas evalúan los flujos exitosos (*Happy Path*) y el control de excepciones (*Error Path*) utilizando **Mocha**, **Chai** y **Supertest**.

### Módulos Coberturados por los Tests:
1. **Usuarios (`/api/users`):**
   - Obtención de lista completa (`200 OK`).
   - Creación de nuevo usuario (`201 Created`).
   - Control de email duplicado (`409 Conflict` - `USER_001`).
2. **Productos (`/api/products`):**
   - Obtención de productos (`200 OK`).
   - Creación de producto válido (`201 Created`).
   - Validación de datos o precios inválidos (`400 Bad Request` - `PRODUCT_001`).
3. **Mocks y Logger:**
   - Generación en memoria con query param `qty` (`200 OK`).
   - Emisión de logs en todos los niveles (`200 OK`).
4. **Manejo Global de Errores:**
   - Respuesta ante rutas no encontradas (`404 Not Found`).

### Ejecución de Pruebas:
```bash
npm test

## 📁 Carga y Gestión de Archivos (Multer & Mongoose)

El sistema cuenta con un módulo desacoplado en 3 capas (`UploadController`, `UploadService`, `DocumentModel`) para la recepción, filtrado y persistencia de comprobantes.

- **Endpoint:** `POST /api/uploads/document` (`multipart/form-data`)
- **Campo esperado:** `document`
- **Tipos permitidos:** `.jpg`, `.png`, `.pdf` (Filtro con `AppError` para formatos no válidos).
- **Límite de tamaño:** 5 MB.
- **Persistencia de Archivos:** Guardados localmente en `/uploads/documents/` (directorio en `.gitignore`).
- **Persistencia de Metadatos:** Cada archivo exitoso guarda su registro en MongoDB mediante Mongoose (`filename`, `originalname`, `mimetype`, `size`, `path`).

