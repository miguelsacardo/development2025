import estilos from './content.module.css'
import { Series } from '../list_series/series'

export function ContentSeries(){
    return(
        <main className={estilos.container}>
            <Series/>
        </main>
    )
}