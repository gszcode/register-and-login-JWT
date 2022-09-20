import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.cbqftak.mongodb.net/${process.env.DBNAME}`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Base de Datos conectada"))
  .catch((err) => console.log("Ocurrio un error:", err));
