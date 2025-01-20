import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    req.user = verified; // Agrega los datos del usuario verificado al request
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export {verifyToken} 