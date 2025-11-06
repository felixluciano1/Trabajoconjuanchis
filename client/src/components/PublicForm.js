import React, { useState } from "react";

function PublicForm() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos al backend
    console.log({ titulo, descripcion, precio, ubicacion });
    alert("Propiedad publicada con éxito!");
    // Limpiar formulario
    setTitulo("");
    setDescripcion("");
    setPrecio("");
    setUbicacion("");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">Publicar Propiedad</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            className="form-control"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Publicar
        </button>
      </form>
    </div>
  );
}

export default PublicForm;
