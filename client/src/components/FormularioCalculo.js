import React, { useState } from "react";
import "./FormularioCalculo.css";

const FormularioCalculo = () => {
  const [ubicacion, setUbicacion] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [habitaciones, setHabitaciones] = useState("");
  const [banos, setBanos] = useState("");
  const [ano, setAno] = useState("");
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const calcular = async () => {
    if (!ubicacion || !superficie || !habitaciones || !banos || !ano) {
      setError("⚠️ Por favor completa todos los campos.");
      return;
    }

    setCargando(true);
    setError("");
    setResultado(null);

    const datos = {
      ubicacion,
      superficie_m2: parseFloat(superficie),
      habitaciones: parseInt(habitaciones),
      banos: parseInt(banos),
      ano_construccion: parseInt(ano),
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/predecir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (!res.ok) throw new Error("Error en la predicción");

      const data = await res.json();
      setResultado(data.precio_estimado);
    } catch (err) {
      console.error("Error al calcular:", err);
      setError("❌ Hubo un problema al conectarse con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
    <div className="calculo-fondo"></div>
    <div className="calculo-container">
      <h2>🏡 Estimador de Precio de Propiedad</h2>
      <p className="subtitulo">Ingresa los datos del inmueble para obtener una estimación.</p>

      <div className="form-group">
        <label>Ubicación</label>
        <select
          className="form-control"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        >
          <option value="">Selecciona una ubicación</option>
          <option value="Trujillo Centro">Trujillo Centro</option>
          <option value="Víctor Larco">Víctor Larco</option>
          <option value="El Porvenir">El Porvenir</option>
          <option value="Florencia de Mora">Florencia de Mora</option>
          <option value="La Esperanza">La Esperanza</option>
          <option value="Moche">Moche</option>
          <option value="Huanchaco">Huanchaco</option>
          <option value="Laredo">Laredo</option>
          <option value="Poroto">Poroto</option>
          <option value="Salaverry">Salaverry</option>
        </select>
      </div>

      <div className="form-group">
        <label>Superficie (m²)</label>
        <input
          type="number"
          className="form-control"
          placeholder="Ej: 120"
          value={superficie}
          onChange={(e) => setSuperficie(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Habitaciones</label>
        <input
          type="number"
          className="form-control"
          placeholder="Ej: 3"
          value={habitaciones}
          onChange={(e) => setHabitaciones(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Baños</label>
        <input
          type="number"
          className="form-control"
          placeholder="Ej: 2"
          value={banos}
          onChange={(e) => setBanos(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Año de construcción</label>
        <input
          type="number"
          className="form-control"
          placeholder="Ej: 2018"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />
      </div>

      <button
        onClick={calcular}
        className="btn-calcular"
        disabled={cargando}
      >
        {cargando ? "Calculando..." : "Calcular Precio"}
      </button>

      {error && <p className="mensaje-error">{error}</p>}

      {resultado !== null && (
        <div className="resultado">
          💰 <strong>Precio estimado:</strong> S/. {resultado.toFixed(2)}
        </div>
      )}
    </div>
  </>
  );
};

export default FormularioCalculo;
