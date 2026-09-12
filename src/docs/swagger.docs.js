/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Health check de API y MongoDB
 *     responses:
 *       200:
 *         description: Servicio disponible
 *       503:
 *         description: Servicio degradado
 *
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Listar usuarios
 *     responses:
 *       200:
 *         description: Usuarios encontrados
 *
 *   post:
 *     tags: [Users]
 *     summary: Crear usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Email duplicado
 *
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Obtener usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario inexistente
 *
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Listar productos
 *     responses:
 *       200:
 *         description: Productos encontrados
 *
 *   post:
 *     tags: [Products]
 *     summary: Crear producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Datos inválidos
 *
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
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
 *       404:
 *         description: Producto inexistente
 *
 * /api/orders:
 *   get:
 *     tags: [Shipments]
 *     summary: Listar envíos
 *     responses:
 *       200:
 *         description: Envíos encontrados
 *
 *   post:
 *     tags: [Shipments]
 *     summary: Crear envío
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipment'
 *     responses:
 *       201:
 *         description: Envío creado con tracking
 *       400:
 *         description: Datos inválidos
 *
 * /api/orders/tracking/{trackingCode}:
 *   get:
 *     tags: [Shipments]
 *     summary: Consultar tracking
 *     parameters:
 *       - in: path
 *         name: trackingCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado del envío
 *       404:
 *         description: Tracking inexistente
 *
 * /api/orders/{id}:
 *   get:
 *     tags: [Shipments]
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
 *       404:
 *         description: Envío inexistente
 *
 *   put:
 *     tags: [Shipments]
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
 *             $ref: '#/components/schemas/Shipment'
 *     responses:
 *       200:
 *         description: Envío actualizado
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Envío inexistente
 *
 * /api/deliveries:
 *   get:
 *     tags: [Deliveries]
 *     summary: Listar entregas
 *     responses:
 *       200:
 *         description: Entregas encontradas
 *
 *   post:
 *     tags: [Deliveries]
 *     summary: Crear entrega
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delivery'
 *     responses:
 *       201:
 *         description: Entrega creada
 *
 * /api/deliveries/{id}:
 *   get:
 *     tags: [Deliveries]
 *     summary: Obtener entrega
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entrega encontrada
 *       404:
 *         description: Entrega inexistente
 *
 *   put:
 *     tags: [Deliveries]
 *     summary: Actualizar entrega
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entrega actualizada
 *
 * /api/mocks/users:
 *   get:
 *     tags: [Mocks]
 *     summary: Generar usuarios simulados
 *     parameters:
 *       - in: query
 *         name: qty
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *     responses:
 *       200:
 *         description: Usuarios simulados
 *       400:
 *         description: Cantidad inválida
 *
 * /api/mocks/products:
 *   get:
 *     tags: [Mocks]
 *     summary: Generar productos simulados
 *     responses:
 *       200:
 *         description: Productos simulados
 *
 * /api/mocks/drivers:
 *   get:
 *     tags: [Mocks]
 *     summary: Generar repartidores simulados
 *     responses:
 *       200:
 *         description: Repartidores simulados
 *
 * /api/mocks/orders:
 *   get:
 *     tags: [Mocks]
 *     summary: Generar envíos simulados
 *     responses:
 *       200:
 *         description: Envíos simulados
 *
 * /api/mocks/seed:
 *   post:
 *     tags: [Mocks]
 *     summary: Persistir mocks en MongoDB
 *     responses:
 *       201:
 *         description: Seeding completado
 *
 * /api/logger-test:
 *   get:
 *     tags: [Logger]
 *     summary: Ejecutar prueba de Winston
 *     responses:
 *       200:
 *         description: Logs generados
 *
 * /api/uploads/document:
 *   post:
 *     tags: [Uploads]
 *     summary: Subir documento o comprobante
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
 *               userId:
 *                 type: string
 *               orderId:
 *                 type: string
 *               deliveryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Archivo guardado
 *       400:
 *         description: Archivo faltante o inválido
 *       413:
 *         description: Archivo demasiado grande
 */