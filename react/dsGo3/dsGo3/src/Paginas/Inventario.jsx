import { useEffect, useState } from "react";

export function Inventario(){
    const [figurinha, setFigurinha] = useState([])

    useEffect(() => {
        const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
        setFigurinha(armazenado);
    },[])

    return(
        <div className="inventario">
        <section >
            <h2 className="text-5xl font-pixel">Inventário</h2>

            <div className="conteiner">
            {
                figurinha.length === 0 ?(
                    <p className="vazio">Não há figurinha ainda</p>
                ):(
                    <ul className="flex p-10! justify-center flex-wrap gap-10">
                                {figurinha.map((f) => (
                                    <li className="cardFigurinha w-80">
                                        <figure key={f.id} className="space-y-5! flex flex-col items-center">
                                            <img src={f.imagem} alt="" className="w-50"/>
                                            <figcaption className="font-defaultPixel text-4xl">{f.nome}</figcaption>
                                        </figure>
                                    </li>
                                ))}
                    </ul>
                )
            }
            </div>
        </section>
        </div>
    )
}