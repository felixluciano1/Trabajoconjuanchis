from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import pickle
import os

app = Flask(__name__)
CORS(app)
model = tf.keras.models.load_model("modelo_inmobiliario.h5")

with open("encoder.pkl", "rb") as f:
    encoder = pickle.load(f)

@app.route("/predecir", methods=["POST"])
def predecir():
    data = request.json
    ubicacion_cod = encoder.transform([data['ubicacion']])[0]
    entrada = np.array([[ubicacion_cod, data['superficie_m2'], data['habitaciones'], data['banos'], data['ano_construccion']]])
    prediccion = model.predict(entrada)[0][0]
    return jsonify({"precio_estimado": float(prediccion)})
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

if __name__ == "__main__":
    app.run(debug=True, port=5000)
