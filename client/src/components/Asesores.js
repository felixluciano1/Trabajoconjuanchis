import React from "react";
import "./Asesores.css";

function Asesores() {
  const asesores = [
    {
      id: 1,
      nombre: "María Fernanda Torres",
      telefono: "+51 987 654 321",
      correo: "maria.torres@inmobiliariaperu.com",
      whatsapp: "https://wa.me/51987654321",
      foto: "https://randomuser.me/api/portraits/women/65.jpg",
      especialidad: "Venta de departamentos y casas urbanas",
      experiencia: "7 años de experiencia en gestión de inmuebles residenciales en Trujillo y Lima.",
    },
    {
      id: 2,
      nombre: "Carlos Ramírez Vega",
      telefono: "+51 912 334 556",
      correo: "carlos.ramirez@inmobiliariaperu.com",
      whatsapp: "https://wa.me/51912334556",
      foto: "https://randomuser.me/api/portraits/men/44.jpg",
      especialidad: "Propiedades comerciales y oficinas corporativas",
      experiencia: "Más de 10 años asesorando empresas en la compra y alquiler de locales estratégicos.",
    },
    {
      id: 3,
      nombre: "Lucía Campos Rojas",
      telefono: "+51 944 556 778",
      correo: "lucia.campos@inmobiliariaperu.com",
      whatsapp: "https://wa.me/51944556778",
      foto: "https://randomuser.me/api/portraits/women/72.jpg",
      especialidad: "Inversiones inmobiliarias y terrenos",
      experiencia: "Especialista en proyectos de inversión y evaluación de terrenos urbanizables.",
    },
  ];

  return (
    <div className="asesores-container">
      <h2>Nuestro Equipo de Asesores Inmobiliarios</h2>
      <p className="intro">
        En <strong>Inmobiliaria Perú</strong> contamos con un equipo de profesionales altamente
        capacitados que te acompañan durante todo el proceso de compra, venta o alquiler.
        Nos enfocamos en ofrecer un servicio transparente, eficiente y adaptado a tus necesidades.
      </p>

      <div className="asesores-grid">
        {asesores.map((asesor) => (
          <div key={asesor.id} className="asesor-card">
            <img src={asesor.foto} alt={asesor.nombre} className="asesor-foto" />
            <h3>{asesor.nombre}</h3>
            <p className="especialidad">{asesor.especialidad}</p>
            <p className="experiencia">{asesor.experiencia}</p>
            <p><strong>Teléfono:</strong> {asesor.telefono}</p>
            <p><strong>Correo:</strong> {asesor.correo}</p>
            <div className="btns-contacto">
              <a href={asesor.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                WhatsApp
              </a>
              <a href={`mailto:${asesor.correo}`} className="btn-correo">
                Enviar Correo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Asesores;
