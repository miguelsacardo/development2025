import React, { useRef, useState, useEffect } from "react";

export default function Camera({ onCapture }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [stream, setStream] = useState(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            setIsCameraOn(true);
        } catch (err) {
            console.error("Erro ao acessar a câmera:", err);
        }
    };

    // garante que o videoRef exista antes do srcObject
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const stopCamera = () => {
        // padrao para desligar a camera no navegador
        stream?.getTracks().forEach(track => track.stop());
        setIsCameraOn(false);
        setStream(null);
    };

    const capturePhoto = () => {
        // canvas e video sao elementos reais no dom
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!video) return;

        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // converte o que aparece no canvas para base64
        onCapture(canvas.toDataURL("image/png"));
    };

    return (
        <div className="flex flex-col items-center justify-center bg-[#f0ebeb] text-black p-6! rounded-xl shadow-md w-full max-w-md mx-auto">
            <h2 className="text-3xl font-pixel! mb-4!">Câmera</h2>

            <div className="relative w-full bg-neutral-300 rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center">
                
                {/* quando isCameraOn for true, ele exibe o video no componente, caso contrário, ele fica esconfdido */}
                {!isCameraOn ? (
                    <p className="font-defaultPixel text-2xl text-neutral-500">A câmera está desligada</p>
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                    />
                )}
                <canvas ref={canvasRef} className="hidden" />
            </div>
            
            {/* primeiro, Ligar a camera é exibido para o usuário */}
            <div className="flex gap-3 mt-4!">
                {!isCameraOn ? (
                    <button
                        onClick={startCamera}
                        className="font-defaultPixel text-2xl px-4! py-2! bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition"
                    >
                        Ligar Câmera
                    </button>
                ) : (
                    
                    // depois que ele clicar em "ligar camera", agora esses dois novos botões aparecem para permitir a foto e o desligamento da camera
                    <>
                        <button
                            onClick={capturePhoto}
                            className="font-defaultPixel text-2xl px-4! py-2! bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition"
                        >
                            Capturar
                        </button>
                        <button
                            onClick={stopCamera}
                            className="font-defaultPixel text-2xl px-4! py-2! bg-neutral-500 text-white rounded-lg hover:bg-neutral-400 transition"
                        >
                            Desligar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
