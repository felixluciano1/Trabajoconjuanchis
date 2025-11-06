const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // Para encriptar y comparar contraseñas

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
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

// Ruta raíz
app.get("/", (req, res) => {
    res.send("Servidor backend de inmobiliaria funcionando correctamente");
});

// Obtener departamentos únicos
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

// Obtener inmuebles con datos del asesor
app.get("/api/inmuebles", (req, res) => {
    const { ubicacion } = req.query;
    let sql = `
    SELECT i.*, 
           a.nombre AS asesor_nombre,
           a.telefono AS asesor_telefono,
           a.correo AS asesor_correo,
           a.whatsapp AS asesor_whatsapp,
           a.foto AS asesor_foto
    FROM inmueble i
    LEFT JOIN asesor a ON i.AsesorId = a.AsesorId
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

// Obtener publicaciones
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

// Crear nuevo cliente (registrar usuarios)
app.post("/api/cliente", async (req, res) => {
    const { nombre, correo, contra, telefono } = req.body;

    if (!nombre || !correo || !contra) {
        return res.status(400).json({ error: "Nombre, correo y contraseña son requeridos" });
    }

    try {
        const hashedPassword = await bcrypt.hash(contra, 10);

        const query = `INSERT INTO cliente (nombre, correo, contra, telefono) VALUES (?, ?, ?, ?)`;
        db.query(query, [nombre, correo, hashedPassword, telefono || null], (err, result) => {
            if (err) {
                console.error("Error al registrar cliente:", err);
                return res.status(500).json({ error: "Error al registrar cliente" });
            }
            res.json({ mensaje: "✅ Cliente registrado correctamente", id: result.insertId });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// Login seguro
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

        try {
            const passwordMatch = await bcrypt.compare(contra, usuario.contra);

            if (!passwordMatch) {
                return res.status(401).json({ success: false, message: "Correo o contraseña incorrectos" });
            }

            // Login exitoso
            res.json({ success: true, message: "Login exitoso", usuario });
        } catch (err) {
            console.error("Error al comparar contraseñas:", err);
            res.status(500).json({ success: false, message: "Error del servidor" });
        }
    });
});

// Insertar nueva publicación
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

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
