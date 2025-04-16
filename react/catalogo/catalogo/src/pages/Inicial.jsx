import { Nav } from '../components/navigation/nav'
import { Header } from '../components/header/header'
import { Outlet } from 'react-router-dom'

// todo elemento deve estar dentro de function
export function Inicial() {
  return (

    // tags fantasmas: são as tags vazias a ponto de permitir a renderização de 2 ou mais elementos html no mesmo componente
    <>
      <Header />
      <Nav />

      {/* espaço variável que comporta os componentes da minha aplicação */}
      <Outlet />
    </>
  );
}

