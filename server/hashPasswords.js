// hashPasswords.js
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "base_inmobiliaria",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar con la base de datos:", err);
    process.exit(1);
  } else {
    console.log("✅ Conectado correctamente a la base_inmobiliaria");
    hashPasswords();
  }
});

async function hashPasswords() {
  try {
    // Obtener todos los clientes y sus contraseñas
    db.query("SELECT ClienteId, contra FROM cliente", async (err, results) => {
      if (err) throw err;

      for (let user of results) {
        // Hashear la contraseña con bcrypt
        const hashed = await bcrypt.hash(user.contra, 10); // 10 = salt rounds
        // Actualizar la contraseña en la base de datos
        db.query(
          "UPDATE cliente SET contra = ? WHERE ClienteId = ?",
          [hashed, user.ClienteId],
          (err) => {
            if (err)
              console.error(`❌ Error al actualizar ClienteId ${user.ClienteId}:`, err);
            else
              console.log(`🔒 Contraseña de ClienteId ${user.ClienteId} hasheada correctamente`);
          }
        );
      }

      console.log("✅ Todas las contraseñas han sido hasheadas correctamente");
      db.end(); // Cerrar conexión
    });
  } catch (err) {
    console.error("❌ Error durante el hashing de contraseñas:", err);
    db.end();
  }
}
