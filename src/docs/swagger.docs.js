/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Estado general de la API
 *   - name: Users
 *     description: Gestión de usuarios
 *   - name: Products
 *     description: Gestión de productos
 *   - name: Orders
 *     description: Gestión de envíos y tracking
 *   - name: Deliveries
 *     description: Gestión de entregas
 *   - name: Mocks
 *     description: Generación y persistencia de datos simulados
 *   - name: Uploads
 *     description: Carga de documentos y comprobantes
 *   - name: Logger
 *     description: Prueba del sistema de logging
 */


/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Verificar estado de la API
 *     description: Devuelve el estado general de la aplicación y la conexión con MongoDB.
 *     responses:
 *       200:
 *         description: API operativa y base de datos conectada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 environment:
 *                   type: string
 *                   example: development
 *                 database:
 *                   type: string
 *                   example: connected
 *                 uptime:
 *                   type: number
 *                   example: 120.45
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       503:
 *         description: API activa pero base de datos no disponible
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: DEGRADED
 *                 environment:
 *                   type: string
 *                   example: production
 *                 database:
 *                   type: string
 *                   example: disconnected
 *                 uptime:
 *                   type: number
 *                   example: 25.1
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Listar usuarios
 *     description: Devuelve usuarios con paginación.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad máxima de registros por página
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       type: object
 *                       properties:
 *                         docs:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/User'
 *                         totalDocs:
 *                           type: integer
 *                           example: 20
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         totalPages:
 *                           type: integer
 *                           example: 2
 *       400:
 *         description: Parámetros de paginación inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   post:
 *     tags:
 *       - Users
 *     summary: Crear usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - user
 *                   - repartidor
 *                 example: user
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos de usuario inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email ya registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f10c57d2ad98a0b1234567
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Listar productos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       type: object
 *                       properties:
 *                         docs:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Product'
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   post:
 *     tags:
 *       - Products
 *     summary: Crear producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: Caja mediana
 *               price:
 *                 type: number
 *                 example: 1500
 *               stock:
 *                 type: integer
 *                 example: 10
 *               status:
 *                 type: string
 *                 enum:
 *                   - AVAILABLE
 *                   - OUT_OF_STOCK
 *                 example: AVAILABLE
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Producto duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Listar envíos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *     responses:
 *       200:
 *         description: Lista de envíos
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       type: object
 *                       properties:
 *                         docs:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   post:
 *     tags:
 *       - Orders
 *     summary: Crear envío
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - deliveryAddress
 *               - totalAmount
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64f10c57d2ad98a0b1234567
 *               customerName:
 *                 type: string
 *                 example: Carlos López
 *               deliveryAddress:
 *                 type: string
 *                 example: Av. Libertador 1234
 *               totalAmount:
 *                 type: number
 *                 example: 2500
 *               priority:
 *                 type: string
 *                 enum:
 *                   - baja
 *                   - media
 *                   - alta
 *                 example: alta
 *     responses:
 *       201:
 *         description: Envío creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/orders/tracking/{trackingCode}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Consultar tracking
 *     description: Obtiene un envío mediante su código de tracking.
 *     parameters:
 *       - in: path
 *         name: trackingCode
 *         required: true
 *         schema:
 *           type: string
 *         example: SHP-A1B2C3D4
 *     responses:
 *       200:
 *         description: Tracking encontrado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/Shipment'
 *       404:
 *         description: Envío no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener envío por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Envío encontrado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Envío no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     tags:
 *       - Orders
 *     summary: Actualizar envío
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               deliveryAddress:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *               priority:
 *                 type: string
 *                 enum:
 *                   - baja
 *                   - media
 *                   - alta
 *               status:
 *                 type: string
 *                 enum:
 *                   - pendiente
 *                   - en_camino
 *                   - entregado
 *                   - cancelado
 *     responses:
 *       200:
 *         description: Envío actualizado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Datos, estado o ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Envío no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     tags:
 *       - Deliveries
 *     summary: Listar entregas
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *     responses:
 *       200:
 *         description: Lista de entregas
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       type: object
 *                       properties:
 *                         docs:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Delivery'
 *
 *   post:
 *     tags:
 *       - Deliveries
 *     summary: Crear entrega
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - driverId
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 64f10c57d2ad98a0b1234567
 *               driverId:
 *                 type: string
 *                 example: 64f10c57d2ad98a0b7654321
 *     responses:
 *       201:
 *         description: Entrega creada
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/deliveries/{id}:
 *   get:
 *     tags:
 *       - Deliveries
 *     summary: Obtener entrega por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entrega encontrada
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Entrega no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     tags:
 *       - Deliveries
 *     summary: Actualizar estado de entrega
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - asignado
 *                   - en_curso
 *                   - completado
 *                 example: completado
 *     responses:
 *       200:
 *         description: Entrega actualizada
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Estado o ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Entrega no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     tags:
 *       - Mocks
 *     summary: Generar usuarios simulados
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad de usuarios a generar
 *     responses:
 *       200:
 *         description: Usuarios simulados
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/mocks/products:
 *   get:
 *     tags:
 *       - Mocks
 *     summary: Generar productos simulados
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: Productos simulados
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *       400:
 *         description: Cantidad inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/mocks/drivers:
 *   get:
 *     tags:
 *       - Mocks
 *     summary: Generar repartidores simulados
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: Repartidores simulados
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         description: Cantidad inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/mocks/orders:
 *   get:
 *     tags:
 *       - Mocks
 *     summary: Generar envíos simulados
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: Envíos simulados
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Cantidad inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/mocks/seed:
 *   post:
 *     tags:
 *       - Mocks
 *     summary: Persistir datos simulados
 *     description: Genera y guarda datos mock en MongoDB.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *                 example: 5
 *               products:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *                 example: 5
 *               drivers:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *                 example: 5
 *               orders:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *                 example: 5
 *     responses:
 *       201:
 *         description: Datos mock persistidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Cantidades inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/uploads/document:
 *   post:
 *     tags:
 *       - Uploads
 *     summary: Subir documento o comprobante
 *     description: >
 *       Permite subir un archivo PDF, JPG o PNG.
 *       Debe enviarse exactamente una asociación:
 *       userId, orderId o deliveryId.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF, JPG o PNG
 *               userId:
 *                 type: string
 *                 description: ID del usuario asociado
 *               orderId:
 *                 type: string
 *                 description: ID del envío asociado
 *               deliveryId:
 *                 type: string
 *                 description: ID de la entrega asociada
 *     responses:
 *       201:
 *         description: Archivo cargado y metadatos guardados
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     payload:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         filename:
 *                           type: string
 *                         originalname:
 *                           type: string
 *                           example: comprobante.pdf
 *                         mimetype:
 *                           type: string
 *                           example: application/pdf
 *                         size:
 *                           type: integer
 *                           example: 20480
 *                         path:
 *                           type: string
 *                           example: uploads/documents/archivo.pdf
 *                         userId:
 *                           type: string
 *                         orderId:
 *                           type: string
 *                         deliveryId:
 *                           type: string
 *       400:
 *         description: >
 *           Archivo faltante, tipo de archivo no permitido,
 *           asociación inválida o recurso asociado inexistente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       413:
 *         description: Archivo demasiado grande
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


/**
 * @swagger
 * /api/logger-test:
 *   get:
 *     tags:
 *       - Logger
 *     summary: Probar niveles de logging
 *     description: >
 *       Genera mensajes debug, info, warn y error.
 *       Disponible únicamente fuera del entorno production.
 *     responses:
 *       200:
 *         description: Logger ejecutado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Endpoint no disponible en producción
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */