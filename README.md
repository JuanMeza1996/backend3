# ShipNow API — Performance, Escalabilidad, Testing & Docker

API RESTful profesional construida con **Node.js, Express y MongoDB**, diseñada bajo una arquitectura en 3 capas (*Controller - Service - Repository/Model*) con inyección de dependencias, sistema de mocking, logging con rotación, documentación interactiva en **Swagger UI**, suite de testing automatizado y contenerización con **Docker**.

---

## 🛠️ Performance & Optimización
- **Control de Listados:** Endpoints de consultas masivas admiten parámetros de paginación (`page` y `limit`) para evitar sobrecargar la base de datos y el Event Loop.
- **Gestión Estricta de File Uploads:** Restricción de formatos (`.pdf`, `.png`, `.jpg`), límite máximo de 5 MB y almacenamiento persistente fuera del flujo de código fuente.
- **Operaciones Asíncronas:** Procesamiento no bloqueante con manejo centralizado de excepciones y logging optimizado mediante rotación diaria de archivos (*Winston*).

---

## 🔒 Variables de Entorno & Configuración
La API implementa un validador estricto al iniciar (`src/config/env.config.js`). **Si falta alguna variable crítica, el servidor se detiene inmediatamente con un mensaje explícito.**

### Variables requeridas en el archivo `.env`:
```env
PORT=8080
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/shipnow?retryWrites=true&w=majority
MONGO_URI_TEST=mongodb+srv://usuario:password@cluster.mongodb.net/shipnow_test?retryWrites=true&w=majority
NODE_ENV=development
LOG_LEVEL=info
JWT_SECRET=super_secreto_jwt