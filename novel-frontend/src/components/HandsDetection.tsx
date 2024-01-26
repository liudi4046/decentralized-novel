import React, { useEffect, useRef } from 'react';
const HandsDetection = ({setGestureClick}:{setGestureClick:Function}) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const controlsRef = useRef(null);
    const spinnerRef = useRef(null);


    useEffect(function(){
        // cameraUtils();
        // drawingUtils();
        // Hands2();
        // console.log(this)

            const videoElement = videoRef.current;
            const canvasElement = canvasRef.current;
            const controlsElement = controlsRef.current;
            const canvasCtx = canvasElement.getContext('2d');

            const fpsControl = new window.FPS();
// Optimization: Turn off animated spinner after its hiding animation is done.
            const spinner = spinnerRef.current;
            spinner.ontransitionend = () => {
                spinner.style.display = 'none';
            };

            // 这里定义 onResults 函数
        let leftPinchCount = 0; // 左手捏合次数
        let rightPinchCount = 0; // 右手捏合次数
        let isLeftPinched = false; // 左手当前是否处于捏合状态
        let isRightPinched = false; // 右手当前是否处于捏合状态

        function onResults(results) {
            // 隐藏 spinner
            document.body.classList.add('loaded');
            // 更新帧率
            fpsControl.tick();
            // 绘制
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

            if (results.multiHandLandmarks && results.multiHandedness) {
                for (let index = 0; index < results.multiHandLandmarks.length; index++) {
                    const landmarks = results.multiHandLandmarks[index];
                    const classification = results.multiHandedness[index];
                    const isRightHand = classification.label === 'Right';

                    // 绘制手部标记
                    drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: isRightHand ? '#00FF00' : '#FF0000' });
                    drawLandmarks(canvasCtx, landmarks, {
                        color: isRightHand ? '#00FF00' : '#FF0000',
                        fillColor: isRightHand ? '#FF0000' : '#00FF00',
                        radius: (x) => {
                            return lerp(x.from.z, -0.15, .1, 10, 1);
                        }
                    });

                    const wrist = landmarks[0];
                    const thumbTip = landmarks[4];
                    const indexFingerTip = landmarks[8];

                    // 计算距离
                    const distanceBetweenFingers = distanceBetweenPoints(thumbTip, indexFingerTip);
                    const distanceThumbToWrist = distanceBetweenPoints(thumbTip, wrist);
                    const distanceIndexToWrist = distanceBetweenPoints(indexFingerTip, wrist);

                    // 使用比例来判断是否捏住
                    const proportion = distanceBetweenFingers / Math.min(distanceThumbToWrist, distanceIndexToWrist);
                    const threshold = 0.4;

                    if (isRightHand) {
                        // 右手捏合检测
                        if (proportion < threshold) {
                            if (!isRightPinched) {
                                isRightPinched = true;
                            }
                        } else {
                            if (isRightPinched) {
                                isRightPinched = false;
                                rightPinchCount++;
                                console.log(`右手食指和大拇指捏合动作执行了 ${rightPinchCount} 次`);
                                setGestureClick((obj)=>{
                                    const tmp = {...obj};
                                    tmp.rightCount++
                                    return tmp
                                })
                            }
                        }
                    } else {
                        // 左手捏合检测
                        if (proportion < threshold) {
                            if (!isLeftPinched) {
                                isLeftPinched = true;
                            }
                        } else {
                            if (isLeftPinched) {
                                isLeftPinched = false;
                                leftPinchCount++;
                                console.log(`左手食指和大拇指捏合动作执行了 ${leftPinchCount} 次`);
                                setGestureClick((obj)=>{
                                    const tmp = {...obj};
                                    tmp.leftCount++
                                    return tmp
                                })
                            }
                        }
                    }
                }
            }

            canvasCtx.restore();
        }

// 辅助函数来计算两点之间的距离
        function distanceBetweenPoints(pointA, pointB) {
            return Math.sqrt(
                Math.pow(pointA.x - pointB.x, 2) +
                Math.pow(pointA.y - pointB.y, 2) +
                Math.pow(pointA.z - pointB.z, 2)
            );
        }

// 你的其他代码，比如定义 canvasCtx, fpsControl, drawConnectors, drawLandmarks, lerp 函数等





        let hands = null;
            try {
                hands = new Hands({ locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
                    } });
                hands.onResults(onResults.bind(window));

                new ControlPanel(controlsElement, {
                    selfieMode: true,
                    maxNumHands: 2,
                    minDetectionConfidence: 0.5,
                    minTrackingConfidence: 0.5
                })
                    .add([
                        new StaticText({ title: 'MediaPipe Hands' }),
                        fpsControl,
                        new Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
                        new SourcePicker({
                            onSourceChanged: () => {
                                hands.reset();
                            },
                            onFrame: async (input, size) => {
                                const aspect = size.height / size.width;
                                let width, height;
                                if (window.innerWidth > window.innerHeight) {
                                    height = window.innerHeight;
                                    width = height / aspect;
                                }
                                else {
                                    width = window.innerWidth;
                                    height = width * aspect;
                                }
                                canvasElement.width = width;
                                canvasElement.height = height;
                                await hands.send({ image: input });
                            },
                            examples: {
                                videos: [],
                                images: [],
                            }
                        }),
                        new Slider({
                            title: 'Max Number of Hands',
                            field: 'maxNumHands',
                            range: [1, 4],
                            step: 1
                        }),
                        new window.Slider({
                            title: 'Min Detection Confidence',
                            field: 'minDetectionConfidence',
                            range: [0, 1],
                            step: 0.01
                        }),
                        new Slider({
                            title: 'Min Tracking Confidence',
                            field: 'minTrackingConfidence',
                            range: [0, 1],
                            step: 0.01
                        }),
                    ])
                    .on(x => {
                        const options = x;
                        videoElement.classList.toggle('selfie', options.selfieMode);
                        hands.setOptions(options);
                    })

            } catch (e) {
                console.log(e,999)
            }






        // ... 其他初始化代码 ...

        return () => {
            // 在这里清理资源，例如移除事件监听器等
        };
    }.bind(window), []);

    return (
        <div className="container" style={{ width: '30%', height: '100%' }}>
            <div style={{ width: '100%', height: '100%' }}>
                <video ref={videoRef} className="input_video"></video>
                <div className="canvas-container">
                    <canvas ref={canvasRef} className="output_canvas" style={{ width: '100%', height: '50%' }}></canvas>
                </div>

                <div ref={spinnerRef}  className="loading">
                    <div className="spinner"></div>
                    <div className="message">Loading</div>
                </div>
                <a className="abs logo" href="http://www.mediapipe.dev" target="_blank">
                    <div style={{ display: 'flex', alignItems: 'center', bottom: 0, right: '10px' }}>
                        <span className="title">HCI Final Project</span>
                    </div>
                </a>
                <div className="shoutout">
                    <div>
                        <a href="https://solutions.mediapipe.dev/hands"></a>
                    </div>
                </div>
            </div>
            <div ref={controlsRef} style={{ opacity: 0 }} className="control-panel"></div>
        </div>
    );
};

export default HandsDetection;
