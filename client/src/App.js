import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import FormularioCalculo from "./components/FormularioCalculo";
import LoginForm from "./components/LoginForm";
import PublicForm from "./components/PublicForm";
import Buscador from "./components/Buscador";
import Oficinas from "./components/Oficinas";
import Asesores from "./components/Asesores";
import Contacto from "./components/Contacto";
import DetalleInmueble from "./DetalleInmueble";

import "./App.css";

function App() {
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadesOriginales, setPropiedadesOriginales] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [contenido, setContenido] = useState("inicio");

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

      {/* Sidebar */}
      <Sidebar
        usuarioLogueado={usuarioLogueado}
        usuario={usuario}
        setContenido={setContenido}
        setUsuarioLogueado={setUsuarioLogueado}
      />

      {/* CONTENIDO PRINCIPAL */}
      <div className="contenido flex-grow-1 p-4">

        {/* INICIO */}
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
                        <p><strong>Precio:</strong> ${prop.precio}</p>
                        <p><strong>Ubicación:</strong> {prop.ubicacion}</p>
                        <p><strong>Área construida:</strong> {prop.areaConstruida} m²</p>
                      </div>

                      {/* overlay completo */}
                      {hovered === prop.InmuebleId && prop.propietario_nombre && (
                        <div className="overlay-propietario">

                          <div className="overlay-content text-center">
                            <img
                              src={prop.propietario_foto}
                              alt={prop.propietario_nombre}
                              className="propietario-foto mb-2"
                            />
                            <h6 className="mb-1">{prop.propietario_nombre}</h6>

                            <p className="mb-1">Tel: {prop.propietario_telefono}</p>
                            <p className="mb-2">{prop.propietario_correo}</p>

                            {/* BOTÓN MOSTRAR DETALLE → setContenido */}
                            <button
                              className="btn btn-light btn-sm"
                              onClick={() =>
                                setContenido({
                                  tipo: "detalle",
                                  id: prop.InmuebleId,
                                })
                              }
                            >
                              Más información
                            </button>
                          </div>

                        </div>
                      )}

                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">
                  No se encontraron propiedades.
                </p>
              )}
            </div>
          </div>
        )}

        {/* LOGIN */}
        {contenido === "login" && (
          <LoginForm
            onLoginSuccess={(usuarioData) => {
              setUsuario(usuarioData);
              setUsuarioLogueado(true);
              setContenido("inicio");
            }}
          />
        )}

        {/* DETALLE */}
        {contenido.tipo === "detalle" && (
          <DetalleInmueble
            id={contenido.id}
            volver={() => setContenido("inicio")}
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
