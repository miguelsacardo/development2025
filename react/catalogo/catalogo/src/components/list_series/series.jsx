import axios from "axios";
import { CardSerie } from "../card/CardSerie";
import { useEffect, useState } from "react";
import estilos from "../list/List.module.css"
import { ModalSerie } from "../modal/modalSerie";

const API_KEY = 'ec3395fea8fb915a53942b6d960146c3';
const API_URL = 'https://api.themoviedb.org/3';

export function Series(){
    const[series, setSeries] = useState([]);
    const[selectedSerie,setSelectedSerie] = useState(null);

    useEffect(()=>{
        axios.get(`${API_URL}/tv/top_rated?api_key=${API_KEY}&language=pt-BR`)
            .then(response=>{
                console.log(response.data.results);
                setSeries(response.data.results);
            })

            .catch(error=>{
                console.log('Error', error);
            })
    },[])

    const handleOpenModal = (serie)=>{
        setSelectedSerie(serie);
    }

    const handleCloseModal= ()=>{
        setSelectedSerie(0)
    }

    return(
        <div className={estilos.container}>
            <figure style={{display:'flex', flexWrap: 'wrap'}}>
                {series.map(serie=>(
                <CardSerie key={serie.id}
                serie={serie}
                onOpenModal={handleOpenModal}
                />
                ))}
            </figure>
            {selectedSerie && (<ModalSerie serie={selectedSerie} onClose={handleCloseModal}/>)}
        </div>
    )
}