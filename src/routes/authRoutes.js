import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";
import {
  infoUser,
  login,
  logout,
  register,
} from "../controllers/authControllers.js";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/validatorExpress.js";

const route = Router();

route.post("/register", registerValidator, register);
route.post("/login", loginValidator, login);
route.get("/logout", requireToken, logout);

// example
route.get("/info", requireToken, infoUser);

export default route;
