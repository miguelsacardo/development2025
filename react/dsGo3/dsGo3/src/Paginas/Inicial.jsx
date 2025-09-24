import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Componentes/Header';
import { FooterBasic } from '../Componentes/FooterBasic';

export function Inicial() {
    const navigate =useNavigate();

  return (
    <><main className="inicial">
      <div className='w-180 flex justify-center'>
        <img src={logo} className="logo" alt="Logo DS GO" />
      </div>
      
      <div className="text-white text-3xl font-pixel flex text-center">
        <h2>Seja bem-vindo ao <span className="text-[#ffff0f]">DS GO</span>, onde sua experiência é colocada em JOGO!</h2>
      </div>
      <button onClick={() => navigate('/dsgo')} className='entrar font-pixel'>
        Entrar
      </button>
    </main>
    </>
  );
}
