import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) throw new Error("No existe el token");

    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWTSECRET);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
