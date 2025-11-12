from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)

# ✅ Cargar modelo entrenado (.h5)
model = tf.keras.models.load_model("modelo_inmobiliario.h5")

# ✅ Cargar codificador (ubicaciones)
with open("encoder.pkl", "rb") as f:
    encoder = pickle.load(f)

# ==========================
# 🚀 RUTA PARA PREDICCIÓN
# ==========================
@app.route("/predecir", methods=["POST"])
def predecir():
    try:
        data = request.json
        print("📩 Datos recibidos:", data)  # debug

        # Extraer datos del JSON
        ubicacion = data["ubicacion"]
        superficie = float(data["superficie_m2"])
        habitaciones = int(data["habitaciones"])
        banos = int(data["banos"])
        ano_construccion = int(data["ano_construccion"])

        # Codificar ubicación (one-hot o label encoding según tu modelo)
        ubicacion_cod = encoder.transform([ubicacion])[0]

        # Crear el vector de entrada (asegúrate que coincida con tu modelo)
        entrada = np.array([[ubicacion_cod, superficie, habitaciones, banos, ano_construccion]])

        # Hacer predicción
        prediccion = model.predict(entrada)[0][0]

        return jsonify({"precio_estimado": float(prediccion)})
    except Exception as e:
        import traceback
        print("❌ Error en /predecir:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# ==========================
# 🔐 LOGIN SIMULADO
# ==========================
usuarios = {
    "admin@gmail.com": "123456",
    "usuario@correo.com": "password"
}

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email in usuarios and usuarios[email] == password:
        return jsonify({"success": True, "message": "Inicio de sesión exitoso"})
    else:
        return jsonify({"success": False, "message": "Credenciales incorrectas"}), 401


# ==========================
# 🚀 INICIO DEL SERVIDOR
# ==========================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
