const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
const PORT = 3000;

const scriptPath = path.join(__dirname, "traffic", "traffic", "traffic.py");

app.get("/run-traffic", (req, res) => {
    console.log("Starting traffic.py...");

    const pythonProcess = spawn("python", [scriptPath]);

    pythonProcess.stdout.on("data", (data) => {
        console.log(`Output: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
    });

    res.send("Traffic script started!");
});

// NEW ANALYSIS ROUTE
app.get("/run-analysis", (req, res) => {
    console.log("Starting lane.py and YOLO detect...");

    // Run lane.py from lanedetection folder
    const laneScript = spawn("python", [path.join(__dirname, "lanedetection", "lane.py")]);

    laneScript.stdout.on("data", (data) => {
        console.log(`[lane.py]: ${data}`);
    });

    laneScript.stderr.on("data", (data) => {
        console.error(`[lane.py ERROR]: ${data}`);
    });

    // Run YOLO detect.py from yolov5
    const yoloScript = spawn("python", [
        path.join(__dirname, "lanedetection", "yolov5", "detect.py"),
        "--source", "./lines.avi",
        "--view-img"
    ]);

    yoloScript.stdout.on("data", (data) => {
        console.log(`[YOLO detect]: ${data}`);
    });

    yoloScript.stderr.on("data", (data) => {
        console.error(`[YOLO ERROR]: ${data}`);
    });

    res.send("Lane detection and YOLO started!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
