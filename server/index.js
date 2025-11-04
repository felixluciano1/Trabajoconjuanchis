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
    database: "base_imn"
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos base_imn");
    }
});

app.get("/", (req, res) => {
    res.send("Servidor backend de inmobiliaria funcionando correctamente");
});

app.get("/api/inmuebles", (req, res) => {
    const query = "SELECT * FROM inmueble";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.get("/api/inmuebles/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM inmueble WHERE InmuebleId = ?";
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0)
            return res.status(404).json({ mensaje: "Inmueble no encontrado" });
        res.json(results[0]);
    });
});

app.post("/api/inmuebles", (req, res) => {
    const { PersonaId, Distrito, Superficie, Numero_habitaciones, Numero_banos, Numero_garajes, Antiguedad, Precio_soles } = req.body;
    const query = `INSERT INTO inmueble (PersonaId, Distrito, Superficie, Numero_habitaciones, Numero_banos, Numero_garajes, Antiguedad, Precio_soles)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
        query,
        [PersonaId, Distrito, Superficie, Numero_habitaciones, Numero_banos, Numero_garajes, Antiguedad, Precio_soles],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ mensaje: "Inmueble agregado correctamente", id: result.insertId });
        }
    );
});

app.get("/api/asesores", (req, res) => {
    db.query("SELECT * FROM asesor", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.get("/api/publicaciones", (req, res) => {
    const query = `
    SELECT p.PublicacionId, i.Distrito, a.Nombre AS Asesor, p.Descripcion, p.Fecha, p.Hora
    FROM publicacion p
    INNER JOIN inmueble i ON p.InmuebleId = i.InmuebleId
    INNER JOIN asesor a ON p.AsesorId = a.AsesorId
  `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.get("/api/reservas", (req, res) => {
    const query = `
    SELECT r.ReservaId, r.Fecha, i.Distrito, a.Nombre AS Asesor
    FROM reservas r
    LEFT JOIN inmueble i ON r.InmuebleId = i.InmuebleId
    LEFT JOIN asesor a ON r.AsesorId = a.AsesorId
  `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
