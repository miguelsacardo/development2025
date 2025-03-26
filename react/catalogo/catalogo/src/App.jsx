import estilos from './App.module.css'
import { Nav } from './components/navigation/nav'
import { Header } from './components/header/header'
import { Content } from './components/content/content'

// todo elemento deve estar dentro de function
function App() {
  return (

    // tags fantasmas: são as tags vazias a ponto de permitir a renderização de 2 ou mais elementos html no mesmo componente
    <>
      <Header />
      <Nav />
      <Content />
    </>
  );
}

// para que a função seja chamada em outros elementos nós devemos exportá-la
export default App