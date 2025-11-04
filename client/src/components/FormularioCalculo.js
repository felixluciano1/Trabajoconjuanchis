import React, { useState } from "react";

const FormularioCalculo = () => {
  const [ubicacion, setUbicacion] = useState("");
  const [superficie, setSuperficie] = useState(0);
  const [habitaciones, setHabitaciones] = useState(0);
  const [banos, setBanos] = useState(0);
  const [ano, setAno] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcular = async () => {
    const datos = {
      ubicacion,
      superficie_m2: superficie,
      habitaciones,
      banos,
      ano_construccion: ano
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/predecir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });
      const data = await res.json();
      setResultado(data.precio_estimado);
    } catch (err) {
      console.error("Error al calcular:", err);
    }
  };

  return (
    <div>
      <h3>Calcular precio de propiedad</h3>
      <input placeholder="Ubicación" value={ubicacion} onChange={e => setUbicacion(e.target.value)} />
      <input type="number" placeholder="Superficie (m²)" value={superficie} onChange={e => setSuperficie(Number(e.target.value))} />
      <input type="number" placeholder="Habitaciones" value={habitaciones} onChange={e => setHabitaciones(Number(e.target.value))} />
      <input type="number" placeholder="Baños" value={banos} onChange={e => setBanos(Number(e.target.value))} />
      <input type="number" placeholder="Año de construcción" value={ano} onChange={e => setAno(Number(e.target.value))} />
      <button onClick={calcular} className="btn btn-primary mt-2">Calcular</button>
      {resultado !== null && <p className="mt-2">💰 Precio estimado: S/. {resultado.toFixed(2)}</p>}
    </div>
  );
};

export default FormularioCalculo;
