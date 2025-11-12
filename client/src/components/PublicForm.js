import React, { useState } from "react";
import axios from "axios";

function PublicForm() {
  const [propietario, setPropietario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    whatsapp: "",
    foto: "",
  });

  const [propietarioId, setPropietarioId] = useState(null);

  const [inmueble, setInmueble] = useState({
    tipo: "Departamento",
    imagen: "",
    precio: "",
    departamento: "",
    ubicacion: "",
    areaConstruida: "",
    estado: "Disponible",
  });

  const [paso, setPaso] = useState(1); // Paso 1: Propietario, Paso 2: Inmueble

  /* =====================================================
     🔹 GUARDAR PROPIETARIO
  ====================================================== */
  const handleGuardarPropietario = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/propietarios", propietario);
      if (res.data.success) {
        alert("✅ Propietario registrado correctamente");
        setPropietarioId(res.data.propietarioId);
        setPaso(2);
      }
    } catch (error) {
      console.error("Error al registrar propietario:", error);
      alert("❌ Error al registrar propietario");
    }
  };

  /* =====================================================
     🔹 PUBLICAR INMUEBLE
  ====================================================== */
  const handlePublicarInmueble = async (e) => {
    e.preventDefault();
    if (!propietarioId) {
      alert("Primero debes registrar un propietario");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/publicaciones", {
        ...inmueble,
        PropietarioId: propietarioId,
      });
      alert("✅ Inmueble publicado con éxito!");
      console.log("Respuesta:", res.data);

      // Limpiar formularios
      setInmueble({
        tipo: "Departamento",
        imagen: "",
        precio: "",
        departamento: "",
        ubicacion: "",
        areaConstruida: "",
        estado: "Disponible",
      });
      setPropietario({
        nombre: "",
        telefono: "",
        correo: "",
        whatsapp: "",
        foto: "",
      });
      setPaso(1);
      setPropietarioId(null);
    } catch (error) {
      console.error("Error al publicar inmueble:", error);
      alert("❌ Error al publicar inmueble");
    }
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-light shadow">
      <h3 className="mb-4 text-center">
        {paso === 1 ? "Registrar Propietario" : "Publicar Propiedad"}
      </h3>

      {/* ====================== FORMULARIO PROPIETARIO ====================== */}
      {paso === 1 && (
        <form onSubmit={handleGuardarPropietario}>
          <div className="mb-3">
            <label className="form-label">Nombre del Propietario</label>
            <input
              type="text"
              className="form-control"
              value={propietario.nombre}
              onChange={(e) => setPropietario({ ...propietario, nombre: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              value={propietario.telefono}
              onChange={(e) => setPropietario({ ...propietario, telefono: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              value={propietario.correo}
              onChange={(e) => setPropietario({ ...propietario, correo: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">WhatsApp (opcional)</label>
            <input
              type="text"
              className="form-control"
              value={propietario.whatsapp}
              onChange={(e) => setPropietario({ ...propietario, whatsapp: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Foto (URL opcional)</label>
            <input
              type="text"
              className="form-control"
              value={propietario.foto}
              onChange={(e) => setPropietario({ ...propietario, foto: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Continuar para publicar propiedad
          </button>
        </form>
      )}

      {/* ====================== FORMULARIO INMUEBLE ====================== */}
      {paso === 2 && (
        <form onSubmit={handlePublicarInmueble}>
          <div className="mb-3">
            <label className="form-label">Tipo de Inmueble</label>
            <select
              className="form-select"
              value={inmueble.tipo}
              onChange={(e) => setInmueble({ ...inmueble, tipo: e.target.value })}
            >
              <option value="Departamento">Departamento</option>
              <option value="Casa">Casa</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Imagen (URL)</label>
            <input
              type="text"
              className="form-control"
              value={inmueble.imagen}
              onChange={(e) => setInmueble({ ...inmueble, imagen: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
              type="number"
              className="form-control"
              value={inmueble.precio}
              onChange={(e) => setInmueble({ ...inmueble, precio: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Departamento</label>
            <input
              type="text"
              className="form-control"
              value={inmueble.departamento}
              onChange={(e) => setInmueble({ ...inmueble, departamento: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ubicación Exacta</label>
            <input
              type="text"
              className="form-control"
              value={inmueble.ubicacion}
              onChange={(e) => setInmueble({ ...inmueble, ubicacion: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Área Construida (m²)</label>
            <input
              type="number"
              className="form-control"
              value={inmueble.areaConstruida}
              onChange={(e) => setInmueble({ ...inmueble, areaConstruida: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              value={inmueble.estado}
              onChange={(e) => setInmueble({ ...inmueble, estado: e.target.value })}
            >
              <option value="Disponible">Disponible</option>
              <option value="Vendido">Vendido</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Publicar Inmueble
          </button>
        </form>
      )}
    </div>
  );
}

export default PublicForm;
