import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnection = {
  isConnected: 0,
};

// Función para conectar a la base de datos

export const Connect = async () => {
  // Realizamos la conexión con la bd

  await mongoose.connect(process.env.DATABASE_URL || '');
  mongoConnection.isConnected = 1;

  console.log('---> Conectado a MongoDB:', process.env.DATABASE_URL);
};

export const Disconnect = async () => {
  // Si estamos en desarrollo no nos desconectamos de la bd

  if (process.env.NODE_ENV === 'development') return;

  // Si ya estamos desconectamos no hacemos nada

  if (mongoConnection.isConnected === 0) return;

  // Realizamos la desconexión de la bd

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;

  console.log('---> Desconectado de MongoDB');
};
