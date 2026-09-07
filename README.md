# ShipNow API - Refactorización a Arquitectura por Capas

Proyecto de backend refactorizado desde una arquitectura monolítica a un patrón profesional de 3 capas (**Controller - Service - Repository**) con inyección y validación estricta de variables de entorno.
API REST para la gestión de envíos, mocking, logging con rotación, documentación interactiva, performance, health check y subida de comprobantes.

---

## 🚀 Instrucciones para ejecutar localmente

1. **Clonar el repositorio e instalar dependencias:**
   git clone https://github.com/JuanMeza1996/backend3.git
   cd backend3
   npm install

2. **Configurar las variables de entorno:**
   Crear un archivo .env en la raíz del proyecto tomando como referencia el .env.example:
   PORT=8080
   MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/shipnow?retryWrites=true&w=majority
   MONGO_URI_TEST=mongodb+srv://usuario:password@cluster.mongodb.net/shipnow_test?retryWrites=true&w=majority
   NODE_ENV=development
   LOG_LEVEL=info
   JWT_SECRET=super_secreto_jwt

3. **Iniciar la aplicación:**
   npm run dev

---

## 🛠️ Performance & Optimización

- **Paginación en Listados:** Los endpoints de lectura masiva (/api/users, /api/products) reciben parámetros de paginación (page y limit) para no saturar la base de datos ni devolver colecciones descontroladas.
- **Control de Carga de Archivos:** Límite estricto de peso (5 MB), filtro de extensiones permitidas (.pdf, .png, .jpg, .jpeg) y guardado fuera del código fuente.
- **Operaciones Asíncronas:** Procesamiento no bloqueante del Event Loop con rotación diaria de logs mediante Winston.

---

## 🏥 Endpoint de Health Check (GET /health)

Proporciona un diagnóstico rápido del estado del servidor sin exponer credenciales ni datos sensibles.

- **Ruta:** GET /health
- **Respuesta (200 OK):**
  {
    "status": "OK",
    "environment": "development",
    "uptime": "120s",
    "timestamp": "2026-09-07T12:00:00.000Z"
  }

*Criterio sobre endpoints internos:* En entorno de desarrollo (NODE_ENV=development) están habilitados Swagger UI (/api/docs), Mocks (/api/mocks) y Logger Test (/api/logger-test). En producción (NODE_ENV=production), los endpoints de mocking se restringen por motivos de seguridad.

---

## 🧪 Documentación de Endpoints Mock (/api/mocks)

La API permite simular y poblar datos en memoria o persistirlos en MongoDB de manera controlada.

### 1. Obtener Usuarios Simulados
- **Ruta:** GET /api/mocks/users?qty=5
- **Descripción:** Devuelve una lista de usuarios ficticios sin tocar la base de datos.
- **Parámetros Query:** qty (opcional, por defecto 5).

### 2. Obtener Repartidores Simulados
- **Ruta:** GET /api/mocks/drivers?qty=5
- **Descripción:** Devuelve una lista de repartidores con vehículo y disponibilidad simulados.
- **Parámetros Query:** qty (opcional, por defecto 5).

### 3. Obtener Pedidos Simulados
- **Ruta:** GET /api/mocks/orders?qty=5
- **Descripción:** Genera pedidos simulados con direcciones y montos aleatorios.
- **Parámetros Query:** qty (opcional, por defecto 5).

### 4. Poblar la Base de Datos (Seeding)
- **Ruta:** POST /api/mocks/seed
- **Body (JSON):**
  {
    "usersQty": 10,
    "ordersQty": 10,
    "driversQty": 5
  }

---

## ⚠️ Ejemplos de Respuestas de Error (Middleware Global)

La API procesa todas las excepciones y las estandariza utilizando el diccionario de errores.

### 1. Cantidad Inválida en Mocks (MOCK_001)
- **Petición:** GET /api/mocks/users?qty=0 o GET /api/mocks/users?qty=-5
- **Respuesta (400 Bad Request):**
  {
    "status": "error",
    "statusCode": 400,
    "errorCode": "MOCK_001",
    "message": "La cantidad enviada no es un número entero positivo válido."
  }

### 2. Email Duplicado en Usuarios (USER_001)
- **Petición:** POST /api/users
- **Respuesta (409 Conflict):**
  {
    "status": "error",
    "statusCode": 409,
    "errorCode": "USER_001",
    "message": "El email ingresado ya se encuentra registrado."
  }

### 3. Recurso No Encontrado (USER_002 / PRODUCT_002)
- **Petición:** GET /api/users/650c1234567890abcdef1234
- **Respuesta (404 Not Found):**
  {
    "status": "error",
    "statusCode": 404,
    "errorCode": "USER_002",
    "message": "El usuario solicitado no existe."
  }

---

## 🧪 Testing Funcional Automatizado

Las pruebas integradas evalúan los flujos exitosos (*Happy Path*) y el control de excepciones (*Error Path*) utilizando **Mocha**, **Chai** y **Supertest**.

### Módulos Coberturados por los Tests:
1. **Usuarios (/api/users):**
   - Obtención de lista completa (`200 OK`).
   - Creación de nuevo usuario (`201 Created`).
   - Control de email duplicado (`409 Conflict` - `USER_001`).
   - Consulta por ID inexistente (`404 Not Found` - `USER_002`).
2. **Productos (/api/products):**
   - Obtención de productos (`200 OK`).
   - Creación de producto válido (`201 Created`).
   - Validación de datos o precios inválidos (`400 Bad Request` - `PRODUCT_001`).
   - Consulta por ID inexistente (`404 Not Found` - `PRODUCT_002`).
3. **Mocks y Logger:**
   - Generación en memoria con query param `qty` (`200 OK`).
   - Control de cantidad negativa (`400 Bad Request` - `MOCK_001`).
4. **Manejo Global de Errores y Uploads:**
   - Subida válida de PDF comprobante (`201 Created`).
   - Rechazo de petición de subida sin archivo (`400 Bad Request`).

### Ejecución de Pruebas:
npm test

---

## 📁 Carga y Gestión de Archivos (Multer & Mongoose)

El sistema cuenta con un módulo desacoplado en 3 capas (UploadController, UploadService, DocumentModel) para la recepción, filtrado y persistencia de comprobantes.

- **Endpoint:** POST /api/uploads/document (multipart/form-data)
- **Campo esperado:** document
- **Tipos permitidos:** .jpg, .png, .pdf (Filtro con AppError para formatos no válidos).
- **Límite de tamaño:** 5 MB.
- **Persistencia de Archivos:** Guardados localmente en /uploads/documents/ (directorio en .gitignore).
- **Persistencia de Metadatos:** Cada archivo exitoso guarda su registro en MongoDB mediante Mongoose (filename, originalname, mimetype, size, path).

---

## 🐳 Contenerización con Docker

### 1. Construir la imagen Docker:
docker build -t shipnow-api:1.0 .

### 2. Ejecutar el contenedor:
docker run -d -p 8080:8080 --env-file .env --name shipnow-container shipnow-api:1.0

### 3. Verificación y Accesos:
- **Health Check:** http://localhost:8080/health
- **Swagger UI:** http://localhost:8080/api/docs
- **Puerto expuesto:** 8080

---

## 🚫 Archivos Ignorados (.gitignore & .dockerignore)

Archivos y carpetas excluidos por seguridad y optimización:
- Variables de entorno (.env, .env.testing)
- Dependencias locales (node_modules/)
- Registros de log (logs/)
- Archivos subidos por usuarios (uploads/documents/)
- Cobertura de tests y configuración del IDE (coverage/, .vscode/)