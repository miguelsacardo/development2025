import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Rotas } from "./rotas/rotas";

// todo elemento deve estar dentro de function
function App() {
  return (

    // tags fantasmas: são as tags vazias a ponto de permitir a renderização de 2 ou mais elementos html no mesmo componente
    <>
      <BrowserRouter>
        <Rotas/>
      </BrowserRouter>
    </>
  );
}

// para que a função seja chamada em outros elementos nós devemos exportá-la
export default App