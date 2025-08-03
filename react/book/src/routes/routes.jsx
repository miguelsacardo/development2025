import { Routes, Route } from "react-router-dom";
import { Inicial } from "../pages/inicial";
import { ListBooks } from "../pages/listBooks";
import { Index } from "../pages";
import { Lucas } from "../pages/lucas";

export function Rotas(){
    return(
        <Routes>
            <Route path="/" element={<Index />} >
                <Route index element={<Inicial />} />
                <Route path="/books" element={<ListBooks />} />
                <Route path="/lucas" element={<Lucas />} />
            </Route>
        </Routes>
    )
}