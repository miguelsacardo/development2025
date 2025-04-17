import estilos from './modal.module.css'

export function ModalSerie({serie, onClose}){
    if(!serie) return;

    console.log("Modal Renderizado");
    console.log(serie);

    return(
        <div className={estilos.modalback}>
        <div className={estilos.modalConteiner}>
            <div className={estilos.modalHeader}>
                <h2>{serie.name}</h2>
                <button onClick={onClose}>Fechar</button>
            </div>
            <div className={estilos.imgAndDetails}>
                <img className={estilos.imgModal} src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
                <div className={estilos.movieDetails}>
                    <ul>
                    <h3>Popularidade</h3>
                    <li>{`${serie.popularity}`}</li>

                    <h3>Primeiro Lancamento</h3>
                    <li>{`${serie.first_air_date}`}</li>

                    <h3>Quantidade de Votos</h3>
                    <li>{`${serie.vote_count }`}</li>

                    <h3>Sinopse</h3>
                    <li>{`${serie.overview}`}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );
}