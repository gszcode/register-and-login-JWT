import { Router } from "express";
import { register } from "../controllers/authControllers.js";
const route = Router();

route.post("/register", register);

export default route;
