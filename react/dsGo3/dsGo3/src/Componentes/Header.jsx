import { useNavigate } from 'react-router-dom';
import header_icon from '../assets/header-icon.png';

export function Header() {

    const navigate = useNavigate();
    return (
        <header className="bg-gray-900 text-gray-200 flex items-center justify-between shadow-md p-2! pl-10! pr-10!">
            <div className="w-20" onClick={() => navigate('/')} tabIndex={0} role='button'  aria-label='Voltar a página inicial'>
                <img src={header_icon} alt="Logo DS GO" className='w-full hover:cursor-pointer'/>
            </div>
            <div className="text-lg font-pixel text-[#ffff0f]">
                DS GO
            </div>
        </header>
    )
}