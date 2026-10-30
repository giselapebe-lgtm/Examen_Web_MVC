const express = require("express");
const cors = require("cors");

const tareasRoutes = require("./routes/tareasRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tareas", tareasRoutes);

app.listen(3000, () => {
  console.log("Servidor iniciado en puerto 3000");
});
