const tareaModel = require("../models/tareaModel");

function registrarTarea(req, res) {
  let { nombre, descripcion, estado } = req.body;

  if (!nombre || !descripcion || !estado) {
    return res.status(400).json({
      mensaje: "Completa todos los campos",
    });
  }

  tareaModel.registrar(nombre, descripcion, estado);

  res.json({
    mensaje: "Tarea registrada",
  });
}

function consultarTareas(req, res) {
  res.json(tareaModel.consultar());
}

function actualizarTarea(req, res) {
  let id = Number(req.params.id);
  let { nombre, descripcion, estado } = req.body;

  if (!nombre || !descripcion || !estado) {
    return res.status(400).json({
      mensaje: "Completa todos los campos",
    });
  }

  let actualizado = tareaModel.actualizar(id, nombre, descripcion, estado);

  if (actualizado) {
    return res.json({
      mensaje: "Tarea actualizada",
    });
  }

  res.status(404).json({
    mensaje: "Tarea no encontrada",
  });
}

module.exports = {
  registrarTarea,
  consultarTareas,
  actualizarTarea,
};
