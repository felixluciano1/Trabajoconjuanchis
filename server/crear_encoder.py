from sklearn.preprocessing import LabelEncoder
import pickle
import os

# Lista de ubicaciones que usaste en tus datos
categorias = [
    "Trujillo Centro",
    "Víctor Larco",
    "El Porvenir",
    "Florencia de Mora",
    "La Esperanza",
    "Moche",
    "Huanchaco",
    "Laredo",
    "Poroto",
    "Salaverry"
]

# Crear y entrenar el encoder
encoder = LabelEncoder()
encoder.fit(categorias)

# Guardar el encoder como archivo pickle en la carpeta server
ruta_archivo = os.path.join(os.getcwd(), "encoder.pkl")
with open(ruta_archivo, "wb") as f:
    pickle.dump(encoder, f)

print(f"✅ Encoder creado y guardado como '{ruta_archivo}'")
