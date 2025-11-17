import React, { useEffect, useState } from "react";
import "./App.css";

export default function DetalleInmueble({ id, volver }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/publicacion/${id}`)
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.error("Error al obtener detalles:", err));
    }, [id]);

    if (!data) return <p>Cargando detalles...</p>;

    return (
        <div className="detalle-container">

            <button className="btn btn-secondary mb-4" onClick={volver}>
                ← Volver
            </button>

            {/* Imagen principal */}
            <div className="detalle-img-container">
                <img
                    src={data.foto}
                    alt="Foto del inmueble"
                    className="detalle-foto"
                />
            </div>

            {/* Título */}
            <h2 className="detalle-titulo mb-3">{data.ubicacion}</h2>

            {/* Grid de datos */}
            <div className="detalle-grid">
                <div><strong>Superficie:</strong> {data.superficie_m2} m²</div>
                <div><strong>Habitaciones:</strong> {data.habitaciones}</div>
                <div><strong>Baños:</strong> {data.banos}</div>
                <div><strong>Año construcción:</strong> {data.anio_construccion}</div>
                <div><strong>Precio de venta:</strong> ${data.precio_venta}</div>
            </div>

            {/* Descripción */}
            <h3 className="mt-4">Descripción</h3>
            <p className="detalle-descripcion">{data.descripcion}</p>

            {/* PROPIETARIO */}
            <h3 className="mt-4">Propietario</h3>

            <div className="propietario-card">

                <img
                    src={data.propietario_foto || "/user-default.png"}
                    alt="Propietario"
                    className="propietario-foto-detalle"
                />

                <div className="propietario-info">
                    <p><strong>Nombre:</strong> {data.propietario_nombre}</p>
                    <p><strong>Teléfono:</strong> {data.propietario_telefono}</p>
                    <p><strong>Correo:</strong> {data.propietario_correo}</p>
                </div>

            </div>
        </div>
    );
}
