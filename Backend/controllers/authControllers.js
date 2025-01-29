import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import colors from 'colors'
import nodemailer  from "nodemailer"
import dotenv from 'dotenv';


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

    // Generar token basado en el usuario recién registrado
    const token = generateToken(user); // Cambiado de userFound a user
    console.log(`Token generado: ${token}`.green);

    // Retornar respuesta sin incluir la contraseña
    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { id: user._id, username: user.username, email: user.email },
      token, // Cambiado para retornar solo el token
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







// // Comenzar a recuperar password
// const requestPasswordReset = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ error: "Email es requerido" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "Usuario no encontrado" });
//     }

//     // Generar un token único
//     console.log("Generando un token para requestPasswordResete".blue)

    
//     const token = crypto.randomBytes(32).toString("hex");
//     console.log("Generando un token para requestPasswordResete".blue)
//     console.log(`Token generado desde requestPasswordReset: ${token}`.blue)

//     // Establecer el token y su vencimiento
//     user.passwordResetToken = token;
//     user.passwordResetExpires = Date.now() + 3600000; // 1 hora
//     await user.save();

//     // Tomo mis credenciales desde una variable de entorno
//     dotenv.config();
//     const userEmail = process.env.USERMAIL
//     const passwordEmail = process.env.PASSWORDEMAIL

//     // Configurar y enviar el correo
//     const transporter = nodemailer.createTransport({
//       service: "Gmail", // Puedes usar otro servicio
//       auth: {
//         user: userEmail,
//         pass: passwordEmail, // Reemplaza esto con variables de entorno
//       },
//     });

//     const mailOptions = {
//       from: "tu-email@gmail.com",
//       to: user.email,
//       subject: "Recuperación de contraseña",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
//           <h2 style="color: #4CAF50; text-align: center;">Recuperación de contraseña</h2>
//           <p style="color: #333; font-size: 16px;">
//             Hola <b>${user.username}</b>, has solicitado recuperar tu contraseña.
//           </p>
//           <p style="color: #333; font-size: 16px;">
//             Por favor, haz clic en el enlace a continuación para establecer una nueva contraseña:
//           </p>
//           <div style="text-align: center; margin: 20px 0;">
//             <a 
//               href="http://localhost:3000/reset-password/${token}" 
//               style="
//                 background-color: #4CAF50; 
//                 color: white; 
//                 padding: 10px 20px; 
//                 text-decoration: none; 
//                 border-radius: 5px; 
//                 font-size: 16px;"
//               >
//               Recuperar contraseña
//             </a>
//           </div>
//           <p style="color: #777; font-size: 14px;">
//             Si no solicitaste este cambio, ignora este mensaje.
//           </p>
//           <p style="color: #777; font-size: 14px; text-align: center;">
//             &copy; 2025 Tu Aplicación
//           </p>
//         </div>
//       `,
//     };
    

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: "Correo de recuperación enviado" });
//   } catch (err) {
//     console.error("Error en la recuperación:", err.message);
//     res.status(500).json({ error: "Error del servidor" });
//   }
// };

// // Resetear passowrd
// const resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   if (!token || !newPassword) {
//     return res.status(400).json({ error: "Token y nueva contraseña son requeridos" });
//   }

//   try {
//     const user = await User.findOne({
//       passwordResetToken: token,
//       passwordResetExpires: { $gt: Date.now() }, // Verificar si el token no ha expirado
//     });

//     if (!user) {
//       return res.status(400).json({ error: "Token inválido o expirado" });
//     }

//     // Actualizar la contraseña
//     user.password = await bcrypt.hash(newPassword, 10);
//     user.passwordResetToken = undefined; // Limpiar el token
//     user.passwordResetExpires = undefined; // Limpiar la expiración
//     await user.save();

//     res.status(200).json({ message: "Contraseña actualizada con éxito" });
//   } catch (err) {
//     console.error("Error al restablecer la contraseña:", err.message);
//     res.status(500).json({ error: "Error del servidor" });
//   }
// };