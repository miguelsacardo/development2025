import estilos from './Card.module.css'

export function CardSerie({serie, onOpenModal}){
    return(
        <div className={estilos.container}>
            <h3>{serie.name}</h3>
            <img src={`http://image.tmdb.org/t/p/w500${serie.poster_path}`} onClick={() => onOpenModal(serie)}/>
            <p>{serie.overview}</p>
        </div>
    )
}