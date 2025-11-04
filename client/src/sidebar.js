import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function Sidebar({ usuarioLogueado, setContenido }) {
  
  const manejarClickCalculo = () => {
    setContenido("calculo");
  };

  const manejarClickRegistro = () => {
    setContenido("registro");
  };

  const manejarLogin = () => {
    setContenido("login");
  };

  return (
    <div className="sidebar bg-dark text-light p-4">
      <h4 className="text-center mb-4 text-warning">INMOBILIARIA</h4>
      <ul className="nav flex-column text-end">
        <li className="nav-item mb-3">
          <a href="#inicio" className="nav-link text-light" onClick={() => setContenido("inicio")}>Inicio</a>
        </li>

        {/* Mostrar login si NO está logueado */}
        {!usuarioLogueado && (
          <li className="nav-item mb-3">
            <a href="#login" className="nav-link text-light" onClick={manejarLogin}>Iniciar Sesión</a>
          </li>
        )}

        {/* Mostrar opciones solo si está logueado */}
        {usuarioLogueado && (
          <>
            <li className="nav-item mb-3">
              <a href="#calculo" className="nav-link text-light" onClick={manejarClickCalculo}>Calcular propiedad</a>
            </li>
            <li className="nav-item mb-3">
              <a href="#registro" className="nav-link text-light" onClick={manejarClickRegistro}>Registrar propiedad</a>
            </li>
          </>
        )}

        <li className="nav-item mb-3">
          <a href="#oficinas" className="nav-link text-light" onClick={() => setContenido("oficinas")}>Oficinas</a>
        </li>
        <li className="nav-item mb-3">
          <a href="#asesores" className="nav-link text-light" onClick={() => setContenido("asesores")}>Asesores</a>
        </li>
        <li className="nav-item mb-3">
          <a href="#contactanos" className="nav-link text-light" onClick={() => setContenido("contactanos")}>Contáctanos</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

