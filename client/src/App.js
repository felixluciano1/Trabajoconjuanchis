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

  // Estados del buscador
  const [filtro, setFiltro] = useState("Comprar");
  const [busqueda, setBusqueda] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [sugerencias, setSugerencias] = useState([]);

  // Cargar propiedades
  useEffect(() => {
    fetch("http://localhost:5000/api/inmuebles")
      .then((res) => res.json())
      .then((data) => setPropiedades(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error al cargar propiedades:", err));
  }, []);

  // Cargar departamentos
  useEffect(() => {
    fetch("http://localhost:5000/api/departamentos")
      .then((res) => res.json())
      .then((data) => setDepartamentos(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error al obtener departamentos:", err));
  }, []);

  const manejarBusqueda = (e) => {
    e.preventDefault();
    console.log("🔎 Acción:", filtro);
    console.log("🔎 Ubicación:", busqueda);
    console.log("🏙️ Departamento:", departamentoSeleccionado);
    setContenido("calculo");
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
            {/* Buscador */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="text-center text-primary mb-3">
                  Encuentra tu Hogar
                </h4>

                {/* Botones Comprar / Alquilar */}
                <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap">
                  {["Comprar", "Alquilar"].map((tipo) => (
                    <button
                      key={tipo}
                      type="button"
                      className={`btn ${filtro === tipo ? "btn-primary" : "btn-outline-primary"
                        } px-4`}
                      onClick={() => setFiltro(tipo)}
                    >
                      {tipo}
                    </button>
                  ))}
                </div>

                {/* Formulario de búsqueda */}
                <form
                  onSubmit={manejarBusqueda}
                  className="d-flex align-items-center gap-3 flex-wrap"
                >
                  <div
                    style={{ position: "relative", flex: 1, maxWidth: "320px" }}
                  >
                    <input
                      type="text"
                      className="form-control buscador-input"
                      placeholder="Buscar ubicación..."
                      value={busqueda}
                      onChange={(e) => {
                        setBusqueda(e.target.value);
                        if (e.target.value.length > 0) {
                          const filtradas = (propiedades || [])
                            .map((p) => p.ubicacion)
                            .filter((u) =>
                              u.toLowerCase().includes(e.target.value.toLowerCase())
                            );
                          setSugerencias([...new Set(filtradas)]);
                        } else {
                          setSugerencias([]);
                        }
                      }}
                    />
                    {sugerencias.length > 0 && (
                      <ul
                        className="list-group position-absolute w-100"
                        style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
                      >
                        {sugerencias.map((sug, i) => (
                          <li
                            key={i}
                            className="list-group-item list-group-item-action"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setBusqueda(sug);
                              setSugerencias([]);
                            }}
                          >
                            {sug}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <select
                    className="form-select w-auto"
                    value={departamentoSeleccionado}
                    onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
                  >
                    <option value="">Departamentos</option>
                    {(departamentos || []).map((dep, i) => (
                      <option key={i} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>

                  <button type="submit" className="btn btn-success px-4">
                    Buscar
                  </button>
                </form>
              </div>
            </div>

            {/* Listado de propiedades */}
            <h2 className="text-center mb-4 titulo">
              Propiedades en venta o renta
            </h2>

            <div className="row">
              {Array.isArray(propiedades) &&
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
                          <strong>Área construida:</strong> {prop.areaConstruida} m²
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

