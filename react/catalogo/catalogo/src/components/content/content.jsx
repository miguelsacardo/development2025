import estilos from './content.module.css'
import { Card } from '../card/Card'
import { List } from '../list/list'

export function Content(){
    return(
        <main className={estilos.container}>
            <List/>
        </main>
    )
}