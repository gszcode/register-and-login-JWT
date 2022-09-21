import { Router } from "express";
import { login, register } from "../controllers/authControllers.js";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/validatorExpress.js";
const route = Router();

route.post("/register", registerValidator, register);
route.post("/login", loginValidator, login);

export default route;
