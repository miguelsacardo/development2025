import { Outlet } from 'react-router-dom';
import { Menu } from '../Componentes/Menu';
import { Header } from '../Componentes/Header';

export function DSGo() {
    return (
        <>
            <Header />
            <main className="corpo">
                <Outlet />
                <Menu />
            </main>
        </>

    )
}