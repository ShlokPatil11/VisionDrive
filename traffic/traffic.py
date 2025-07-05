import cv2
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image

# Load model and processor
processor = AutoImageProcessor.from_pretrained("dima806/traffic_sign_detection")
model = AutoModelForImageClassification.from_pretrained("dima806/traffic_sign_detection")

# Set model to eval mode
model.eval()

# Start webcam
cap = cv2.VideoCapture(0)  # 0 is usually the default camera

if not cap.isOpened():
    print("Error: Cannot access webcam.")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame (OpenCV uses BGR, we convert to RGB)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(rgb_frame)

    # Preprocess the image
    inputs = processor(images=pil_image, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()
    label = model.config.id2label[predicted_class_idx]

    # Draw label on frame
    cv2.putText(frame, f"Detected: {label}", (10, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("Traffic Sign Detection", frame)

    # Press 'q' to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()