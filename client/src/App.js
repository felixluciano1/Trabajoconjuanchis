import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import FormularioCalculo from "./components/FormularioCalculo";
import LoginForm from "./components/LoginForm";
import PublicForm from "./components/PublicForm";
import Buscador from "./components/Buscador";
import Oficinas from "./components/Oficinas"; 
import Asesores from "./components/Asesores";
import Contacto from "./components/Contacto";


import "./App.css";

function App() {
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadesOriginales, setPropiedadesOriginales] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [contenido, setContenido] = useState("inicio");

  // 🔹 Cargar propiedades desde backend
  useEffect(() => {
    fetch("http://localhost:5000/api/inmuebles")
      .then((res) => res.json())
      .then((data) => {
        const props = Array.isArray(data) ? data : [];
        setPropiedades(props);
        setPropiedadesOriginales(props);
      })
      .catch((err) => console.error("Error al cargar propiedades:", err));
  }, []);

  const handlePublicar = () => {
    if (usuarioLogueado) {
      setContenido("publicar");
    } else {
      setContenido("login");
    }
  };

  return (
    <div className="app-container d-flex">
      {/* 🧭 MENÚ LATERAL */}
      <Sidebar
        usuarioLogueado={usuarioLogueado}
        usuario={usuario}
        setContenido={setContenido}
        setUsuarioLogueado={setUsuarioLogueado}
      />

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <div className="contenido flex-grow-1 p-4">

        {/* 🏠 INICIO */}
        {contenido === "inicio" && (
          <div className="container mt-4">
            <div className="mb-3 text-center">
              <button className="btn btn-warning px-4" onClick={handlePublicar}>
                Publicar Propiedad
              </button>
            </div>

            <Buscador
              propiedades={propiedadesOriginales}
              setPropiedadesFiltradas={setPropiedades}
            />

            <h2 className="text-center mb-4 titulo">
              Propiedades en venta o renta
            </h2>

            <div className="row">
              {propiedades.length > 0 ? (
                propiedades.map((prop) => (
                  <div
                    className="col-md-3 mb-4"
                    key={prop.InmuebleId}
                    onMouseEnter={() => setHovered(prop.InmuebleId)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ position: "relative" }}
                  >
                    <div className="card propiedad-card shadow-lg border-0">
                      <img
                        src={prop.imagen}
                        className="card-img-top propiedad-img"
                        alt={prop.tipo}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-primary">{prop.tipo}</h5>
                        <p>
                          <strong>Precio:</strong> ${prop.precio}
                        </p>
                        <p>
                          <strong>Ubicación:</strong> {prop.ubicacion}
                        </p>
                        <p>
                          <strong>Área construida:</strong>{" "}
                          {prop.areaConstruida} m²
                        </p>
                      </div>

                      {hovered === prop.InmuebleId && prop.asesor_nombre && (
                        <div className="overlay-asesor d-flex flex-column justify-content-center align-items-center text-white">
                          <img
                            src={prop.asesor_foto}
                            alt={prop.asesor_nombre}
                            className="asesor-foto mb-2"
                          />
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
                ))
              ) : (
                <p className="text-center text-muted">
                  No se encontraron propiedades con los filtros seleccionados.
                </p>
              )}
            </div>
          </div>
        )}

        {/* 🔐 LOGIN */}
        {contenido === "login" && (
          <LoginForm
            onLoginSuccess={(usuarioData) => {
              setUsuario(usuarioData);
              setUsuarioLogueado(true);
              setContenido("inicio");
            }}
          />
        )}

     
        {contenido === "calculo" && <FormularioCalculo />}

        {contenido === "publicar" && usuarioLogueado && <PublicForm />}
      
        {contenido === "oficinas" && <Oficinas />} 

        {contenido === "asesores" && <Asesores />}

        {contenido === "contactanos" && <Contacto />}



      </div>
    </div>
  );
}

export default App;
