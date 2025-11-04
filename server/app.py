from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import pickle
import os

app = Flask(__name__)


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

if __name__ == "__main__":
    app.run(debug=True)
