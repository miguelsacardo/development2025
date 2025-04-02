import estilos from './Card.module.css'

export function Card({movie}){
    return(
        <div className={estilos.container}>
            <h3>{movie.title}</h3>
            <img src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
            <p>{movie.overview}</p>
        </div>
    )
}