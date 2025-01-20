import app from './app.js';

// Configuración del puerto
const PORT = process.env.PORT || 5000;

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
