import express from 'express';
import connectDB from './db.js';
import authRoutes from './routes/authRoutes.js';
import colors from 'colors'
import cors from 'cors'


// Crear aplicación Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:5173', // URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
};
app.use(cors(corsOptions)); // Aplicar configuración de CORS

console.log("Iniciando la app, desde app.js".blue);

// Rutas
app.use('/api/auth', authRoutes);

// Conectar a la base de datos
connectDB();

export default app;



// import express from 'express';
// import cors from 'cors'; // Importar cors
// import connectDB from './db.js';
// import authRoutes from './routes/authRoutes.js';
// import colors from 'colors';

// // Crear aplicación Express
// const app = express();

// // Middleware para parsear JSON
// app.use(express.json());



// // Conectar a la base de datos
// connectDB();