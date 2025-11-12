import React from "react";
import "./Contacto.css";

function Contacto() {
  return (
    <div className="contacto-container">
      <div className="contacto-header">
        <h2>Contáctanos</h2>
        <p>
          Estamos aquí para ayudarte a encontrar tu próximo hogar o inversión.
          Nuestro equipo de asesores inmobiliarios está disponible para resolver
          todas tus dudas y brindarte la mejor atención personalizada.
        </p>
      </div>

      <div className="contacto-info">
        <div className="info-card">
          <h4>📍 Oficina Principal</h4>
          <p>Avenida Los Próceres 1540, Trujillo, Perú</p>
          <p>
            <strong>Teléfono:</strong> +51 944 321 876
          </p>
          <p>
            <strong>Correo:</strong> contacto@inmoperu.com
          </p>
          <p>
            <strong>Horario:</strong> Lunes a Viernes de 9:00 a.m. a 6:00 p.m.
          </p>
        </div>

        <div className="info-card">
          <h4>🏢 Oficina Lima</h4>
          <p>Av. Javier Prado Este 2360, San Borja, Lima</p>
          <p>
            <strong>Teléfono:</strong> +51 987 567 234
          </p>
          <p>
            <strong>Correo:</strong> lima@inmoperu.com
          </p>
          <p>
            <strong>Horario:</strong> Lunes a Sábado de 8:30 a.m. a 7:00 p.m.
          </p>
        </div>

        <div className="info-card">
          <h4>🌎 Asistencia Internacional</h4>
          <p>
            Brindamos soporte a clientes en Chile, Colombia y Estados Unidos.
            Nuestro equipo multilingüe te ayudará en todas las etapas del
            proceso de compra o inversión.
          </p>
          <p>
            <strong>Correo:</strong> global@inmoperu.com
          </p>
          <p>
            <strong>Teléfono:</strong> +51 901 234 567
          </p>
        </div>
      </div>

      <div className="contacto-footer">
        <p>
          También puedes visitarnos en nuestras redes sociales para conocer las
          últimas propiedades, noticias del mercado inmobiliario y consejos de
          inversión.
        </p>
        <p>
          <em>InmoPerú – Tu hogar, nuestra prioridad.</em>
        </p>
      </div>
    </div>
  );
}

export default Contacto;
