import User from "../models/User.js";
import { validationResult } from "express-validator";

// register users
export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(404).json({ message: "Email ya existente" });

    user = new User({ first_name, last_name, email, password });
    await user.save();

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// login users
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Email no existente" });

    const responsePassword = await user.comparePassword(password);
    if (!responsePassword)
      res.status(404).json({ message: "Contraseña incorrecta" });

    return res.json({ message: "Logueado" });
  } catch (error) {
    console.log(error);
  }
};
