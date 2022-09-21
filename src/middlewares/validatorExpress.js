import { body, validationResult } from "express-validator";

// errors
const resultValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.json({ errors: errors.array()[0].msg });

  next();
};

// validations
export const registerValidator = [
  body("first_name")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Nombre invalido"),
  body("last_name")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Apellido invalido"),
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
  resultValidator,
];

export const loginValidator = [
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
    .withMessage("Contraseña incorrecta"),
  resultValidator,
];
