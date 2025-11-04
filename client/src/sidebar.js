import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

<<<<<<< Updated upstream
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
=======
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="btn btn-primary position-fixed top-0 end-0 m-3"
        onClick={toggleSidebar}
        style={{ zIndex: 1050 }}
      >
        ☰
      </button>

      {/* Sidebar deslizable */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <h4 className="text-center mb-4 text-light">Menú</h4>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a href="#" className="text-light nav-link">Inicio</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-light nav-link">Buscar Propiedades</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-light nav-link">Oficinas</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-light nav-link">Asesores</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-light nav-link">Contáctanos</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Fondo oscuro cuando el sidebar está abierto */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
>>>>>>> Stashed changes
  );
}

export default Sidebar;
