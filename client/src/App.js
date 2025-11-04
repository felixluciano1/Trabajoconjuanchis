import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const propiedades = [
    {
      id: 1,
      tipo: "Departamento",
      imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      precio: 95000,
      ubicacion: "Miraflores, Lima",
      areaConstruida: 85,
      areaOcupada: 100
    },
    {
      id: 2,
      tipo: "Casa",
      imagen: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800",
      precio: 175000,
      ubicacion: "La Molina, Lima",
      areaConstruida: 160,
      areaOcupada: 180
    },
    {
      id: 3,
      tipo: "Departamento",
      imagen: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800",
      precio: 110000,
      ubicacion: "San Isidro, Lima",
      areaConstruida: 95,
      areaOcupada: 110
    },
    {
      id: 4,
      tipo: "Casa",
      imagen: "https://images.unsplash.com/photo-1560184897-67f4a4b3e7b4?w=800",
      precio: 230000,
      ubicacion: "Surco, Lima",
      areaConstruida: 190,
      areaOcupada: 200
    }
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Propiedades en venta o renta</h2>
      <div className="row">
        {propiedades.map((prop) => (
          <div className="col-md-3 mb-4" key={prop.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={prop.imagen}
                className="card-img-top"
                alt={prop.tipo}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{prop.tipo}</h5>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
