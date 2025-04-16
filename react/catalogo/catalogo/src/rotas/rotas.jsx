import { Routes, Route } from "react-router-dom";
import { Inicial } from "../pages/Inicial";
import { Profiles } from "../pages/profiles/profiles";
import { Serie } from "../pages/serie";
import { List } from "../components/list/list";

export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Inicial/>}>
                <Route index element={<List/>}/>
                <Route path="serie" element={<Serie/>}/>
                <Route path="perfil" element={<Profiles/>}/>
            </Route>
        </Routes>
    )
}