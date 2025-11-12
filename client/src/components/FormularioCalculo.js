import React, { useState } from "react";

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
      setError("Por favor completa todos los campos.");
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
      setError("Hubo un problema al conectarse con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow bg-light" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-4">🏡 Calcular precio de propiedad</h3>

      <input
        className="form-control mb-2"
        placeholder="Ubicación"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Superficie (m²)"
        value={superficie}
        onChange={(e) => setSuperficie(e.target.value)}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Habitaciones"
        value={habitaciones}
        onChange={(e) => setHabitaciones(e.target.value)}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Baños"
        value={banos}
        onChange={(e) => setBanos(e.target.value)}
      />
      <input
        type="number"
        className="form-control mb-3"
        placeholder="Año de construcción"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
      />

      <button
        onClick={calcular}
        className="btn btn-primary w-100"
        disabled={cargando}
      >
        {cargando ? "Calculando..." : "Calcular Precio"}
      </button>

      {error && <p className="text-danger mt-3 text-center">{error}</p>}

      {resultado !== null && (
        <div className="alert alert-success mt-3 text-center">
          💰 <strong>Precio estimado:</strong> S/. {resultado.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default FormularioCalculo;
