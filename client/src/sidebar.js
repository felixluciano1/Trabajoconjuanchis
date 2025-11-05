import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaBuilding,
  FaPhone,
  FaCalculator,
  FaPlus,
  FaUsers,
  FaBars,
  FaTimes,
  FaSignOutAlt
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

function Sidebar({ usuarioLogueado, setContenido, setUsuarioLogueado }) {
  const [abierto, setAbierto] = useState(false);

  const toggleSidebar = () => setAbierto(!abierto);

  const handleClick = (seccion) => {
    setContenido(seccion);
    setAbierto(false);
  };

  const handleLogout = () => {
    setUsuarioLogueado(false);
    setAbierto(false);
    setContenido("inicio");
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button className="btn-toggle" onClick={toggleSidebar}>
        {abierto ? <FaTimes /> : <FaBars />}
      </button>

      {/* Fondo oscuro */}
      {abierto && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div
        className={`sidebar-custom ${abierto ? "open" : ""} ${
          usuarioLogueado ? "propietario" : "visitante"
        }`}
      >
        {/* Header con logo */}
        <div className="sidebar-header text-center mb-4">
          <img
            src="/Logo.png"
            alt="Inmobiliaria Logo"
            className={`sidebar-logo mb-2 ${
              usuarioLogueado ? "logo-propietario" : "logo-visitante"
            }`}
          />
          <h4
            className={`sidebar-title ${
              usuarioLogueado ? "titulo-propietario" : "titulo-visitante"
            }`}
          >
            INMOBILIARIA
          </h4>
        </div>

        {/* Menú principal */}
        <ul className="nav flex-column mt-3 flex-grow-1">
          <li className="nav-item mb-2">
            <a
              href="#inicio"
              className="nav-link"
              onClick={() => handleClick("inicio")}
            >
              <FaHome className="me-2 icon" /> Inicio
            </a>
          </li>

          {!usuarioLogueado && (
            <li className="nav-item mb-2">
              <a
                href="#login"
                className="nav-link"
                onClick={() => handleClick("login")}
              >
                <FaUser className="me-2 icon" /> Iniciar Sesión
              </a>
            </li>
          )}

          {usuarioLogueado && (
            <>
              <li className="nav-item mb-2">
                <a
                  href="#calculo"
                  className="nav-link"
                  onClick={() => handleClick("calculo")}
                >
                  <FaCalculator className="me-2 icon" /> Calcular Propiedad
                </a>
              </li>
              <li className="nav-item mb-2">
                <a
                  href="#registro"
                  className="nav-link"
                  onClick={() => handleClick("registro")}
                >
                  <FaPlus className="me-2 icon" /> Registrar Propiedad
                </a>
              </li>
            </>
          )}

          <li className="nav-item mb-2">
            <a
              href="#oficinas"
              className="nav-link"
              onClick={() => handleClick("oficinas")}
            >
              <FaBuilding className="me-2 icon" /> Oficinas
            </a>
          </li>

          <li className="nav-item mb-2">
            <a
              href="#asesores"
              className="nav-link"
              onClick={() => handleClick("asesores")}
            >
              <FaUsers className="me-2 icon" /> Asesores
            </a>
          </li>

          <li className="nav-item mb-2">
            <a
              href="#contactanos"
              className="nav-link"
              onClick={() => handleClick("contactanos")}
            >
              <FaPhone className="me-2 icon" /> Contáctanos
            </a>
          </li>
        </ul>

        {/* Footer del sidebar */}
        <div className="sidebar-footer">
          {usuarioLogueado ? (
            <>
              <p className="mb-1">👤 Propietario</p>
              <button className="btn-logout" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" /> Cerrar sesión
              </button>
            </>
          ) : (
            <p>👋 Bienvenido, visitante</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
