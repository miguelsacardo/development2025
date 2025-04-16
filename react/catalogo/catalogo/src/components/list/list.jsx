import axios from "axios"
import { useState, useEffect } from "react"
import { Card } from "../card/Card";
import estilos from "./List.module.css"
import { Modal } from "../modal/modal";

const API_KEY = '';
const API_URL = 'https://api.themoviedb.org/3';

export function List(){
    const [movies, setMovies] = useState([])
    const[selectedMovie, setSelectedMovie] = useState(null);

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

    const handleOpenModal = (movie)=>{
        setSelectedMovie(movie);
    }

    const handleCloseModal=() =>{
        setSelectedMovie(0);
    }

    return(
        <div className={estilos.container}>
            <figure style={{display:'flex', flexWrap: 'wrap'}}>
                {movies.map(movie=>(
                    <Card key={movie.id}
                    movie={movie}
                    onOpenModal={handleOpenModal}
                    />
                ))}
            </figure>
            {selectedMovie && (<Modal movie={selectedMovie} onClose={handleCloseModal}/>)}
        </div>
    )
}