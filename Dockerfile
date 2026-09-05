# 1. Imagen base oficial de Node.js (LTS Alpine para menor tamaño)
FROM node:20-alpine

# 2. Directorio de trabajo en el contenedor
WORKDIR /app

# 3. Copiar manifest de dependencias
COPY package*.json ./

# 4. Instalar dependencias de producción
RUN npm ci --only=production

# 5. Copiar el resto del código del proyecto
COPY . .

# 6. Crear directorio de uploads y asignarle permisos
RUN mkdir -p uploads/documents

# 7. Exponer el puerto configurado
EXPOSE 8080

# 8. Comando de inicio de la aplicación
CMD ["npm", "start"]