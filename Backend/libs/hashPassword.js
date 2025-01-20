import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  await bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error al generar el hash:", err);
    } else {
      return hash;
    }
  });
};