import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__, static_folder='../static', static_url_path='')
CORS(app)

MODEL_PATH = "../malaria-cell-cnn.h5"

model = tf.keras.models.load_model(MODEL_PATH)
TARGET_SIZE = (128, 128)

@app.route("/api/predict", methods=["POST"])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "no image"}), 400

    file = request.files["image"]

    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    image = image.resize(TARGET_SIZE)

    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    probability = float(prediction[0][0])

    if probability > 0.5:
        label = "Uninfected"
        confidence = probability
    else:
        label = "Parasitized"
        confidence = 1 - probability

    return jsonify({
        "result": label,
        "confidence": confidence
    })

# vercel handler
def handler(event, context):
    return app(event, context)
