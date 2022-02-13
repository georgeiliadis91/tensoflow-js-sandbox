import { useEffect, useRef } from "react";
import "./App.css";
import "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

import "./App.css";
import { drawRect } from "./utils";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("model loaded:", net);
    setInterval(() => {
      detect(net);
    }, 150);
  };

  const detect = async (net) => {
    // Make sure webcam is mounted
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);

      console.log("the guess is:", obj);

      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="app-container">
      <Webcam className="webcam-container-box" ref={webcamRef} muted={true} />
      <canvas ref={canvasRef} className="canvas-container-box" />
    </div>
  );
}

export default App;
