import React from "react";
import { ImageList, ImageListItem } from "@mui/material";

export default function Gallery ({ photos }) {

  return (
    <div className="p-6! bg-neutral-50 h-auto text-neutral-800 rounded-xl">
      <h2 className="text-2xl font-pixel! mb-6! text-center">Galeria de Fotos</h2>
      {photos.length === 0 ? (
        <p className="text-center font-defaultPixel text-2xl text-neutral-500">Nenhuma foto capturada ainda.</p>
      ) : (

        // usa os componentes do material UI para exibir as fotos
        <ImageList variant="masonry" cols={3} gap={8}>
          {photos.map((photo, index) => (
            <ImageListItem key={index}>
              <img
                src={photo}
                alt={`Foto ${index + 1}`}
                loading="lazy"
                className="rounded-lg shadow-sm hover:shadow-md transition"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
};

