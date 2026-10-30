const express = require("express");

const router = express.Router();

const tareasController = require("../controllers/tareasController");

router.post("/", tareasController.registrarTarea);

router.get("/", tareasController.consultarTareas);

router.put("/:id", tareasController.actualizarTarea);

module.exports = router;
