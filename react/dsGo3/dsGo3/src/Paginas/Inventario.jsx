import { useEffect, useState } from "react";

export function Inventario(){
    const [figurinha, setFigurinha] = useState([])

    useEffect(() => {
        const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
        setFigurinha(armazenado);
    },[])

    return(
        <div className="inventario">
        <section className="grid">
            <h2>Inventário</h2>

            <div>
            {
                figurinha.length === 0 ?(
                    <p className="vazio">Não há figurinha ainda</p>
                ):(
                    <ul>
                        {
                            <li className="figurinha">
                                {figurinha.map((f) => (
                                    <figure key={f.id}>
                                        <img src={f.imagem} alt="" />
                                        <figcaption>{f.nome}</figcaption>
                                    </figure>
                                ))}
                            </li>
                        }
                    </ul>
                )
            }
            </div>
        </section>
        </div>
    )
}