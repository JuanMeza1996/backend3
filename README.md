# ShipNow API - Refactorización a Arquitectura por Capas

Proyecto de backend refactorizado desde una arquitectura monolítica a un patrón profesional de 3 capas (**Controller - Service - Repository**) con inyección y validación estricta de variables de entorno.

## 🚀 Instrucciones para ejecutar localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JuanMeza1996/backend3
   cd shipnow-api

## 🛡️ Sistema Unificado de Gestión de Errores (Módulo 3)

La API **ShipNow** implementa una arquitectura centralizada de manejo de errores por capas. Toda excepción (de negocio o no controlada) es capturada y procesada por un **Middleware Global**, garantizando respuestas JSON con formato uniforme.

### 📄 Estructura de Respuesta de Error

Todos los errores devuelven un objeto JSON con la siguiente estructura:

```json
{
  "status": "fail | error",
  "statusCode": 400,
  "errorCode": "MOCK_001",
  "message": "Mensaje descriptivo orientado al cliente."
}