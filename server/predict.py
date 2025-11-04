import tensorflow as tf
import numpy as np
import pickle

# Cargar modelo
model = tf.keras.models.load_model("modelo_inmobiliario.h5")

# Cargar encoder
with open("encoder.pkl", "rb") as f:
    encoder = pickle.load(f)

# Ejemplo de predicción
nueva_ubicacion = "El Porvenir"
nueva_superficie = 150
nuevas_habitaciones = 2
nuevos_banos = 4
nuevo_ano = 2024

ubicacion_cod = encoder.transform([nueva_ubicacion])[0]
entrada = np.array([[ubicacion_cod, nueva_superficie, nuevas_habitaciones, nuevos_banos, nuevo_ano]])

prediccion = model.predict(entrada)
print(f"💰 Precio estimado: S/. {prediccion[0][0]:,.2f}")
