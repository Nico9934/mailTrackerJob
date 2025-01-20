import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import colors from 'colors'



// Register
const registerUser = async (req, res) => {

  
  const { username, email, password } = req.body;

  // Validación inicial
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Register - Email y contraseña son obligatorios" });
  }

  try {
    console.log(`Intentando registrar usuario: ${email}`.blue);

    // Verificar si el usuario ya existe
    const userFound = await User.findOne({ email });
    if (userFound) {
      console.log("El usuario ya está registrado".yellow);
      return res.status(400).json({ error: "El usuario con ese correo ya está registrado" });
    }

    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Contraseña hasheada: ${hashedPassword}`.blue);

    const user = new User({ username, email, password: hashedPassword });

    // Guardar el usuario en la base de datos
    await user.save();
    console.log("Usuario registrado exitosamente".green);

    // Retornar respuesta sin incluir la contraseña
    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Error durante el registro:", err.message.red);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Login
const login = async (req, res) => {
  console.log("Se esta ejecutando la funcion Login desde authControllers.js".green)
  console.log(`Request desde el front: ${req.body}`.green);

  const { email, password } = req.body;

  // Validación inicial
  if (!email || !password) {
    console.log("Faltan credenciales".yellow);
    return res.status(400).json({ error: "Login - Email y contraseña son obligatorios" });
  }

  console.log(`Intentando iniciar sesión para: ${email}`.blue);

  try {
    // Buscar el usuario en la base de datos
    const userFound = await User.findOne({ email });
    if (!userFound) {
      console.log("Usuario no encontrado".red);
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log(`Usuario encontrado: ${userFound}`.green);

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    console.log(`Match de password: ${isMatch}`.blue);
    console.log(`Contraseña recibida: ${password}`.blue);
    console.log(`Contraseña almacenada: ${userFound.password}`.blue);

    if (!isMatch) {
      console.log("Contraseña incorrecta".red);
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // Generar token
    const token = generateToken(userFound);
    console.log(`Token generado: ${token}`.green);

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (err) {
    console.error("Error durante el inicio de sesión:", err.message.red);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Logout
const logout = (req, res) => {
  res.status(200).json({ message: 'User logged out' });
};

// Generate JWT
const generateToken = (user) => {
  console.log("Generando token desde generateToken".green)
  return jwt.sign(
    { id: user._id, email: user.email }, // Información dentro del token
    process.env.JWT_SECRET,             // Clave secreta del token
    { expiresIn: '1h' }                 // Tiempo de expiración
  );
};

// Export all functions together
export { registerUser, login, logout, generateToken };




