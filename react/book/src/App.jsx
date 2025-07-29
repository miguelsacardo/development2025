import { BrowserRouter } from 'react-router-dom';
import { Rotas } from './routes/routes';
import React from 'react';

function App(){
  return(
    <>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </>
  )
}

export default App;