import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`📡 Conexión a base de datos exitosa: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error al conectar a la base de datos: ${error.message}`);
    process.exit(1); // Salir si no se puede conectar
  }
};

export default connectDB;
