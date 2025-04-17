import { Outlet } from "react-router-dom";
import { Series } from "../components/list_series/series";
import { ContentSeries } from "../components/content/contentSeries";

export function Serie(){
    return(
        <main>
            {/* espaço variável que comporta os componentes da minha aplicação */}
            <ContentSeries/>
        </main>
    );
}