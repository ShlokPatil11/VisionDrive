# VisionDrive
# 🚦 Real-Time Traffic Sign Detection using YOLO

This project detects and classifies traffic signs in real-time using a custom-trained YOLO model with webcam integration. It's designed for intelligent traffic analytics and can serve as a component in advanced driver-assistance systems (ADAS).

---

## 📌 Goals

- Detect and classify traffic signs using deep learning.
- Perform real-time detection via webcam.
- Enable lightweight and responsive traffic analytics.

---

## 🧠 Model Architecture

- **Model Used:** YOLO (You Only Look Once)
- **Version:** YOLOv5 (or YOLOv8)
- **Framework:** PyTorch
- **Language:** Python
- **Advantages:**
  - Real-time performance
  - High detection accuracy
  - Lightweight and deployment-friendly

---

## 📂 Dataset – GTSRB

- **Name:** German Traffic Sign Recognition Benchmark (GTSRB)
- **Structure:**
  - `images/` and `labels/` folders
  - Each contains `train/`, `test/`, and `val/` subfolders
- **Preprocessing:**
  - Converted `.ppm` images to `.jpg` or `.png`
  - YOLO-compatible label files (`.txt`) created
- **YAML Configuration Example:**
  ```yaml
  train: path/to/train
  val: path/to/val
  nc: 43  # number of classes
  names: ['Speed Limit 20', 'Speed Limit 30', ...]


🎬 Demo Video
(vd/demo.mp4)

