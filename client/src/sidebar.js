import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome, FaUser, FaBuilding, FaPhone, FaCalculator, FaPlus, FaUsers } from "react-icons/fa";
import "./App.css";
import "./Sidebar.css"; // 👈 Nuevo archivo para estilos mejorados

function Sidebar({ usuarioLogueado, setContenido }) {
  return (
    <div className="sidebar-custom">
      {/* LOGO */}
      <div className="sidebar-header text-center mb-4">
        <img
          src="/Logo.png" // coloca tu logo dentro de public/logo.png
          alt="Inmobiliaria Logo"
          className="sidebar-logo mb-2"
        />
        <h4 className="sidebar-title text-warning">INMOBILIARIA</h4>
      </div>

      {/* MENÚ */}
      <ul className="nav flex-column mt-3">
        <li className="nav-item mb-2">
          <a
            href="#inicio"
            className="nav-link text-light d-flex align-items-center"
            onClick={() => setContenido("inicio")}
          >
            <FaHome className="me-2 icon" /> Inicio
          </a>
        </li>

        {!usuarioLogueado && (
          <li className="nav-item mb-2">
            <a
              href="#login"
              className="nav-link text-light d-flex align-items-center"
              onClick={() => setContenido("login")}
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
                className="nav-link text-light d-flex align-items-center"
                onClick={() => setContenido("calculo")}
              >
                <FaCalculator className="me-2 icon" /> Calcular Propiedad
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="#registro"
                className="nav-link text-light d-flex align-items-center"
                onClick={() => setContenido("registro")}
              >
                <FaPlus className="me-2 icon" /> Registrar Propiedad
              </a>
            </li>
          </>
        )}

        <li className="nav-item mb-2">
          <a
            href="#oficinas"
            className="nav-link text-light d-flex align-items-center"
            onClick={() => setContenido("oficinas")}
          >
            <FaBuilding className="me-2 icon" /> Oficinas
          </a>
        </li>

        <li className="nav-item mb-2">
          <a
            href="#asesores"
            className="nav-link text-light d-flex align-items-center"
            onClick={() => setContenido("asesores")}
          >
            <FaUsers className="me-2 icon" /> Asesores
          </a>
        </li>

        <li className="nav-item mb-2">
          <a
            href="#contactanos"
            className="nav-link text-light d-flex align-items-center"
            onClick={() => setContenido("contactanos")}
          >
            <FaPhone className="me-2 icon" /> Contáctanos
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
