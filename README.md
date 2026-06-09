# 🔬 MedistatInsights — AI Malaria Cell Classifier

A deep learning web application that detects malaria-infected blood cells from microscopy images using a Convolutional Neural Network (CNN). Built as a team project of 2, with a focus on making AI-powered medical diagnostics accessible through a clean web interface.

## 👨‍💻 Team & Roles

| Role | Responsibility |
|------|---------------|
| **Backend Developer (Me)** | Model integration, Flask REST API, image preprocessing pipeline, server deployment |
| **Frontend Developer (Teammate)** | Web dashboard UI, drag-and-drop interface, scan history, CSS styling |

## 🚀 Features

- CNN-based binary classifier to detect **Parasitized vs Uninfected** blood cells
- Flask REST API that accepts cell images and returns predictions in real time
- Responsive web dashboard with drag-and-drop image upload
- Scan history panel to track recent analyses
- Auto-detects model input shape for flexible deployment

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| ML Model | TensorFlow / Keras (CNN) |
| Backend | Python, Flask, Flask-CORS |
| Image Processing | NumPy, Pillow (PIL) |
| Frontend | HTML, CSS, JavaScript |

## 📊 Model Performance

- **Architecture:** Convolutional Neural Network (CNN)
- **Dataset:** NIH Malaria Cell Images Dataset
- **Accuracy:** 95%+
- **Classes:** Parasitized (infected) / Uninfected

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

## ⚠️ Model File

The trained model (`malaria-cell-cnn.h5`) is not included in this repository due to file size constraints. To run the app locally, train the model using the dataset linked above or reach out to me directly.

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

> Built with ❤️ by a team of 5 | Powered by TensorFlow & Flask
