import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function Sidebar() {
    return (
        <div className="sidebar bg-dark text-light p-4">
            <h4 className="text-center mb-4 text-warning">INMOBILIARIA</h4>
            <ul className="nav flex-column text-end">
                <li className="nav-item mb-3">
                    <a href="#inicio" className="nav-link text-light">Inicio</a>
                </li>
                <li className="nav-item mb-3">
                    <a href="#buscar" className="nav-link text-light">Buscar Propiedades</a>
                </li>
                <li className="nav-item mb-3">
                    <a href="#oficinas" className="nav-link text-light">Oficinas</a>
                </li>
                <li className="nav-item mb-3">
                    <a href="#asesores" className="nav-link text-light">Asesores</a>
                </li>
                <li className="nav-item mb-3">
                    <a href="#contactanos" className="nav-link text-light">Contáctanos</a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
