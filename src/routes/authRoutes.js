import { Router } from "express";
import { login, register } from "../controllers/authControllers.js";
import { body } from "express-validator";
const route = Router();

route.post(
  "/register",
  [
    body("first_name")
      .isLength({ min: 3, max: 30 })
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage("Nombre invalido, minimo 3 caracteres"),
    body("last_name")
      .isLength({ min: 3, max: 16 })
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage("Apellido invalido, minimo 3 caracteres"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Ingrese su Email")
      .isEmail()
      .withMessage("Ingrese un Email valido"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Ingrese su contraseña")
      .isLength({ min: 8 })
      .withMessage("Minimo 8 caracteres"),
  ],
  register
);
route.post("/login", login);

export default route;
