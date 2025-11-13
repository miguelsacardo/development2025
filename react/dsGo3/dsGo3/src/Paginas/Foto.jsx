import React, { useState } from "react";
import Camera from "../Componentes/Camera";
import Gallery from "../Componentes/Gallery";

export function Foto() {
  const [photos, setPhotos] = useState([]);

  const handleCapture = (imageData) => {
    setPhotos(prev => [imageData, ...prev]);
  };

  return (
    
    <div className="conteiner min-h-screen bg-neutral-100 flex flex-col items-center py-10! gap-10">
      <Camera onCapture={handleCapture} />
      <Gallery photos={photos} />
    </div>
  );
}

