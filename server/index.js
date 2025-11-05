const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "base_inmobiliaria",
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err);
    } else {
        console.log("✅ Conectado correctamente a base_inmobiliaria");
    }
});

app.get("/", (req, res) => {
    res.send("Servidor backend de inmobiliaria funcionando correctamente");
});

app.get("/api/departamentos", (req, res) => {
    const query = `
      SELECT DISTINCT departamento 
      FROM inmueble 
      WHERE departamento IS NOT NULL AND departamento <> ''
      ORDER BY departamento ASC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener departamentos:", err);
            return res.status(500).json({ error: "Error al obtener departamentos" });
        }
        const departamentos = results.map((row) => row.departamento);
        res.json(departamentos);
    });
});

app.get("/api/publicaciones", (req, res) => {
    const query = `
    SELECT 
      p.PublicacionId,
      p.foto,
      p.ubicacion,
      p.superficie_m2,
      p.habitaciones,
      p.banos,
      p.anio_construccion,
      p.precio_venta,
      p.nombre_propietario,
      p.telefono_propietario,
      p.correo_propietario,
      a.nombre AS asesor
    FROM publicacion p
    LEFT JOIN asesor a ON p.AsesorId = a.AsesorId
  `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener publicaciones:", err);
            return res.status(500).json({ error: "Error al obtener publicaciones" });
        }
        res.json(results);
    });
});

// ✅ Ruta para insertar publicaciones
app.post("/api/publicaciones", (req, res) => {
    const {
        foto,
        ubicacion,
        superficie_m2,
        habitaciones,
        banos,
        anio_construccion,
        precio_venta,
        nombre_propietario,
        telefono_propietario,
        correo_propietario,
        AsesorId,
    } = req.body;

    const query = `
    INSERT INTO publicacion 
    (foto, ubicacion, superficie_m2, habitaciones, banos, anio_construccion, precio_venta, nombre_propietario, telefono_propietario, correo_propietario, AsesorId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(
        query,
        [
            foto,
            ubicacion,
            superficie_m2,
            habitaciones,
            banos,
            anio_construccion,
            precio_venta,
            nombre_propietario,
            telefono_propietario,
            correo_propietario,
            AsesorId,
        ],
        (err, result) => {
            if (err) {
                console.error("Error al insertar publicación:", err);
                return res.status(500).json({ error: "Error al insertar publicación" });
            }
            res.json({
                mensaje: "✅ Publicación agregada correctamente",
                id: result.insertId,
            });
        }
    );
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
