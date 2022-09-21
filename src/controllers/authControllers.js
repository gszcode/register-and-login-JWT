import User from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/createToken.js";

// register users
export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) throw new Error("Email ya existente");

    user = new User({ first_name, last_name, email, password });
    await user.save();

    return res.json(user);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

// login users
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Email no existent");

    const responsePassword = await user.comparePassword(password);
    if (!responsePassword) throw new Error("Contraseña incorrecta");

    // generate token
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};

// info user
export const infoUser = async (req, res) => {
  const id = req.uid;

  try {
    const user = await User.findById(id).lean();

    res.json({ email: user.email });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// generate refreshToken
export const requireRefreshToken = (req, res) => {
  try {
    let refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new Error("No existe el token");

    const { uid } = jwt.verify(refreshToken, process.env.JWTREFRESH);
    const { token, expiresIn } = generateToken(uid);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

// logout
export const logout = (req, res) => {
  res.clearCookie("refreshToken");
};
