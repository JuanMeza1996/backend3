import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import mongoose from 'mongoose';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Ivory:Tattoo1978@cluster0.2bcqzrd.mongodb.net/shipnow?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => logger.info('Conexión a MongoDB establecida con éxito'))
  .catch(err => logger.fatal(`Error al conectar a MongoDB: ${err.message}`));

app.listen(PORT, () => {
  logger.info(`Servidor ShipNow escuchando en el puerto ${PORT}`);
});