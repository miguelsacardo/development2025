import axios from "axios"
import { useState, useEffect } from "react"
import { Card } from "../card/Card";
import estilos from "./List.module.css"

const API_KEY = '';
const API_URL = 'https://api.themoviedb.org/3';

export function List(){
    const [movies, setMovies] = useState([])

    // Effect ()parametros, {} execução da lógica, [] dependências
    useEffect(() =>{

        // axios permite a navegação em protocolo https
        axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)

            // o que eu quero fazer se a resposta for OK
            .then(response => {
                console.log(response.data.results);
                setMovies(response.data.results)
            })

            // se a requisição der ruim
            .catch(error => {
                console.log('Error', error);
            });
    }, []);

    return(
        <div className={estilos.container}>
            <figure style={{display:'flex', flexWrap: 'wrap'}}>
                {movies.map(movie=>(
                    <Card key={movie.id}
                    movie={movie}
                    />
                ))}
            </figure>
        </div>
    )
}