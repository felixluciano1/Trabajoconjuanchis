import React, { useState } from "react";
import Swal from "sweetalert2";
import "./LoginForm.css";

function LoginForm({ onLoginSuccess }) {
  const [modoRegistro, setModoRegistro] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modoRegistro) {
      // --- Registro ---
      try {
        const res = await fetch("http://localhost:5000/api/registrar", {

          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, telefono, correo, contra }),
        });

        const data = await res.json();

        if (data.success) {
          Swal.fire({
            title: "¡Registro exitoso!",
            text: "Tu cuenta fue creada correctamente. Ahora puedes iniciar sesión.",
            icon: "success",
            confirmButtonColor: "#2575fc",
          });

          setModoRegistro(false);
          setNombre("");
          setTelefono("");
          setCorreo("");
          setContra("");
        } else {
          Swal.fire({
            title: "Error",
            text: data.message || "Error al registrar usuario.",
            icon: "error",
            confirmButtonColor: "#dc3545",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor.",
          icon: "error",
          confirmButtonColor: "#dc3545",
        });
      }
    } else {
      // --- Login ---
      try {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, contra }),
        });

        const data = await res.json();

        if (data.success) {
          Swal.fire({
            title: "¡Bienvenido!",
            text: `Hola ${data.usuario.nombre}, has iniciado sesión correctamente.`,
            icon: "success",
            confirmButtonColor: "#2575fc",
          });

          onLoginSuccess({
            nombre: data.usuario.nombre,
            correo: data.usuario.correo,
            foto: data.usuario.foto || "",
          });
        } else {
          Swal.fire({
            title: "Credenciales incorrectas",
            text: data.message || "Correo o contraseña incorrectos.",
            icon: "warning",
            confirmButtonColor: "#f39c12",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor.",
          icon: "error",
          confirmButtonColor: "#dc3545",
        });
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3>{modoRegistro ? "Registrarse" : "Iniciar Sesión"}</h3>

        <form onSubmit={handleSubmit}>
          {modoRegistro && (
            <>
              <div className="mb-3">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
            </>
          )}

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
            {modoRegistro ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>

        <div className="text-center mt-3">
          {modoRegistro ? (
            <p>
              ¿Ya tienes una cuenta?{" "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setModoRegistro(false)}
              >
                Inicia sesión aquí
              </button>
            </p>
          ) : (
            <p>
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setModoRegistro(true)}
              >
                Regístrate
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
