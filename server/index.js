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
    database: "base_inmobiliaria"
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err);
    } else {
        console.log("Conexión exitosa a base_inmobiliaria");
    }
});

// 🏡 Endpoint: traer todos los inmuebles con su asesor
app.get("/api/inmuebles", (req, res) => {
    const query = `
        SELECT i.*, 
               a.nombre AS asesor_nombre,
               a.telefono AS asesor_telefono,
               a.correo AS asesor_correo,
               a.whatsapp AS asesor_whatsapp,
               a.foto AS asesor_foto
        FROM inmueble i
        LEFT JOIN asesor a ON i.AsesorId = a.AsesorId
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// 🧩 Endpoint para agregar inmueble (como publicar)
app.post("/api/inmuebles", (req, res) => {
    const { tipo, imagen, precio, ubicacion, areaConstruida, areaOcupada, AsesorId } = req.body;
    const query = `
        INSERT INTO inmueble (tipo, imagen, precio, ubicacion, areaConstruida, areaOcupada, AsesorId)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [tipo, imagen, precio, ubicacion, areaConstruida, areaOcupada, AsesorId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ mensaje: "Inmueble publicado correctamente", id: result.insertId });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
