# 🔬 MedistatInsights — AI Malaria Cell Classifier

A deep learning web application that detects malaria-infected blood cells from microscopy images using a Convolutional Neural Network (CNN). Built as a team project of 2, with a focus on making AI-powered medical diagnostics accessible through a clean web interface.

---

## 👨‍💻 Team & Roles

| Role | Responsibility |
|------|---------------|
| **Backend Developer (Me)** | Model integration, Flask REST API, image preprocessing pipeline, server deployment |
| **Frontend Developer (Teammate)** | Web dashboard UI, drag-and-drop interface, scan history, CSS styling |

---

## 🚀 Features

- CNN-based binary classifier to detect **Parasitized vs Uninfected** blood cells
- Flask REST API that accepts cell images and returns predictions in real time
- Responsive web dashboard with drag-and-drop image upload
- Scan history panel to track recent analyses
- Auto-detects model input shape for flexible deployment

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| ML Model | TensorFlow / Keras (CNN) |
| Backend | Python, Flask, Flask-CORS |
| Image Processing | NumPy, Pillow (PIL) |
| Frontend | HTML, CSS, JavaScript |

---

## 🏗️ Architecture

```
Browser Dashboard (HTML/CSS/JS)
        │
        │  POST image to /predict
        ▼
┌─────────────────────────────────────┐
│         Flask Backend (app.py)       │
│                                       │
│  /predict route                      │
│       │                              │
│       ▼                              │
│  Preprocessing (PIL, NumPy)          │
│  - resize to model's input shape     │
│  - normalize pixel values (0-1)      │
│       │                              │
│       ▼                              │
│  CNN Model (malaria-cell-cnn.h5)     │
│  - TensorFlow/Keras inference        │
│       │                              │
│       ▼                              │
│  JSON Response                       │
│  { result, confidence }              │
└─────────────────────────────────────┘
        │
        ▼
Result rendered on Dashboard
```

**How it works:**

1. The user uploads or drags a blood cell image into the dashboard.
2. The browser sends the image as a `POST` request to the Flask `/predict` endpoint.
3. The backend preprocesses the image — resizing it to the model's expected input shape and normalizing pixel values to a 0–1 range.
4. The preprocessed image is passed to the loaded CNN model (`malaria-cell-cnn.h5`) for inference.
5. The model outputs a probability, which is converted into a `Parasitized` or `Uninfected` label along with a confidence score.
6. The result is sent back to the frontend as JSON and displayed instantly on the dashboard.

---

## 📊 Model Performance

- **Architecture:** Convolutional Neural Network (CNN)
- **Dataset:** NIH Malaria Cell Images Dataset
- **Accuracy:** 95%+
- **Classes:** Parasitized (infected) / Uninfected

---

## ▶️ Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Mayur-web03/MEDISTATINSIGHTS.git
cd MEDISTATINSIGHTS

# 2. Install dependencies
pip install -r requirements.txt

# 3. Add your trained model file
# Place malaria-cell-cnn.h5 in the root directory

# 4. Start the server
python app.py
```

Then open **http://localhost:5000** in your browser.

---

## ⚠️ Model File

The trained model (`malaria-cell-cnn.h5`) is not included in this repository due to file size constraints. To run the app locally, train the model using the dataset linked above or reach out to me directly.

---

## 📁 Project Structure

```
MEDISTATINSIGHTS/
├── app.py              # Flask backend & prediction API
├── requirements.txt    # Python dependencies
├── static/
│   ├── index.html      # Web dashboard
│   ├── script.js       # Frontend logic
│   └── style.css       # Styling
```

---

> Built with ❤️ by a team of 2 | Powered by TensorFlow & Flask
