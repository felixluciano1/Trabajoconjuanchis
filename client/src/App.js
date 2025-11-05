import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import FormularioCalculo from "./components/FormularioCalculo";
import LoginForm from "./components/LoginForm";
import "./App.css";

function App() {
  const [propiedades, setPropiedades] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [contenido, setContenido] = useState("inicio");

  // 🔄 Cargar inmuebles desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/api/inmuebles")
      .then((res) => res.json())
      .then((data) => setPropiedades(data))
      .catch((err) => console.error("Error al cargar propiedades:", err));
  }, []);

  return (
    <div className="app-container d-flex">
      <Sidebar usuarioLogueado={usuarioLogueado} setContenido={setContenido} />

      <div className="contenido flex-grow-1 p-4">
        {contenido === "inicio" && (
          <div className="container mt-4">
            <h2 className="text-center mb-4 titulo">Propiedades en venta o renta</h2>
            <div className="row">
              {propiedades.map((prop) => (
                <div
                  className="col-md-3 mb-4"
                  key={prop.InmuebleId}
                  onMouseEnter={() => setHovered(prop.InmuebleId)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ position: "relative" }}
                >
                  <div className="card propiedad-card shadow-lg border-0">
                    <img src={prop.imagen} className="card-img-top propiedad-img" alt={prop.tipo} />
                    <div className="card-body">
                      <h5 className="card-title text-primary">{prop.tipo}</h5>
                      <p><strong>Precio:</strong> ${prop.precio}</p>
                      <p><strong>Ubicación:</strong> {prop.ubicacion}</p>
                      <p><strong>Área construida:</strong> {prop.areaConstruida} m²</p>
                      <p><strong>Área ocupada:</strong> {prop.areaOcupada} m²</p>
                    </div>

                    {hovered === prop.InmuebleId && (
                      <div className="overlay-asesor d-flex flex-column justify-content-center align-items-center text-white">
                        <img src={prop.asesor_foto} alt={prop.asesor_nombre} className="asesor-foto mb-2" />
                        <h6>{prop.asesor_nombre}</h6>
                        <p className="mb-1">Tel: {prop.asesor_telefono}</p>
                        <p className="mb-1">{prop.asesor_correo}</p>
                        <a
                          href={prop.asesor_whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success btn-sm mt-2"
                        >
                          WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {contenido === "login" && <LoginForm onLoginSuccess={() => setUsuarioLogueado(true)} />}
        {contenido === "calculo" && <FormularioCalculo />}
        {contenido === "registro" && <div>Formulario de registro de propiedad (a implementar)</div>}
      </div>
    </div>
  );
}

export default App;

