# model-server/app.py
from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model once
MODEL_PATH = 'BreakHis_Inception_V3_40_epoch_swish_run1.h5'
model = load_model(MODEL_PATH, compile=False)

# Class labels (your 8 classes)
class_names = [
    '01 Adenosis', '02 Fibroadenoma', '03 Phyllodes_tumor', '04 Tubular_adenoma',
    '05 Ductal_carcinoma', '06 Lobular_carcinoma', '07 Mucinous_carcinoma', '08 Papillary_carcinoma'
]

def preprocess_image(image):
    img = image.resize((299, 299))
    img = img.convert('RGB')
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    image = Image.open(image_file.stream)
    input_tensor = preprocess_image(image)

    prediction = model.predict(input_tensor)
    predicted_class = class_names[np.argmax(prediction)]
    confidence = float(np.max(prediction))

    return jsonify({
        'predicted_class': predicted_class,
        'confidence': round(confidence * 100, 2)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
