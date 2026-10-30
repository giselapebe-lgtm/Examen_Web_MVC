const fs = require("fs");
const path = require("path");

const archivo = path.join(__dirname, "../tareas.txt");

class Nodo {
  constructor(id, nombre, descripcion, estado) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estado = estado;
    this.siguiente = null;
  }
}

let cabeza = null;
let siguienteId = 1;

function agregar(id, nombre, descripcion, estado) {
  let nuevo = new Nodo(id, nombre, descripcion, estado);

  if (cabeza == null) {
    cabeza = nuevo;
  } else {
    let actual = cabeza;

    while (actual.siguiente != null) {
      actual = actual.siguiente;
    }

    actual.siguiente = nuevo;
  }
}

function consultar() {
  let tareas = [];
  let actual = cabeza;

  while (actual != null) {
    tareas.push({
      id: actual.id,
      nombre: actual.nombre,
      descripcion: actual.descripcion,
      estado: actual.estado,
    });

    actual = actual.siguiente;
  }

  return tareas;
}

function guardar() {
  fs.writeFileSync(archivo, JSON.stringify(consultar(), null, 2));
}

if (fs.existsSync(archivo)) {
  let datos = fs.readFileSync(archivo, "utf8");

  if (datos.trim() != "") {
    let tareas = JSON.parse(datos);

    tareas.forEach((tarea) => {
      let id = siguienteId;

      if (Number.isInteger(tarea.id) && tarea.id >= siguienteId) {
        id = tarea.id;
      }

      agregar(id, tarea.nombre, tarea.descripcion, tarea.estado);

      siguienteId = id + 1;
    });
  }
}

function registrar(nombre, descripcion, estado) {
  agregar(siguienteId, nombre, descripcion, estado);

  siguienteId++;

  guardar();
}

function actualizar(id, nombre, descripcion, estado) {
  let actual = cabeza;

  while (actual != null) {
    if (actual.id == id) {
      actual.nombre = nombre;
      actual.descripcion = descripcion;
      actual.estado = estado;

      guardar();

      return true;
    }

    actual = actual.siguiente;
  }

  return false;
}

module.exports = {
  registrar,
  consultar,
  actualizar,
};
