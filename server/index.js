const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");

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
        console.log("Conectado correctamente a base_inmobiliaria");
    }
});

app.get("/", (req, res) => {
    res.send("Servidor backend de inmobiliaria funcionando correctamente");
});

/* ============================================================
   📌 1. OBTENER DEPARTAMENTOS
============================================================ */
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

/* ============================================================
   📌 2. OBTENER INMUEBLES + PROPIETARIOS
============================================================ */
app.get("/api/inmuebles", (req, res) => {
    const { ubicacion } = req.query;
    let sql = `
      SELECT i.*, 
          p.nombre AS propietario_nombre,
          p.telefono AS propietario_telefono,
          p.correo AS propietario_correo,
          p.foto AS propietario_foto
      FROM inmueble i
      LEFT JOIN propietario p ON i.PropietarioId = p.PropietarioId
    `;

    const params = [];

    if (ubicacion) {
        sql += " WHERE i.ubicacion LIKE ?";
        params.push(`%${ubicacion}%`);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("Error al obtener inmuebles:", err);
            return res.status(500).json({ error: "Error al obtener inmuebles" });
        }
        res.json(results);
    });
});

/* ============================================================
   📌 3. REGISTRAR PROPIETARIO
============================================================ */
app.post("/api/propietarios", (req, res) => {
    const { nombre, telefono, correo, foto } = req.body;

    if (!nombre || !telefono || !correo) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const query = `
      INSERT INTO propietario (nombre, telefono, correo, foto)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [nombre, telefono, correo, foto], (err, result) => {
        if (err) {
            console.error("Error al insertar propietario:", err);
            return res.status(500).json({ error: "Error al registrar propietario" });
        }
        res.json({
            success: true,
            message: "Propietario registrado correctamente",
            propietarioId: result.insertId,
        });
    });
});

/* ============================================================
   📌 4. REGISTRAR CLIENTE
============================================================ */
app.post("/api/registrar", async (req, res) => {
    const { nombre, telefono, correo, contra } = req.body;

    if (!nombre || !correo || !contra) {
        return res.status(400).json({ success: false, message: "Faltan campos obligatorios" });
    }

    try {
        const verificarQuery = "SELECT * FROM cliente WHERE correo = ?";

        db.query(verificarQuery, [correo], async (err, results) => {
            if (err) {
                console.error("Error al verificar correo:", err);
                return res.status(500).json({ success: false, message: "Error del servidor" });
            }

            if (results.length > 0) {
                return res.status(400).json({ success: false, message: "El correo ya está registrado" });
            }

            const hashedPassword = await bcrypt.hash(contra, 10);
            const insertQuery = `
              INSERT INTO cliente (nombre, telefono, correo, contra) 
              VALUES (?, ?, ?, ?)
            `;

            db.query(insertQuery, [nombre, telefono, correo, hashedPassword], (err, result) => {
                if (err) {
                    console.error("Error al registrar cliente:", err);
                    return res.status(500).json({ success: false, message: "Error al registrar cliente" });
                }
                res.json({ success: true, message: "Registro exitoso", id: result.insertId });
            });
        });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

/* ============================================================
   📌 5. LOGIN CLIENTE
============================================================ */
app.post("/api/login", (req, res) => {
    const { correo, contra } = req.body;

    if (!correo || !contra) {
        return res.status(400).json({ success: false, message: "Correo y contraseña requeridos" });
    }

    const query = "SELECT * FROM cliente WHERE correo = ?";

    db.query(query, [correo], async (err, results) => {
        if (err) {
            console.error("Error al consultar cliente:", err);
            return res.status(500).json({ success: false, message: "Error del servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "Correo o contraseña incorrectos" });
        }

        const usuario = results[0];
        const passwordMatch = await bcrypt.compare(contra, usuario.contra);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Correo o contraseña incorrectos" });
        }

        res.json({
            success: true,
            message: "Inicio de sesión exitoso",
            usuario: {
                ClienteId: usuario.ClienteId,
                nombre: usuario.nombre,
                correo: usuario.correo,
                telefono: usuario.telefono,
                fechaRegistro: usuario.fechaRegistro,
            },
        });
    });
});

/* ============================================================
   📌 6. INSERTAR PUBLICACIÓN
============================================================ */
app.post("/api/publicaciones", (req, res) => {
    const {
        foto,
        ubicacion,
        superficie_m2,
        habitaciones,
        banos,
        anio_construccion,
        precio_venta,
        PropietarioId,
    } = req.body;

    const query = `
      INSERT INTO publicacion 
      (foto, ubicacion, superficie_m2, habitaciones, banos, anio_construccion, precio_venta, PropietarioId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [foto, ubicacion, superficie_m2, habitaciones, banos, anio_construccion, precio_venta, PropietarioId],
        (err, result) => {
            if (err) {
                console.error("Error al insertar publicación:", err);
                return res.status(500).json({ error: "Error al insertar publicación" });
            }
            res.json({
                mensaje: "Publicación agregada correctamente",
                id: result.insertId,
            });
        }
    );
});

/* ============================================================
   📌 7. ***NUEVA RUTA*** — OBTENER DETALLES DE PUBLICACIÓN
============================================================ */
app.get("/publicacion/:id", (req, res) => {
    const { id } = req.params;

    const sql = `
      SELECT 
        p.*,
        o.nombre AS propietario_nombre,
        o.telefono AS propietario_telefono,
        o.correo AS propietario_correo,
        o.foto AS propietario_foto
      FROM publicacion p
      LEFT JOIN propietario o ON p.PropietarioId = o.PropietarioId
      WHERE p.InmuebleId = ?
      LIMIT 1
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener publicación:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }

        res.json(results[0]);
    });
});

/* ============================================================
   📌 SERVIDOR ACTIVO
============================================================ */
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
