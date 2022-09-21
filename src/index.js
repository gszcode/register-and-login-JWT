import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
const app = express();

// database
import "./database.js";

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1/auth", authRoutes);

// initialization
app.listen(3001, () => {
  console.log("Server corriendo en puerto:", 3000);
});
