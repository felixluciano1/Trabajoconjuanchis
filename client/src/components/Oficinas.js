import React from "react";
import "./Oficinas.css";

const Oficinas = () => {
  return (
    <div className="oficinas-container">
      <h1 className="titulo-principal">Nuestras Oficinas</h1>
      <p className="descripcion">
        En <strong>Inmobiliaria Yau</strong> contamos con oficinas modernas y
        estratégicamente ubicadas para brindarte una atención personalizada,
        eficiente y profesional. Nuestro equipo está preparado para ayudarte en
        cada paso del proceso de compra, venta o alquiler de tu propiedad.
      </p>

      <div className="oficinas-grid">
        {/* Oficina 1 */}
        <div className="oficina-card">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
            alt="Oficina Central"
            className="oficina-img"
          />
          <div className="oficina-info">
            <h3>Oficina Central – Trujillo</h3>
            <p>
              Nuestra sede principal se encuentra en el corazón de Trujillo.
              Aquí gestionamos operaciones de compra, alquiler y administración
              de propiedades residenciales y comerciales.
            </p>
            <p className="detalle">
              <strong>Dirección:</strong> Av. España 456 – Trujillo, Perú
              <br />
              <strong>Teléfono:</strong> (044) 234-567
              <br />
              <strong>Horario:</strong> Lunes a Viernes de 9:00 a 18:00
            </p>
            <button className="btn-oficina">Ver ubicación</button>
          </div>
        </div>

        {/* Oficina 2 */}
        <div className="oficina-card">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="Oficina Surco"
            className="oficina-img"
          />
          <div className="oficina-info">
            <h3>Oficina Lima – Surco</h3>
            <p>
              Nuestra oficina en Lima ofrece asesoría especializada para
              inversionistas y clientes que buscan proyectos inmobiliarios de
              alto valor. Atendemos tanto al público local como extranjero.
            </p>
            <p className="detalle">
              <strong>Dirección:</strong> Calle Los Álamos 789 – Surco, Lima
              <br />
              <strong>Teléfono:</strong> (01) 765-4321
              <br />
              <strong>Horario:</strong> Lunes a Sábado de 9:00 a 19:00
            </p>
            <button className="btn-oficina">Ver ubicación</button>
          </div>
        </div>

        {/* Oficina 3 */}
        <div className="oficina-card">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Oficina Piura"
            className="oficina-img"
          />
          <div className="oficina-info">
            <h3>Oficina Norte – Piura</h3>
            <p>
              Nuestra nueva sede en Piura impulsa el crecimiento inmobiliario en
              la región norte del país. Contamos con asesores locales expertos
              en proyectos residenciales y comerciales.
            </p>
            <p className="detalle">
              <strong>Dirección:</strong> Av. Grau 1025 – Piura, Perú
              <br />
              <strong>Teléfono:</strong> (073) 654-321
              <br />
              <strong>Horario:</strong> Lunes a Viernes de 9:00 a 17:00
            </p>
            <button className="btn-oficina">Ver ubicación</button>
          </div>
        </div>
      </div>

      <div className="mensaje-final">
        <p>
          En cualquiera de nuestras oficinas recibirás un servicio profesional,
          transparente y orientado a tus objetivos.  
          <strong> ¡Tu inversión inmobiliaria está en buenas manos!</strong>
        </p>
      </div>
    </div>
  );
};

export default Oficinas;
