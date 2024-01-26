import React, { useEffect, useRef, useState } from 'react';
import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
} from  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

const HandsDetection = () => {
    const [gestureRecognizer, setGestureRecognizer] = useState(null);
    const [webcamRunning, setWebcamRunning] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const gestureOutputRef = useRef(null);

    useEffect(() => {
        const loadGestureRecognizer = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
            );
            const gr = await GestureRecognizer.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
                    delegate: "GPU"
                },
                runningMode: "IMAGE"
            });
            setGestureRecognizer(gr);
        };

        loadGestureRecognizer();
    }, []);

    // 检查是否支持摄像头
    const hasGetUserMedia = () => {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    };

    // 启用摄像头
    const enableCam = () => {
        if (!gestureRecognizer) {
            alert("Please wait for gestureRecognizer to load");
            return;
        }

        setWebcamRunning(!webcamRunning);

        const constraints = { video: true };

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            videoRef.current.srcObject = stream;
            videoRef.current.addEventListener("loadeddata", predictWebcam);
        });
    };

    let lastVideoTime = -1;

    // 预测摄像头捕获的画面
    const predictWebcam = async () => {
        if (!videoRef.current || !gestureRecognizer || !webcamRunning) return;

        if (videoRef.current.currentTime !== lastVideoTime) {
            lastVideoTime = videoRef.current.currentTime;
            const results = await gestureRecognizer.recognizeForVideo(videoRef.current, Date.now());

            const canvasCtx = canvasRef.current.getContext('2d');
            canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            const drawingUtils = new DrawingUtils(canvasCtx);

            if (results.landmarks) {
                for (const landmarks of results.landmarks) {
                    drawingUtils.drawConnectors(
                        landmarks,
                        GestureRecognizer.HAND_CONNECTIONS,
                        { color: "#00FF00", lineWidth: 5 }
                    );
                    drawingUtils.drawLandmarks(landmarks, { color: "#FF0000", lineWidth: 2 });
                }
            }

            if (results.gestures.length > 0) {
                const categoryName = results.gestures[0][0].categoryName;
                const categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2);
                const handedness = results.handednesses[0][0].displayName;
                gestureOutputRef.current.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore}%\n Handedness: ${handedness}`;
            }
        }

        window.requestAnimationFrame(predictWebcam);
    };

    return (
        <div>
            {hasGetUserMedia() ? (
                <button onClick={enableCam}>
                    {webcamRunning ? "DISABLE PREDICTIONS" : "ENABLE PREDICTIONS"}
                </button>
            ) : (
                <p>getUserMedia() is not supported by your browser</p>
            )}
            <video ref={videoRef} style={{ display: webcamRunning ? 'block' : 'none' }} autoPlay muted></video>
            <canvas ref={canvasRef}></canvas>
            <div ref={gestureOutputRef}></div>
        </div>
    );
};

export default HandsDetection;
