import estilos from './modal.module.css'

export function Modal({movie, onClose}){
    if(!movie) return;

    console.log("Modal Renderizado");
    console.log(movie);

    return(
        <div className={estilos.modalback}>
        <div className={estilos.modalConteiner}>
            <div className={estilos.modalHeader}>
                <h2>{movie.title}</h2>
                <button onClick={onClose}>Fechar</button>
            </div>
            <div className={estilos.imgAndDetails}>
                <img className={estilos.imgModal} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <div className={estilos.movieDetails}>
                    <ul>
                    <h3>Popularidade</h3>
                    <li>{`${movie.popularity}`}</li>

                    <h3>Data de Lançamento</h3>
                    <li>{`${movie.release_date}`}</li>

                    <h3>Quantidade de Votos</h3>
                    <li>{`${movie.vote_count }`}</li>

                    <h3>Sinopse</h3>
                    <li>{`${movie.overview}`}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );
}