import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm({ onLoginSuccess }) {
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contra }),
      });

      const data = await res.json();

      if (data.success) {
        onLoginSuccess({
          nombre: data.usuario.nombre,
          correo: data.usuario.correo,
          foto: data.usuario.foto || "",
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3>Iniciar Sesión</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={contra}
              onChange={(e) => setContra(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
