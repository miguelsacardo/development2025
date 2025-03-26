import estilos from './header.module.css'

export function Header(){
    return(
        <header className={estilos.container}>
            <h1>Ferflix</h1>
        </header>
    )
}