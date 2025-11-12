import React, { useState } from "react";

function PropietarioForm({ onRegistroExitoso }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    whatsapp: "",
    foto: "",
  });
  const [guardando, setGuardando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const res = await fetch("http://localhost:5000/api/propietarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Propietario registrado correctamente");
        onRegistroExitoso(data.propietarioId);
      } else {
        alert("⚠️ Error al registrar propietario");
      }
    } catch (err) {
      console.error("Error al guardar propietario:", err);
      alert("❌ Error de conexión con el servidor");
    }

    setGuardando(false);
  };

  return (
    <div className="card p-4 shadow-lg mb-4">
      <h4 className="text-center mb-3 text-primary">Registro del Propietario</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Teléfono:</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Correo:</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>WhatsApp:</label>
          <input
            type="text"
            className="form-control"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="https://wa.me/51XXXXXXXXX"
            required
          />
        </div>
        <div className="mb-3">
          <label>Foto (URL):</label>
          <input
            type="text"
            className="form-control"
            name="foto"
            value={form.foto}
            onChange={handleChange}
            placeholder="https://imagen.com/foto.jpg"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={guardando}
        >
          {guardando ? "Guardando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}

export default PropietarioForm;
