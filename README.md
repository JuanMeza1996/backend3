# ShipNow API — Entrega Final

API REST backend profesional para gestionar **usuarios, envíos, tracking, entregas, productos, mocks y comprobantes/archivos**. El proyecto está preparado para revisión académica y ejecución local o mediante Docker.

## Tecnologías

- Node.js 20 + Express 4
- MongoDB + Mongoose
- Arquitectura **Controller → Service → Repository → Model**
- Multer para carga de archivos
- Winston + Daily Rotate File para logging
- Swagger / OpenAPI 3
- Mocha + Chai + Supertest
- Docker + Docker Compose
- Faker para datos simulados

## Arquitectura

```text
src/
├── config/          # configuración de entorno, Multer y Swagger
├── constants/       # estados, roles y códigos de error
├── controllers/     # HTTP: recibe request y construye response
├── errors/          # AppError
├── middlewares/     # manejo global de errores
├── models/          # schemas Mongoose
├── repositories/    # ÚNICO acceso de persistencia
├── routes/          # definición de endpoints, sin lógica de negocio
├── services/        # reglas de negocio
└── utils/           # logger
test/                # pruebas funcionales
uploads/             # directorio runtime, sin archivos locales
```

Las rutas no acceden directamente a MongoDB. Los services contienen las validaciones y reglas de negocio y los repositories concentran las operaciones de persistencia.

## Variables de entorno

Copiar `.env.example` como `.env` y completar:

| Variable | Descripción |
|---|---|
| `PORT` | Puerto HTTP de la API. Por defecto `8080` |
| `MONGO_URI` | URI de MongoDB para desarrollo/producción |
| `MONGO_URI_TEST` | Base de datos MongoDB independiente para tests |
| `NODE_ENV` | `development`, `test` o `production` |
| `LOG_LEVEL` | Nivel de Winston (`info`, `debug`, etc.) |
| `MAX_FILE_SIZE_MB` | Tamaño máximo permitido para uploads. Por defecto `5` |
| `UPLOAD_DIR` | Directorio donde se guardan archivos subidos |

**Nunca subir `.env` real al repositorio.**

## Instalación y ejecución local

```bash
git clone <URL_DEL_REPOSITORIO>
cd backend3
npm install
cp .env.example .env
npm run dev
```

En Windows, crear `.env` manualmente copiando `.env.example`.

API: `http://localhost:8080`

Swagger: `http://localhost:8080/api/docs`

Health: `http://localhost:8080/health`

## Tests

Los tests utilizan `MONGO_URI_TEST`, que debe apuntar a una base separada de desarrollo/producción.

```bash
npm test
```

La suite cubre, entre otros:

- health check y estado de MongoDB
- Swagger
- creación y actualización de envíos
- tracking
- errores 404 y validación de estados
- usuarios y email duplicado
- mocks y cantidad inválida
- carga de PDF
- ausencia de archivo
- tipo de archivo inválido
- 404 global

No se utiliza la base de datos de producción durante las pruebas.

## Swagger / OpenAPI

La documentación interactiva está disponible en:

`GET /api/docs`

Incluye schemas de **User, Order/Envío, Delivery, Product, Error y Success**, parámetros de paginación y respuestas de error.

## Endpoints principales

| Método | Endpoint | Función |
|---|---|---|
| GET | `/health` | Health check |
| GET/POST | `/api/users` | Listar / crear usuarios |
| GET | `/api/users/:id` | Obtener usuario |
| GET/POST | `/api/products` | Listar / crear productos |
| GET | `/api/products/:id` | Obtener producto |
| GET/POST | `/api/orders` | Listar / crear envíos |
| GET | `/api/orders/:id` | Obtener envío |
| PUT | `/api/orders/:id` | Actualizar envío |
| GET |`/api/orders/tracking/:trackingCode` | Tracking por ID o código |
| GET/POST | `/api/deliveries` | Listar / crear entregas |
| GET/PUT | `/api/deliveries/:id` | Consultar / actualizar entrega |
| POST | `/api/uploads/document` | Subir documento/comprobante asociado a usuario, envío o entrega |
| GET | `/api/mocks/users?qty=5` | Usuarios simulados |
| GET | `/api/mocks/drivers?qty=5` | Repartidores simulados |
| GET | `/api/mocks/orders?qty=5` | Envíos simulados |
| POST | `/api/mocks/seed` | Seed controlado |
| GET | `/api/logger-test` | Prueba de logger (solo endpoints internos habilitados) |

## Respuestas y manejo global de errores

Todas las excepciones pasan por un middleware global y mantienen una estructura consistente:

```json
{
  "status": "fail",
  "statusCode": 400,
  "errorCode": "DATA_001",
  "message": "Los datos enviados son inválidos o están incompletos."
}
```

Se contemplan errores personalizados para:

- recurso no encontrado
- datos inválidos
- estado inválido
- cantidad de mocks inválida
- archivo requerido
- tipo de archivo inválido
- archivo demasiado grande
- errores de validación de Mongoose
- duplicados
- errores internos

## Logging

Winston está centralizado en `src/utils/logger.js`.

- `logs/error-YYYY-MM-DD.log`: errores
- `logs/combined-YYYY-MM-DD.log`: actividad general
- rotación diaria y retención de 14 días
- consola **solo en development/test**
- producción escribe en archivos y no contamina stdout con logs de aplicación

`logs/` está excluido de Git.

## Carga de archivos

Multer acepta:

- PDF
- JPG/JPEG
- PNG
- máximo 5 MB
- un archivo por request

Los archivos se guardan en `uploads/documents/` y los metadatos se persisten en MongoDB con su propietario (`User`, `Order` o `Delivery`).

La carpeta del repositorio queda saneada mediante `.gitkeep`; los archivos reales se generan únicamente en runtime.

El request utiliza `multipart/form-data`.

El campo del archivo debe llamarse:

`document`

Además, se debe enviar exactamente uno de estos campos:

- `userId`
- `orderId`
- `deliveryId`

Ejemplo conceptual:

```text
document: comprobante.pdf
orderId: 64f...

## Docker

### Opción recomendada: Docker Compose

Construir y levantar API + MongoDB:

```bash
docker compose up --build
```

MongoDB utiliza un volumen persistente. La API depende del `healthcheck` de Mongo y no arranca hasta que la base responde correctamente.

Accesos:

- API: `http://localhost:8080`
- Swagger: `http://localhost:8080/api/docs`
- Health: `http://localhost:8080/health`

Detener:

```bash
docker compose down
```

Detener eliminando también los volúmenes:

```bash
docker compose down -v
```

### Imagen individual

```bash
docker build -t shipnow-api:1.0 .
docker run --rm -p 8080:8080 --env-file .env shipnow-api:1.0
```

El `Dockerfile` utiliza un enfoque **multi-stage**, instala únicamente dependencias de producción en la imagen final y ejecuta el proceso con el usuario no root `node`.

## Seguridad y performance

- `express.json` limitado a 1 MB.
- Paginación en listados con máximo configurable.
- Multer limitado a 5 MB y un archivo por request.
- `x-powered-by` deshabilitado.
- Endpoints internos (mocks/logger) controlados por ambiente.
- `.env`, logs, uploads, coverage y temporales excluidos de Git.
- No existen credenciales Mongo hardcodeadas en el código.
- Health check disponible para monitoreo y Docker.
