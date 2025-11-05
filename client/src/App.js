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

  // 🏠 Estados del buscador
  const [filtro, setFiltro] = useState("ubicacion");
  const [busqueda, setBusqueda] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");

  // 🔄 Cargar propiedades al inicio
  useEffect(() => {
    fetch("http://localhost:5000/api/inmuebles")
      .then((res) => res.json())
      .then((data) => setPropiedades(data))
      .catch((err) => console.error("Error al cargar propiedades:", err));
  }, []);

  // 🔄 Cargar departamentos dinámicamente desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/api/departamentos")
      .then((res) => res.json())
      .then((data) => setDepartamentos(data))
      .catch((err) => console.error("Error al obtener departamentos:", err));
  }, []);

  // 🔍 Manejar búsqueda
  const manejarBusqueda = (e) => {
    e.preventDefault();
    console.log("🔎 Filtro:", filtro);
    console.log("🔎 Búsqueda:", busqueda);
    console.log("🏙️ Departamento:", departamentoSeleccionado);
    // Aquí más adelante puedes filtrar propiedades desde el backend
  };

  return (
    <div className="app-container d-flex">
      <Sidebar
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
        setContenido={setContenido}
      />

      <div className="contenido flex-grow-1 p-4">
        {contenido === "inicio" && (
          <div className="container mt-4">
            {/* 🔍 Sección del buscador */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="text-center text-primary mb-3">
                  🏡 Buscador de Propiedades
                </h4>

                <form
                  onSubmit={manejarBusqueda}
                  className="d-flex align-items-center gap-3 flex-wrap"
                >
                  {/* Select de tipo de búsqueda */}
                  <select
                    className="form-select w-auto"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                  >
                    <option value="ubicacion">Ubicación</option>
                    <option value="propietario">Propietario</option>
                    <option value="asesor">Asesor</option>
                  </select>

                  {/* Campo de texto */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Buscar por ${filtro}...`}
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={{ flex: "1" }}
                  />

                  {/* Select dinámico de departamentos */}
                  <select
                    className="form-select w-auto"
                    value={departamentoSeleccionado}
                    onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
                  >
                    <option value="">Todos los departamentos</option>
                    {departamentos.map((dep, i) => (
                      <option key={i} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>

                  <button type="submit" className="btn btn-primary">
                    Buscar
                  </button>
                </form>
              </div>
            </div>

            {/* 🔽 Título y listado de propiedades */}
            <h2 className="text-center mb-4 titulo">
              Propiedades en venta o renta
            </h2>

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
                      <p>
                        <strong>Área ocupada:</strong> {prop.areaOcupada} m²
                      </p>
                    </div>

                    {hovered === prop.InmuebleId && (
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
              ))}
            </div>
          </div>
        )}

        {contenido === "login" && (
          <LoginForm onLoginSuccess={() => setUsuarioLogueado(true)} />
        )}
        {contenido === "calculo" && <FormularioCalculo />}
        {contenido === "registro" && (
          <div>Formulario de registro de propiedad (a implementar)</div>
        )}
      </div>
    </div>
  );
}

export default App;
