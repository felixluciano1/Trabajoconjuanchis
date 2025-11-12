// 📁 client/src/components/Buscador.js
import React, { useState, useEffect } from "react";
import "./Buscador.css";

function Buscador({ propiedades, setPropiedadesFiltradas }) {
  const [busqueda, setBusqueda] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [sugerencias, setSugerencias] = useState([]);

  const aplicarFiltro = () => {
    const filtradas = propiedades.filter((prop) => {
      const ubicacion = prop.ubicacion?.toLowerCase() || "";
      const tipo = prop.tipo?.toLowerCase() || "";
      const coincideBusqueda = ubicacion.includes(busqueda.toLowerCase());
      const coincideTipo = tipoSeleccionado
        ? tipo === tipoSeleccionado.toLowerCase()
        : true;

      return coincideBusqueda && coincideTipo;
    });
    setPropiedadesFiltradas(filtradas);
  };

  useEffect(() => {
    aplicarFiltro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda, tipoSeleccionado]);

  const manejarBusqueda = (e) => {
    e.preventDefault();
    aplicarFiltro();
  };

  return (
    <div className="card shadow-sm mb-4 buscador-card">
      <div className="card-body">
        <h4 className="text-center text-primary mb-3">Encuentra tu Hogar</h4>

        <form
          onSubmit={manejarBusqueda}
          className="d-flex align-items-center gap-3 flex-wrap justify-content-center"
        >
          <div style={{ position: "relative", flex: 1, maxWidth: "320px" }}>
            <input
              type="text"
              className="form-control buscador-input"
              placeholder="Buscar ubicación..."
              value={busqueda}
              onChange={(e) => {
                const valor = e.target.value;
                setBusqueda(valor);

                if (valor.trim().length > 0) {
                  const filtradas = propiedades
                    .map((p) => p.ubicacion)
                    .filter(
                      (u) =>
                        u && u.toLowerCase().includes(valor.toLowerCase())
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
                style={{
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
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

          {/* Selector de tipo */}
          <select
            className="form-select w-auto"
            value={tipoSeleccionado}
            onChange={(e) => setTipoSeleccionado(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            <option value="Departamento">Departamento</option>
            <option value="Casa">Casa</option>
          </select>

          {/* Botón buscar */}
          <button type="submit" className="btn btn-success px-4">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Buscador;

