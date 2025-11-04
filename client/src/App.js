import './App.css';
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const propiedades = [
    {
      id: 1,
      tipo: "Departamento",
      imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      precio: 95000,
      ubicacion: "Miraflores, Lima",
      areaConstruida: 85,
      areaOcupada: 100,
      asesor: {
        nombre: "Carlos López",
        telefono: "987654321",
        correo: "carlos@inmobiliaria.com",
        whatsapp: "https://wa.me/51987654321",
        foto: "https://randomuser.me/api/portraits/men/32.jpg"
      }
    },
    {
      id: 2,
      tipo: "Casa",
      imagen: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800",
      precio: 175000,
      ubicacion: "La Molina, Lima",
      areaConstruida: 160,
      areaOcupada: 180,
      asesor: {
        nombre: "María Pérez",
        telefono: "912345678",
        correo: "maria@inmobiliaria.com",
        whatsapp: "https://wa.me/51912345678",
        foto: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    },
    {
      id: 3,
      tipo: "Departamento",
      imagen: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800",
      precio: 110000,
      ubicacion: "San Isidro, Lima",
      areaConstruida: 95,
      areaOcupada: 110,
      asesor: {
        nombre: "José Ramírez",
        telefono: "956789432",
        correo: "jose@inmobiliaria.com",
        whatsapp: "https://wa.me/51956789432",
        foto: "https://randomuser.me/api/portraits/men/76.jpg"
      }
    },
    {
      id: 4,
      tipo: "Casa",
      imagen: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fes%2Ffotos%2Fdepartamento&psig=AOvVaw0fjS72gWWAO1bWC0liONWn&ust=1762373812746000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIDHmJuo2ZADFQAAAAAdAAAAABAE",
      precio: 230000,
      ubicacion: "Surco, Lima",
      areaConstruida: 190,
      areaOcupada: 200,
      asesor: {
        nombre: "Lucía Torres",
        telefono: "934567890",
        correo: "lucia@inmobiliaria.com",
        whatsapp: "https://wa.me/51934567890",
        foto: "https://randomuser.me/api/portraits/women/50.jpg"
      }
    }
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 titulo">Propiedades en venta o renta</h2>
      <div className="row">
        {propiedades.map((prop) => (
          <div
            className="col-md-3 mb-4"
            key={prop.id}
            onMouseEnter={() => setHovered(prop.id)}
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
                <p className="card-text mb-1">
                  <strong>Precio:</strong> ${prop.precio.toLocaleString()}
                </p>
                <p className="card-text mb-1">
                  <strong>Ubicación:</strong> {prop.ubicacion}
                </p>
                <p className="card-text mb-1">
                  <strong>Área construida:</strong> {prop.areaConstruida} m²
                </p>
                <p className="card-text">
                  <strong>Área ocupada:</strong> {prop.areaOcupada} m²
                </p>
              </div>
            </div>

            {hovered === prop.id && (
              <div className="overlay-asesor d-flex flex-column justify-content-center align-items-center text-white">
                <img
                  src={prop.asesor.foto}
                  alt={prop.asesor.nombre}
                  className="asesor-foto mb-2"
                />
                <h6>{prop.asesor.nombre}</h6>
                <p className="mb-1">Tel: {prop.asesor.telefono}</p>
                <p className="mb-1">{prop.asesor.correo}</p>
                <a
                  href={prop.asesor.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-sm mt-2"
                >
                  WhatsApp
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
